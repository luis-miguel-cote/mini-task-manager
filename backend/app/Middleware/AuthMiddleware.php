<?php

namespace App\Middleware;

use Phalcon\Events\Event;
use Phalcon\Mvc\Dispatcher;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthMiddleware
{
    public function beforeExecuteRoute(Event $event, Dispatcher $dispatcher)
    {
        $di = $dispatcher->getDI();
        $request = $di->get('request');
        $response = $di->get('response');
        $config = $di->get('config');

        // public routes
        $uri = $request->getURI();
        $publicRoutes = ['/api/login', '/api/register'];

        if (in_array($uri, $publicRoutes)) {
            return true;
        }

        // protected routes
        $authHeader = $request->getHeader('Authorization');

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            $response->setStatusCode(401)
                ->setJsonContent(['error' => 'Token missing'])
                ->send();
            return false;
        }

        $token = str_replace('Bearer ', '', $authHeader);

        try {
            $decoded = JWT::decode(
                $token,
                new Key($config->jwt->secret, $config->jwt->algo)
            );

            // set authenticated user ID in DI for later use
            $di->setShared('authUserId', function () use ($decoded) {
                return $decoded->sub;
            });

            return true;

        } catch (\Exception $e) {
            $response->setStatusCode(401)
                ->setJsonContent([
                    'error' => 'Invalid token',
                    'detail' => $e->getMessage()
                ])
                ->send();
            return false;
        }
    }
}

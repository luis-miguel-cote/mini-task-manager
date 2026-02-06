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


        error_log(
            'MW controller=' . var_export($dispatcher->getControllerName(), true) .
                ' action=' . var_export($dispatcher->getActionName(), true) .
                ' method=' . $request->getMethod()
        );
        if ($request->isOptions()) {
            $response->setStatusCode(200)->send();
            return false;
        }

        // public routes
        $controller = $dispatcher->getControllerName();
        $action     = $dispatcher->getActionName();

        if (
            $controller === 'auth' &&
            in_array($action, ['login', 'register'])
        ) {
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

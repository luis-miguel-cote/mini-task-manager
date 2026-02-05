<?php

namespace App\Controllers;

use Phalcon\Mvc\Controller;
use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;


class AuthController extends Controller
{
    public function registerAction()
    {
        $data = $this->request->getJsonRawBody(true);

        if (
            empty($data['name']) ||
            empty($data['email']) ||
            empty($data['password'])
        ) {
            return $this->response
                ->setStatusCode(400)
                ->setJsonContent(['error' => 'Missing required fields']);
        }

        if (User::findFirstByEmail($data['email'])) {
            return $this->response
                ->setStatusCode(409)
                ->setJsonContent(['error' => 'Email already registered']);
        }

        $user = new User();
        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->password = password_hash($data['password'], PASSWORD_BCRYPT);

        if (!$user->save()) {
            return $this->response
                ->setStatusCode(500)
                ->setJsonContent(['error' => 'User could not be created']);
        }

        return $this->response
            ->setStatusCode(201)
            ->setJsonContent([
                'message' => 'User registered successfully',
                'user_id' => $user->id
            ]);
    }
public function loginAction()
{
    $data = $this->request->getJsonRawBody(true);

    if (empty($data['email']) || empty($data['password'])) {
        return $this->response
            ->setStatusCode(400)
            ->setJsonContent(['error' => 'Missing credentials']);
    }

    $user = User::findFirstByEmail($data['email']);

    if (!$user || !password_verify($data['password'], $user->password)) {
        return $this->response
            ->setStatusCode(401)
            ->setJsonContent(['error' => 'Invalid credentials']);
    }

    $config = $this->di->get('config');

    $payload = [
        'iss' => 'mini-task-manager',
        'iat' => time(),
        'exp' => time() + $config->jwt->expire,
        'sub' => $user->id
    ];

    $token = JWT::encode(
        $payload,
        $config->jwt->secret,
        $config->jwt->algo
    );

    return $this->response->setJsonContent([
        'token' => $token,
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email
        ]
    ]);
}

}

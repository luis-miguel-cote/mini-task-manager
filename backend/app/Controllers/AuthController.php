<?php

namespace App\Controllers;

use Phalcon\Mvc\Controller;
use App\Models\User;

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

    if (
        empty($data['email']) ||
        empty($data['password'])
    ) {
        return $this->response
            ->setStatusCode(400)
            ->setJsonContent([
                'error' => 'Email and password are required'
            ]);
    }

    $user = User::findFirstByEmail($data['email']);

    if (!$user || !password_verify($data['password'], $user->password)) {
        return $this->response
            ->setStatusCode(401)
            ->setJsonContent([
                'error' => 'Invalid credentials'
            ]);
    }

    return $this->response
        ->setStatusCode(200)
        ->setJsonContent([
            'message' => 'Login successful',
            'user' => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
            ]
        ]);
}
}

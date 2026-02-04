<?php

use Phalcon\Mvc\Router;

$router = new Router(false);

$router->setDefaultNamespace('App\Controllers');

#register routes
$router->addPost('/register', [
    'controller' => 'auth',
    'action'     => 'register',
]);
#login route
$router->addPost('/login', [
    'controller' => 'auth',
    'action'     => 'login',
]);

$router->addPost('/tasks', [
    'controller' => 'tasks',
    'action' => 'create',
]);

$router->addGet('/tasks', [
    'controller' => 'tasks',
    'action' => 'list',
]);


$router->addPut('/tasks/{id}', [
    'controller' => 'tasks',
    'action' => 'update',
]);

$router->addDelete('/tasks/{id}', [
    'controller' => 'tasks',
    'action' => 'delete',
]);

$router->addGet('/test', [
    'controller' => 'test',
    'action'     => 'index',
]);



return $router;

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
$router->addGet('/test', [
    'controller' => 'test',
    'action'     => 'index',
]);


return $router;

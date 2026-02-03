<?php

use Phalcon\Mvc\Router;

$router = new Router(false);

$router->setDefaultNamespace('App\Controllers');


$router->addPost('/register', [
    'controller' => 'auth',
    'action'     => 'register',
]);

$router->addGet('/test', [
    'controller' => 'test',
    'action'     => 'index',
]);


return $router;

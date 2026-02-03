<?php

use Phalcon\Mvc\Router;

$router = new Router(false);

$router->setDefaultNamespace('App\Controllers');

$router->addGet('/test', [
    'controller' => 'test',
    'action'     => 'index',
]);


return $router;

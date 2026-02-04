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
#create task
$router->addPost('/task', [
    'controller' => 'tasks',
    'action' => 'create',
]);

#list tasks
$router->addGet('/tasks', [
    'controller' => 'tasks',
    'action' => 'index',
]);


#update task
$router->addPut('/task/{id}', [
    'controller' => 'tasks',
    'action' => 'Update',
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

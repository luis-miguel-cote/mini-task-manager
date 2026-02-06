<?php

use Phalcon\Mvc\Router;

$router = new Router(false);

$router->setDefaultNamespace('App\Controllers');

#register routes
$router->addPost('/api/register', [
    'controller' => 'auth',
    'action'     => 'register',
]);
#login route
$router->addPost('/api/login', [
    'controller' => 'auth',
    'action'     => 'login',
]);
#create task
$router->addPost('/api/tasks', [
    'controller' => 'tasks',
    'action' => 'create',
]);

#list tasks
$router->addGet('/api/tasks', [
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

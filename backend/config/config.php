<?php

use Phalcon\Config\Config;

return new Config([
    'database' => [
        'adapter'  => 'Mysql',
        'host'     => 'localhost',
        'username' => 'root',
        'password' => 'root1234!',
        'dbname'   => 'task_manager',
        'charset'  => 'utf8mb4',
    ],

    'jwt' => [
        'secret' => 'f8b9c1e2d4a6F!S@0#QxW3E5R7T9YH2KJ4L6M8ZC',
        'algo'   => 'HS256',
        'expire' => 3600 // 1 hora
    ],

    'app' => [
        'baseUri' => '/',
    ],
]);

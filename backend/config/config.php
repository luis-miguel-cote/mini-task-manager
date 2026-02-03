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
    'app' => [
        'baseUri' => '/',
    ],
]);

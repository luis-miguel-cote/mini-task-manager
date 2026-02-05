<?php

use Phalcon\Mvc\Application;
use Phalcon\Di\FactoryDefault;
use Phalcon\Autoload\Loader;
use Phalcon\Mvc\Dispatcher;
use App\Middleware\AuthMiddleware;
use Phalcon\Events\Manager as EventsManager;
use Phalcon\Db\Adapter\Pdo\Mysql as MysqlAdapter;



error_reporting(E_ALL);
ini_set('display_errors', 1);

define('BASE_PATH', dirname(__DIR__));
define('APP_PATH', BASE_PATH . '/app');

require BASE_PATH . '/vendor/autoload.php';

$di = new FactoryDefault();

$loader = new Loader();


$loader->setNamespaces([
    'App\Controllers' => APP_PATH . '/Controllers',
    'App\Models'      => APP_PATH . '/Models',
    'App\Middleware'  => APP_PATH . '/Middleware',
]);


$loader->register();
// config
$config = require BASE_PATH . '/config/config.php';
$di->setShared('config', $config);

// db
$di->setShared('db', function () use ($config) {
    return new MysqlAdapter([
        'host'     => $config->database->host,
        'username' => $config->database->username,
        'password' => $config->database->password,
        'dbname'   => $config->database->dbname,
        'charset'  => $config->database->charset,
    ]);
});


$di->setShared('view', function () {
    $view = new \Phalcon\Mvc\View();
    $view->disable();
    return $view;
});

$di->setShared('dispatcher', function () {
    $eventsManager = new EventsManager();

    $eventsManager->attach(
        'dispatch:beforeExecuteRoute',
        new AuthMiddleware()
    );

    $dispatcher = new Dispatcher();
    $dispatcher->setEventsManager($eventsManager);

    return $dispatcher;
});

// router
$di->setShared('router', require BASE_PATH . '/routes/api.php');

$app = new Application($di);
echo $app->handle($_SERVER['REQUEST_URI'])->getContent();

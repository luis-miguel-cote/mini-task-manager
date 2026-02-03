<?php

namespace App\Controllers;

use Phalcon\Mvc\Controller;

class TestController extends Controller
{
    public function indexAction()
    {
        return json_encode(['test' => 1]);
    }
}

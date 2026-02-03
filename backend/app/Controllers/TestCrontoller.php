<?php

namespace App\Controllers;

use Phalcon\Mvc\Controller;

class TestController extends Controller
{
    public function indexAction()
    {
        $result = $this->db->fetchOne('SELECT 1 AS test');
        return json_encode($result);
    }
}

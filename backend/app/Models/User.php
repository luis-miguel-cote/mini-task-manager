<?php

namespace App\Models;

use Phalcon\Mvc\Model;

class User extends Model
{
    public $id;
    public $name;
    public $email;
    public $password;

    public function initialize()
    {
        $this->setSource('users');
    }
}
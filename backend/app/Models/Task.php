<?php
namespace App\Models;

use Phalcon\Mvc\Model;

class Task extends Model
{
    public $id;
    public $user_id;
    public $title;
    public $description;
    public $status;
    public $created_at;

    public function initialize()
    {
        $this->setSource('tasks');
    }
}
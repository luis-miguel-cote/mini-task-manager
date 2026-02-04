<?php

namespace App\Controllers;

use Phalcon\Mvc\Controller;
use App\Models\Task;

class TasksController extends Controller
{
    // GET tasks
    public function indexAction()
    {
        $userId = $this->request->getQuery('user_id');

        $tasks = Task::find([
            'conditions' => 'user_id = :user_id:',
            'bind' => ['user_id' => $userId]
        ]);

        return $this->response->setJsonContent($tasks);
    }

}
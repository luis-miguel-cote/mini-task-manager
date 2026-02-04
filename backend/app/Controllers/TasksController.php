<?php

namespace App\Controllers;

use Phalcon\Mvc\Controller;
use App\Models\Task;

class TasksController extends Controller
{

        // POST-tasks
    public function createAction()
    {
        $data = $this->request->getJsonRawBody(true);

        if (empty($data['user_id']) || empty($data['title'])) {
            return $this->response
                ->setStatusCode(400)
                ->setJsonContent(['error' => 'Missing fields']);
        }

        $task = new Task();
        $task->user_id = $data['user_id'];
        $task->title = $data['title'];
        $task->description = $data['description'] ?? null;
        $task->status = 'pending';

        if (!$task->save()) {
            return $this->response
                ->setStatusCode(500)
                ->setJsonContent(['error' => 'Task not created']);
        }

        return $this->response
            ->setStatusCode(201)
            ->setJsonContent([
                'message' => 'Task created',
                'task_id' => $task->id
            ]);
    }

    // GET-tasks
    public function indexAction()
    {
        $userId = $this->request->getQuery('user_id');

        $tasks = Task::find([
            'conditions' => 'user_id = :user_id:',
            'bind' => ['user_id' => $userId]
        ]);

        return $this->response->setJsonContent($tasks->toArray());

    }



    // PUT-tasks/{id}
    public function updateAction($id)
    {
        $data = $this->request->getJsonRawBody(true);

        $task = Task::findFirstById($id);
        if (!$task) {
            return $this->response
                ->setStatusCode(404)
                ->setJsonContent(['error' => 'Task not found']);
        }
        $task->title = $data['title'] ?? $task->title;  
        $task->description = $data['description'] ?? $task->description;    
        $task->status = $data['status'] ?? $task->status;   

        $task->save();

        return $this->response->setJsonContent($task);  
    }

    // DELETE-tasks/{id}
    public function deleteAction($id)
    {
        $task = Task::findFirstById($id);
        if (!$task) {
            return $this->response
                ->setStatusCode(404)
                ->setJsonContent(['error' => 'Task not found']);
        }

        $task->delete();

        return $this->response
            ->setJsonContent(['message' => 'Task deleted successfully']);
    }
}
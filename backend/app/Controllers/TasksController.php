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
        $userId = $this->getDI()->get('authUserId');

        if (empty($data['title'])) {
            return $this->response
                ->setStatusCode(400)
                ->setJsonContent(['error' => 'Title is required']);
        }

        $task = new Task();
        $task->user_id = $userId;
        $task->title = $data['title'];
        $task->description = $data['description'] ?? null;
        $task->status = 'pending';
        $task->save();

        return $this->response
            ->setStatusCode(201)
            ->setJsonContent($task);
    }
    // GET-tasks
    public function indexAction()
    {
        $userId = $this->di->get('authUserId');

        $tasks = Task::find([
            'conditions' => 'user_id = :id:',
            'bind' => ['id' => $userId]
        ]);

        return $this->response->setJsonContent($tasks->toArray());
    }



    // PUT-tasks/{id}
public function updateAction($id)
{
    $data = $this->request->getJsonRawBody(true);
    $userId = $this->di->get('authUserId');

    // Validar title (si viene en el request)
    if (array_key_exists('title', $data) && empty(trim($data['title']))) {
        return $this->response
            ->setStatusCode(400)
            ->setJsonContent([
                'error' => 'Title is required'
            ]);
    }

    // Validar status (si viene en el request)
    $allowedStatus = ['pending', 'in_progress', 'done'];

    if (
        array_key_exists('status', $data) &&
        !in_array($data['status'], $allowedStatus)
    ) {
        return $this->response
            ->setStatusCode(400)
            ->setJsonContent([
                'error' => 'Invalid status value'
            ]);
    }

    $task = Task::findFirst([
        'conditions' => 'id = :id: AND user_id = :user:',
        'bind' => [
            'id' => $id,
            'user' => $userId
        ]
    ]);

    if (!$task) {
        return $this->response
            ->setStatusCode(404)
            ->setJsonContent(['error' => 'Task not found']);
    }

    // Update solo si vienen los campos
    $task->title = $data['title'] ?? $task->title;
    $task->description = $data['description'] ?? $task->description;
    $task->status = $data['status'] ?? $task->status;

    if (!$task->save()) {
        return $this->response
            ->setStatusCode(500)
            ->setJsonContent([
                'error' => 'Could not update task'
            ]);
    }

    return $this->response->setJsonContent($task);
}

    // DELETE-tasks/{id}
    public function deleteAction($id)
    {
        $userId = $this->di->get('authUserId');

        $task = Task::findFirst([
            'conditions' => 'id = :id: AND user_id = :user:',
            'bind' => [
                'id' => $id,
                'user' => $userId
            ]
        ]);

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

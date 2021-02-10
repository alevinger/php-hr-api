<?php
namespace Src\Controller;

class GenericController {
    protected $db;
    protected $requestMethod;
    protected $id;
    protected $arguments;

    protected $modelInstance;

    public function __construct($db, $modelInstance, $requestMethod, $id, $arguments)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->id = $id;
        $this->arguments = $arguments;
        $this->modelInstance = $modelInstance;
    }

    public function processRequest(){
        
       

        switch ($this->requestMethod) {
            case 'GET':
                if ($this->id) {
                    $response = $this->getById($this->id);
                } else {   
                    $response = $this->get($this->arguments);
                };
                break;
            case 'POST':
                $response = $this->create();
                break;
            case 'PUT':
                $response = $this->update($this->id);
                break;
            default:
                $response = $this->notFoundResponse();
                break;
        }
        header($response['status_code_header']);
        if ($response['body']) {
            echo $response['body'];
        }
    }

    protected function get($arguments){
        $result = $this->modelInstance->get($arguments);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['X-Total-Count'] = count($result);
        $response['body'] = json_encode($result);
        return $response;
    }

    protected function getById($id){
        $result = $this->modelInstance->getById($id);
        if (! $result) {
            return $this->notFoundResponse();
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    protected function create() {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);

        if (! $this->validateInput($input)) {
            return $this->unprocessableEntityResponse();
        }
        $this->modelInstance->insert($input);
        $response['status_code_header'] = 'HTTP/1.1 201 Created';
        $response['body'] = null;
        return $response;
    }

    protected function update($id) {
        $result = $this->modelInstance->getById($id);
        if (! $result) {
            return $this->notFoundResponse();
        }
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        if (! $this->validateInput($input)) {
            return $this->unprocessableEntityResponse();
        }
        $this->modelInstance->update($id, $input);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = null;
        return $response;
    }

    protected function validateInput($input)
    {
        if (! isset($input['name'])) {
            return false;
           }
        return true;
    }

    protected function unprocessableEntityResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
        $response['body'] = json_encode([
            'error' => 'Invalid input'
        ]);
        return $response;
    }

    protected function notFoundResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = null;
        return $response;
    }

}


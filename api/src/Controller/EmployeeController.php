<?php
namespace Src\Controller;

use Src\Class\Employee;

class EmployeeController extends GenericController{
    public function __construct($db, $requestMethod, $id, $arguments){
       parent::__construct($db, new Employee($db), $requestMethod, $id, $arguments);    
    }

    protected function validateInput($input)
    {
        if (! isset($input['name'])) {
            return false;
        }

        if (! isset($input['departmentId'])) {
            return false;
        }

        if (! isset($input['salary'])) {
            return false;
        }
        return true;
    }



}


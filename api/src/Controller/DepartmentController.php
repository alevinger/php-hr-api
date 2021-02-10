<?php
namespace Src\Controller;

use Src\Class\Department;

class DepartmentController extends GenericController{
    public function __construct($db, $requestMethod, $id, $arguments){ 
       parent::__construct($db, new Department($db), $requestMethod, $id, $arguments);        
    }

    protected function validateInput($input)
    {
        if (! isset($input['name'])) {
            return false;
           }
        return true;
    }



}


<?php
     require '../../bootstrap.php';
     use Src\Class\Department;
   
     $departmentGT = new Department($dbConnection);

     // insert a new record
     $result = $departmentGT->insert([
     'name' => 'History'
     ]);

     // insert a new record
     $result = $departmentGT->insert([
          'name' => 'Computer Science'
          ]);

         

     echo "\ninserted departments";
     
?>
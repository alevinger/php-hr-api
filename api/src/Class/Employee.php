<?php
namespace Src\Class;

class Employee extends GenericModel {
    
    public function __construct($db){
        parent::__construct($db, 'employee');
    }

    public function get($arguments) { 
        $querySelectPart =  "SELECT * ";
        $queryFromPart= " FROM ". $this->table_name . " d";
        $queryWherePart = " WHERE 1 = 1";
        $queryOrderBy = " ORDER BY d.name";

        if(count($arguments)){
            if (array_key_exists('departmentId', $arguments)) {
                $queryWherePart =  $queryWherePart . " AND departmentId =". $arguments['departmentId'];
            }
        }

        try {
            $statement = $this->db->query( $statement = $querySelectPart . $queryFromPart . $queryWherePart. $queryOrderBy);
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }

    }

    public function insert(Array $input){
        try {
            $statement = $this->db->prepare(
                "
                INSERT INTO ". $this->table_name . "
                    (name, departmentId, salary)
                VALUES
                    (:name, :departmentId, :salary) 
                "
            );
            $statement->execute(array(
                'name' => $input['name'],
                'departmentId' => (int) $input['departmentId'],
                'salary' => (int) $input['salary'],
            ));
            return $statement->rowCount();
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }

    public function update($id, Array $input) {
        try {
            $statement = $this->db->prepare(
                "
                UPDATE ". $this->table_name . "
                SET 
                    name            = :name,
                    departmentId   = :departmentId,
                    salary          = :salary
                WHERE id = :id;
                "
            );
            $statement->execute(array(
                'id' => (int) $id,
                'name' => $input['name'],
                'departmentId' => (int) $input['departmentId'],
                'salary' => (int) $input['salary'],
            ));
            return $statement->rowCount();
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }

}
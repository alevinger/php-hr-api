<?php
namespace Src\Class;

class Department extends GenericModel {
    
    public function __construct($db){
        parent::__construct($db, 'department');
    }

    public function get($arguments) { 
        $querySelectPart =  "SELECT * ";
        $queryFromPart= " FROM ". $this->table_name . " d";
        $queryHavingPart = "";
        $queryOrderBy = " ORDER BY d.name";

        if(count($arguments)){
            if (array_key_exists('showMaxSalary', $arguments)) {
                $querySelectPart =  $querySelectPart . "
                            , COALESCE (( SELECT max(salary) AS salary 
                                        FROM employee
                                        WHERE departmentId = d.id
                                        GROUP BY departmentId ), 0) AS salary ";

                $queryOrderBy = " ORDER BY salary DESC";
            }

            $validParameters =  array_key_exists('salary', $arguments) && 
                                is_numeric($arguments['salary']) && 
                                array_key_exists('minNoOfEmployees', $arguments) && 
                                is_numeric($arguments['minNoOfEmployees']);

            if($validParameters) {
                    $querySelectPart = $querySelectPart . "
                        , (SELECT 
                            SUM(CASE WHEN salary >= ".intval($arguments['salary'])." THEN 1 ELSE 0 END) AS nrofemployees
                        FROM employee
                        WHERE departmentId = d.id
                        ) AS nrofemployees
                    ";

                    if(array_key_exists('minNoOfEmployees', $arguments)) { 
                        $queryHavingPart =  $queryHavingPart . " HAVING nrofemployees >= " . $arguments['minNoOfEmployees'];
                    }
                    else {
                        $queryHavingPart =  $queryHavingPart . " HAVING nrofemployees >= :minNoOfEmployees";
                    }

                    $queryOrderBy = " ORDER BY d.name";
            }
        }

        try {
            $statement = $this->db->query( $statement = $querySelectPart . $queryFromPart . $queryHavingPart. $queryOrderBy);
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
                    (name)
                VALUES
                    (:name) 
                "
            );
            $statement->execute(array(
                'name' => $input['name'],
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
                    name = :name
                WHERE id = :id;
                "
            );
            $statement->execute(array(
                'id' => (int) $id,
                'name' => $input['name'],
            ));
            return $statement->rowCount();
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }

}
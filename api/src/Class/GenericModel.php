<?php
namespace Src\Class;

class GenericModel {
    protected $db = null;
    protected $table_name = null;

    public function __construct($db, $table_name){
        $this->db = $db;
        $this->table_name = $table_name;
    }

    public function get($arguments) {
        try {
            $statement = $this->db->query(
                "
                    SELECT * 
                    FROM ".$this->table_name.";
                
                "
            );
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    public function getById($id) {
        try {
            $statement = $this->db->prepare(
                "
                    SELECT * 
                    FROM ".$this->table_name."
                    WHERE id = ?;
                "
            );
            $statement->execute(array($id));
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }

    public function insert(Array $input){
       
    }

    public function update($id, Array $input) {
       
    }

}
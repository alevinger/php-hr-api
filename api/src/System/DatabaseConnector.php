<?php
namespace Src\System;

class DatabaseConnector {

    private $dbConnection = null;
  
    public function __construct()
    {
        $host = getenv('MYSQL_HOST');
        $db   = getenv('MYSQL_DATABASE');
        $user = getenv('MYSQL_USERNAME');
        $pass = getenv('MYSQL_PASSWORD');

        try {
            $this->dbConnection = new \PDO(
                "mysql:host=$host;charset=utf8mb4;dbname=$db",
                $user,
                $pass
            );


        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    public function getConnection()  {
        return $this->dbConnection;
    }

    public function closeConnection() {
		return $this->dbConnection->close();
	}


}
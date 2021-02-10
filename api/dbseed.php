<?php
require 'bootstrap.php';
 
try {

    echo "\ndropping tables if existing...";

    $dbConnection->exec("DROP TABLE IF EXISTS employee");
    $dbConnection->exec("DROP TABLE IF EXISTS department");

    echo "\ncreating table departmet...";

    $createDepartmentTable = $dbConnection->exec(
        "
            CREATE TABLE IF NOT EXISTS department (
                id INT NOT NULL AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                PRIMARY KEY (id)
            )
        ");

        echo "\ntable departmet is created!";
        echo "\ncreating table employee...";

    $createEmployeeTable = $dbConnection->exec(
        "
            CREATE TABLE IF NOT EXISTS employee (
                id INT NOT NULL AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                departmentId INT DEFAULT NULL,
                salary INT DEFAULT 0,
                PRIMARY KEY (id),
                FOREIGN KEY (departmentId)
                        REFERENCES department(id)
                        ON DELETE SET NULL
            )
        ");

        echo "\ntable employee is created!";
       

    echo "\nSuccess!";
} catch (\PDOException $e) {
    exit($e->getMessage());
}        
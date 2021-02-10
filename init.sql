CREATE DATABASE IF NOT EXISTS Ayala_test_database;

USE Ayala_test_database;

DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS department;

CREATE TABLE IF NOT EXISTS department (
                id INT NOT NULL AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                PRIMARY KEY (id)
            )

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
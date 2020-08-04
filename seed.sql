-- Drops the database if it exists, ---> creates database
DROP DATABASE IF EXISTS my_team;
CREATE DATABASE my_team;
-- Initializes the database
USE my_team;
-- Employee table
CREATE TABLE employee
(
    id INT NOT NULL
    AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR
    (30),
    last_name VARCHAR
    (30),
    role_id INT,
    manager_id INT
);
    -- Role table
    CREATE TABLE role
    (
        id INT NOT NULL PRIMARY KEY,
        title VARCHAR(30),
        salary DECIMAL(10,2) NOT NULL,
        department_id INT
    );

    -- Department table
    CREATE TABLE department
    (
        id INT NOT NULL primary key,
        name VARCHAR(30)
    );

    INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
    -- carlo yung is a manager
    VALUES
        ("Carlo", "Yung");

    INSERT INTO role
        (title, salary, department_id)

    VALUES
        ("Manager", 150000);

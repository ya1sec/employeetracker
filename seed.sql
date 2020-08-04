-- Drops the database if it exists, ---> creates database
DROP DATABASE IF EXISTS my_team;
CREATE DATABASE my_team;
-- Initializes the database
USE my_team;

-- Department table
CREATE TABLE departments
(
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(45)
);

-- Role table
CREATE TABLE roles
(
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(45),
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL
);

-- Employee table
CREATE TABLE employees
(
    id INT NOT NULL
    AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR
    (45),
    last_name VARCHAR
    (45),
    role_id INT,
    manager VARCHAR
    (45) NULL    
);



    INSERT INTO employees
        (first_name, last_name, role_id, manager)
    -- carlo yung is a manager
    VALUES
        ("Carlo", "Yung", 1, "John Domer"),
        ("Lucy", "Rodriguez", 2, "John Domer"),
        ("Mark", "Gonzalez", 3, "John Domer"),
        ("Alexa", "Licata", 4, null),
        ("Laura", "Garvey", 5, null);

    INSERT INTO roles
        (id, title, salary, department_id)
    VALUES
        (1, "Lead Engineer", 150000.00, 1),
        (2, "Junior Engineer", 100000.00, 1),
        (3, "Accountant", 150000.00, 2),
        (4, "Sales Lead", 100000.00, 3),
        (5, "Lawyer", 200000.00, 4);


    INSERT INTO departments
        (id, name)
    VALUES
        (1, "Engineering"),
        (2, "Finance"),
        (3, "Sales"),
        (4, "Legal");


    SELECT *
    FROM employees;
    SELECT *
    FROM roles;
    SELECT *
    FROM departments;

    SELECT first_name, last_name
    FROM employees
        INNER JOIN roles ON employees.role_id = roles.id;

    SELECT title, salary
    FROM roles
        INNER JOIN departments ON role.department_id = departments.id;
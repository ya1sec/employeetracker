-- Drops the database if it exists, ---> creates database
DROP DATABASE IF EXISTS my_team;
CREATE DATABASE my_team;
-- Initializes the database
USE my_team;
-- Department table
CREATE TABLE departments
(
    id INT NOT NULL PRIMARY KEY,
    department VARCHAR(45)
);
-- Manager table
CREATE TABLE managers
(
    id INT NULL PRIMARY KEY,
    manager VARCHAR(45)
);
-- Role table
CREATE TABLE roles
(
    id INT NULL PRIMARY KEY,
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
    manager_id VARCHAR
    (45) NULL    
);
    INSERT INTO managers
        (id, manager)
    VALUES
        (1, "John Domer"),
        (2, "Lexi Zotov"),
        (3, "Alan Clarke"),
        (null, "NONE");
    INSERT INTO employees
        (first_name, last_name, role_id, manager_id)
    VALUES
        ("Carlo", "Yung", 1, 1),
        ("Lucy", "Rodriguez", 2, 1),
        ("Mark", "Gonzalez", 3, 2),
        ("Alexa", "Licata", 4, 3),
        ("Laura", "Garvey", 5, null);
    INSERT INTO roles
        (id, title, salary, department_id)
    VALUES
        (1, "Senior Engineer", 150000.00, 1),
        (2, "Junior Engineer", 100000.00, 1),
        (3, "Accountant", 150000.00, 2),
        (4, "Sales Lead", 100000.00, 3),
        (5, "Lawyer", 200000.00, 4);
    INSERT INTO departments
        (id, department)
    VALUES
        (1, "Engineering"),
        (2, "Finance"),
        (3, "Sales"),
        (4, "Legal");
    SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.department, managers.manager
    FROM employees LEFT JOIN roles ON roles.id = employees.role_id LEFT JOIN departments ON departments.id = roles.department_id LEFT JOIN managers ON managers.id = employees.manager_id;
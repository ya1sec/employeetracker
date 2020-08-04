-- Drops the database if it exists, ---> creates database
drop database if exists my_team;
create database my_team;
-- Initializes the database
use my_team;
-- Employee table
create table employee
(
    id int not null
    auto_increment primary key,
    first_name varchar
    (30),
    last_name varchar
    (30),
    role_id int,
    manager_id int
);
    -- Role table
    create table role
    (
        id int not null primary key,
        title varchar(30),
        salary decimal(10,2) not null,
        department_id int
    );
    -- Department table
    create table department
    (
        id int not null primary key,
        name varchar(30)
    );



--  Seeding departments table for starter interface in terminal.
INSERT INTO department (name)
VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Legal');


-- Seeding roles table for starter interface in terminal.
INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Account Manager', 160000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);



-- Seeding employees table for starter interface in terminal.
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Fromm', 1, NULL),
('Mike', 'Chang', 2, 1), 
('kevin', 'Perez', 3, NULL), 
('Kevin', 'Tupac', 4, 3), 
('Kunal', 'Singh', 5, NULL), 
('Malia', 'Obama', 6, 5), 
('Sarah', 'Lord', 7, NULL), 
('Tom', 'Ivey', 8, 7);

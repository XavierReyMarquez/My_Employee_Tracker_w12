USE employees_db

INSERT INTO departments (name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');


INSERT INTO roles (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2), 
('Software Engineer', 120000, 2),
('Account Manager', 160000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Xavier', 'Marquez', 4, NULL),
('Mary', 'Rose', 1, 1),
('Jerry', 'Summer', 2, 1),
('Rick', 'Shanchaz', 3, 1),
('Morty', 'Shanchaz', 4, NULL),
('Pencil', 'Selvester', 4, NULL),
('Dan', 'Gray', 5, 6),
('Ben', 'DaBest', 6, NULL),
('Carlos', 'Rios', 7, 8),
('James', 'Dean', 8, 8),
('Sarah', 'Mia', 8, NULL),
('Albert', 'Einstien', 4, NULL),
('Ricky', 'Small', 4, NULL),
('Gray', 'Fullburst', 5, 6);
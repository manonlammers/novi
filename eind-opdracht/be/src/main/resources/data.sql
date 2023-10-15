-- Clear data
DELETE FROM companies;
DELETE FROM users;
DELETE FROM customers;

-- Insert dev data
INSERT INTO companies (id, name, email, phone, address, zip_code, city, kvk_number, vat_number)
VALUES (1001, 'company name', 'test-company1@mail.com', '0612345678', 'Some street 1', '1234 AB', 'city', '1234', '5678');

INSERT INTO users (id, email, password, company_id)
VALUES (1001, 'test@mail.com', 'test', 1001);

INSERT INTO customers (id, company_id, name, treatment, minutes, pain, info)
VALUES (5001, 1001, 'Customer 1', 'Some treatment', 60, 'Pain', 'blablabla');

INSERT INTO customers (id, company_id, name, treatment, minutes, pain, info)
VALUES (5002, 1001, 'Customer 2', 'Some treatment', 60, 'Pain', 'blablabla');

INSERT INTO customers (id, company_id, name, treatment, minutes, pain, info)
VALUES (5003, 1001, 'Customer 3', 'Some treatment', 60, 'Pain', 'blablabla');

INSERT INTO customers (id, company_id, name, treatment, minutes, pain, info)
VALUES (5004, 1001, 'Customer 4', 'Some treatment', 60, 'Pain', 'blablabla');

INSERT INTO customers (id, company_id, name, treatment, minutes, pain, info)
VALUES (5005, 1001, 'Customer 5', 'Some treatment', 60, 'Pain', 'blablabla');

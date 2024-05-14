-- init for postgres db
CREATE TABLE users (
    name varchar(100) DEFAULT 'name',
    firstname varchar(100) DEFAULT 'firstname',
    lastname varchar(100) DEFAULT 'lastname',
    id SERIAL PRIMARY KEY,
    email varchar(100) UNIQUE NOT NULL,
    password varchar(100) NOT NULL
);

CREATE TABLE items (
    name varchar(100) NOT NULL,
    id SERIAL PRIMARY KEY,
    count int NOT NULL,
    date date DEFAULT CURRENT_DATE
);

INSERT INTO users (name, id, email, password, firstname, lastname) VALUES ('chef', 1, 'chef@gpt.com', '123456', 'Chef', 'GPT');
INSERT INTO users (name, id, email, password, firstname, lastname) VALUES ('test', 2, 'test@user', 'testpassword', 'Test', 'User');
INSERT INTO users (name, id, email, password, firstname, lastname) VALUES ('admin', 3, 'grgurev@campus.tu-berlin.de', 'testingChef1', 'Luka Tome', 'Grgurev'); 

INSERT INTO items (name, count, date) VALUES ('apple', 10, '2021-01-07');
INSERT INTO items (name, count, date) VALUES ('banana', 20, '2021-02-08');
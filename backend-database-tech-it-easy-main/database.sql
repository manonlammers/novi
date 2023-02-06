DROP TABLE IF EXISTS remote_controller;
DROP TABLE IF EXISTS ci_module;
DROP TABLE IF EXISTS television;

CREATE TABLE television (
     id serial PRIMARY KEY,
     name varchar(255),
     brand varchar(255),
     type varchar(255) NOT NULL UNIQUE,
     price double precision,
     available int DEFAULT 0,
     sold int,
     refresh_rate double precision,
     screen_type varchar(255)
);

CREATE TABLE remote_controller (
    id serial PRIMARY KEY,
    name varchar(255),
    brand varchar(255),
    price double precision,
    available int DEFAULT 0,
    sold int,
    compatible_with varchar(255),
    battery_type varchar(255),
    television_id int,
    FOREIGN KEY (television_id) REFERENCES television(id)
);

CREATE TABLE ci_module (
   id serial PRIMARY KEY,
   name varchar(255),
   brand varchar(255),
   price double precision,
   available int DEFAULT 0,
   sold int,
   adjustable boolean,
   television_id int,
   FOREIGN KEY (television_id) REFERENCES television(id)
);

CREATE TABLE wall_bracket (
   id serial PRIMARY KEY,
   name varchar(255),
   brand varchar(255),
   price double precision,
   available int DEFAULT 0,
   sold int,
   television_id int,
   wall_bracket_id int,
   FOREIGN KEY (television_id) REFERENCES television(id)
);

CREATE TABLE television_wall_bracket (
   television_id int,
   wall_bracket_id int,
   FOREIGN KEY (television_id) REFERENCES television(id),
   FOREIGN KEY (wall_bracket_id) REFERENCES wall_bracket,
   PRIMARY KEY (television_id, wall_bracket_id)
);

INSERT INTO television (name, brand, type, price, available, sold, refresh_rate, screen_type)
VALUES ('OLED', 'LG', 'XPH45', 1300, 10, 24, 100, 'mat'),
       ('Flatscreen', 'Samsumg', 'XPP50', 1100, 11, 3, 75, 'ips');

INSERT INTO remote_controller (name, brand, price, sold, battery_type, television_id)
VALUES ('Frame', 'Philips', 1500, 25, 'aaa', (SELECT id FROM television WHERE type='XPH45'));

SELECT * FROM television
JOIN remote_controller rc on television.id = rc.television_id;

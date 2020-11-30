--- Team Kimchi Amateur Race Circuit Database Definitions

--- Track Entity
CREATE TABLE track(
    track_id INT AUTO_INCREMENT,
    track_name VARCHAR(30) NOT NULL,
    track_address VARCHAR(30) NOT NULL,
    track_state VARCHAR(30) NOT NULL,
    track_city VARCHAR(30) NOT NULL,
    track_zip VARCHAR(5) NOT NULL,
    track_length INT NOT NULL,
    PRIMARY KEY(track_id)
);

--- Race Entity
CREATE TABLE race(
    race_id INT AUTO_INCREMENT,
    track_id INT NOT NULL,
    race_date DATE NOT NULL,
    race_weather VARCHAR(30) NOT NULL,
    winner_id INT NOT NULL,
    PRIMARY KEY(race_id)
);

--- Driver Entity
CREATE TABLE driver(
    driver_id INT AUTO_INCREMENT,
    driver_name VARCHAR(30) NOT NULL,
    driver_dob DATE NOT NULL,
    driver_height INT NOT NULL,
    driver_weight INT NOT NULL,
    team_id INT,
    driver_wins INT NOT NULL,
    vehicle_id INT NOT NULL,
    PRIMARY KEY(driver_id)
);

--- Add FULLTEXT to driver_name attribute
ALTER TABLE driver ADD FULLTEXT(driver_name);

--- Vehicle Entity
CREATE TABLE vehicle(
    vehicle_id INT AUTO_INCREMENT,
    vehicle_make VARCHAR(30) NOT NULL,
    vehicle_model VARCHAR(30) NOT NULL,
    vehicle_year YEAR NOT NULL,
    PRIMARY KEY(vehicle_id)
);

--- Team Entity
CREATE TABLE team(
    team_id INT AUTO_INCREMENT,
    team_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(team_id)
);

--- Race Driver Table for M2M relationship
CREATE TABLE race_driver(
    race_id INT NOT NULL,
    driver_id INT NOT NULL,
    PRIMARY KEY(race_id, driver_id)
);

--- Foreign Keys
ALTER TABLE race
ADD CONSTRAINT fk_race_1
FOREIGN KEY (track_id) 
REFERENCES track(track_id)
ON DELETE CASCADE;

ALTER TABLE race
ADD CONSTRAINT fk_race_2
FOREIGN KEY (winner_id) 
REFERENCES driver(driver_id)
ON DELETE CASCADE;

ALTER TABLE race_driver
ADD CONSTRAINT fk_race_driver_1
FOREIGN KEY (race_id)
REFERENCES race(race_id)
ON DELETE CASCADE;

ALTER TABLE race_driver
ADD CONSTRAINT fk_race_driver_2
FOREIGN KEY (driver_id) 
REFERENCES driver(driver_id)
ON DELETE CASCADE;

ALTER TABLE driver
ADD CONSTRAINT fk_driver_1
FOREIGN KEY (team_id) 
REFERENCES team(team_id)
ON DELETE SET NULL;

ALTER TABLE driver
ADD CONSTRAINT fk_driver_2
FOREIGN KEY (vehicle_id) 
REFERENCES vehicle(vehicle_id)
ON DELETE CASCADE;

--- Inserting sample data
INSERT INTO team (team_name) VALUES ('Imaginary Team');
INSERT INTO team (team_name) VALUES ('Not Real Team');

INSERT INTO vehicle (vehicle_make, vehicle_model, vehicle_year) VALUES ('Ford', 'Focus', '2019');
INSERT INTO vehicle (vehicle_make, vehicle_model, vehicle_year) VALUES ('Tesla', 'Model 3', '2019');
INSERT INTO vehicle (vehicle_make, vehicle_model, vehicle_year) VALUES ('Audi', 'A8', '2016');
INSERT INTO vehicle (vehicle_make, vehicle_model, vehicle_year) VALUES ('Lexus', 'GS', '2017');

INSERT INTO track (track_name, track_address, track_state, track_city, track_zip, track_length)
VALUES ('Rainbow Road', '321 Atmosphere Way', 'PA', 'Mushroom Kingdom', '19118', '1200');
INSERT INTO track (track_name, track_address, track_state, track_city, track_zip, track_length)
VALUES ('Moo Moo Meadows', '458 Milky Road', 'IL', 'Bean Bean Kingdom', '60684', '1070');

INSERT INTO driver (driver_name, driver_dob, driver_height, driver_weight, team_id, driver_wins, vehicle_id)
VALUES ('Mario', '1986-01-21', '6', '210', '1', '20', '1');
INSERT INTO driver (driver_name, driver_dob, driver_height, driver_weight, team_id, driver_wins, vehicle_id)
VALUES ('Luigi', '1987-04-13', '7', '190', '1', '15', '2');
INSERT INTO driver (driver_name, driver_dob, driver_height, driver_weight, team_id, driver_wins, vehicle_id)
VALUES ('Peach', '1985-05-17', '6', '130', '2', '17', '3');
INSERT INTO driver (driver_name, driver_dob, driver_height, driver_weight, team_id, driver_wins, vehicle_id)
VALUES ('Toad', '1990-02-09', '4', '90', '2', '16', '4');

INSERT INTO race (track_id, race_date, race_weather, winner_id) 
VALUES ('1', '2019-11-05', 'Colorful', '3');
INSERT INTO race (track_id, race_date, race_weather, winner_id) 
VALUES ('1', '2018-07-04', 'Not as bright', '2');
INSERT INTO race (track_id, race_date, race_weather, winner_id) 
VALUES ('2', '2019-10-21', 'Sunny', '1');
INSERT INTO race (track_id, race_date, race_weather, winner_id) 
VALUES ('2', '2017-05-13', 'Rain', '4');

INSERT INTO race_driver (race_id, driver_id) VALUES('1', '1');
INSERT INTO race_driver (race_id, driver_id) VALUES('1', '2');
INSERT INTO race_driver (race_id, driver_id) VALUES('1', '3');
INSERT INTO race_driver (race_id, driver_id) VALUES('2', '1');
INSERT INTO race_driver (race_id, driver_id) VALUES('2', '2');
INSERT INTO race_driver (race_id, driver_id) VALUES('3', '1');
INSERT INTO race_driver (race_id, driver_id) VALUES('3', '2');
INSERT INTO race_driver (race_id, driver_id) VALUES('3', '3');
INSERT INTO race_driver (race_id, driver_id) VALUES('3', '4');
INSERT INTO race_driver (race_id, driver_id) VALUES('4', '4');
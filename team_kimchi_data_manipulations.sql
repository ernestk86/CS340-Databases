--- DRIVER PAGE

--- Query to SEARCH for driver
--- with colon : character being used to denote variables
--- that will have data from the backend progamming language
SELECT  driver_id as id, 
        driver_name, 
        driver_dob, 
        driver_height, 
        driver_weight, 
        team_id, 
        driver_wins, 
        vehicle_id 
FROM    driver
WHERE   driver_name 
LIKE    + ':driver_name_input';

--- Query to READ data from driver
SELECT  driver_id as id, 
        driver_name, 
        DATE_FORMAT(driver_dob, '%m/%d/%Y') as driver_dob, 
        driver_height, 
        driver_weight, 
        team_name, 
        driver_wins, 
        ehicle_make, 
        vehicle_model 
FROM    driver LEFT OUTER JOIN 
        team ON driver.team_id = team.team_id JOIN 
        vehicle ON driver.vehicle_id = vehicle.vehicle_id;

--- Query to ADD a new driver into driver table
INSERT INTO driver (driver_name, driver_dob, driver_height, driver_weight, team_id, driver_wins, vehicle_id)
VALUES (':driver_name_input', ':driver_dob_input', ':driver_height_input', ':driver_weight_input', ':team_id_input', ':driver_wins_input', ':vehicle_id_input');

--- Query to DELETE entry from driver table
DELETE FROM driver WHERE driver_id = :driver_id;

--- Query to UPDATE entry from driver table
UPDATE driver
SET driver_name = ':driver_name_input', driver_dob = ':driver_dob_input', driver_height = ':driver_height_input', driver_weight = ':driver_weight_input', team_id = ':team_id_input', driver_wins = ':driver_wins_input', vehicle_id = ':vehicle_id_input'
WHERE driver_id = :driver_id;

--- Query to READ data from vehicle
SELECT vehicle_id as id, vehicle_make, vehicle_model, vehicle_year 
FROM vehicle;

--- Query to ADD a new vehicle into vehicle table
INSERT INTO vehicle (vehicle_make, vehicle_model, vehicle_year) 
VALUES (':vehicle_make_input', ':vehicle_model_input', ':vehicle_year_input');

--- Query to DELETE entry from vehicle table
DELETE FROM vehicle WHERE vehicle_id = :vehicle_id;

--- Query to UPDATE entry from vehicle table
UPDATE vehicle
SET vehicle_make = ':vehicle_make_input', vehicle_model = ':vehicle_model_input', vehicle_year = ':vehicle_year_input'
WHERE vehicle_id = :vehicle_id;

--- Query to READ data from team
SELECT team_id as id, team_name 
FROM team;

--- Query to ADD a new team into team table
INSERT INTO team (team_name) VALUES (':team_name_input');

--- Query to DELETE entry from team table
DELETE FROM team WHERE team_id = :team_id;

--- Query to UPDATE entry from team table
UPDATE team
SET team_name = ':team_name_input'
WHERE team_id = :team_id;


--- RACE PAGE

--- Query to READ data from race
SELECT  race_id as id, track_name, race_date, race_weather, driver_name 
FROM    race JOIN 
        track ON race.track_id = track.track_id JOIN 
        driver ON race.winner_id = driver.driver_id 
ORDER BY race_id ASC;

--- Query to ADD a new race into race table
INSERT INTO race (track_id, race_date, race_weather, winner_id) 
VALUES (':track_id_input', ':race_date_input', ':race_weather_input', ':winner_id_input');

--- Query to DELETE entry from race table
DELETE FROM race WHERE race_id = :race_id;

--- Query to UPDATE entry from race table
UPDATE race
SET track_id = ':track_id_input', race_date = ':race_date_input', race_weather = ':race_weather_input', winner_id = ':winner_id_input'
WHERE race_id = :race_id;

--- Query to READ data from race_driver
SELECT race_id, driver_name 
FROM race_driver 
JOIN driver ON driver.driver_id = race_driver.driver_id 
ORDER BY race_id ASC;

--- Query to ADD a new driver into drivers in race table
INSERT INTO race_driver (race_id, driver_id) VALUES(':race_id_input', ':driver_id_input');

--- Query to DELETE entry from race_driver table
DELETE FROM race_driver WHERE race_id = ':race_id' AND driver_id = ':driver_id';

--- Query to READ data from track
SELECT track_id as id, track_name, track_address, track_state, track_city, track_zip, track_length 
FROM track 
ORDER BY track_id ASC;

--- Query to ADD a new track into track table
INSERT INTO track (track_name, track_address, track_state, track_city, track_zip, track_length)
VALUES (':track_name_input', ':track_address_input', ':track_state_input', ':track_city_input', ':track_zip_input', ':track_length_input');

--- Query to DELETE entry from track table
DELETE FROM track WHERE track_id = :track_id;

--- Query to UPDATE entry from track table
UPDATE track
SET track_name = ':track_name_input', track_address = ':track_address_input', track_state = ':track_state_input', track_city = ':track_city_input', track_zip = ':track_zip_input', track_length = ':track_length_input'
WHERE track_id = :track_id;
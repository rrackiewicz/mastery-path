INSERT INTO masters (uid)
VALUES
 ($1) 
ON CONFLICT (uid) 
DO UPDATE SET uid=EXCLUDED.uid

returning mid;

--What happens here if there is a conflict? Is a mid returned on the conflict? 
-- https://stackoverflow.com/questions/34708509/how-to-use-returning-with-on-conflict-in-postgresql#42217872

--NOTE: The DO UPDATE clause is necessary in order to return mid when a master by the name $1 already exists. We are basically setting uid equal to itself because DO NOTHING will not return a mid
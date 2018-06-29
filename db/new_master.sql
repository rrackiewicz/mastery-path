INSERT INTO masters (uid)
VALUES
 ($1) 
ON CONFLICT (uid) 
DO NOTHING

returning mid;

--What happens here if there is a conflict? Is a mid returned on the conflict? 
-- https://stackoverflow.com/questions/34708509/how-to-use-returning-with-on-conflict-in-postgresql#42217872
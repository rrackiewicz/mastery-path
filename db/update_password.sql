UPDATE users
SET hash = $2
WHERE username = $1;

SELECT username, hash FROM users
WHERE username = $1 AND hash = $2;

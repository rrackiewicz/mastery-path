
INSERT INTO users
(first_name, last_name, username, email, hash, admin)
VALUES
($1, $2, $3, $4, $5, false)
RETURNING uid, first_name, last_name, username, email, admin;
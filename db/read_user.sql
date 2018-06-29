select uid, first_name, last_name, username, email, admin FROM users
where uid = $3
OR username = $1 AND hash = $2;
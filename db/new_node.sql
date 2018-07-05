INSERT INTO nodes 
(pid, node_name, ord, depth, is_complete)
VALUES 
($1, $2, $3, $4, $5)

RETURNING nid;

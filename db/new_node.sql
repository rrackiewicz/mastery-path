INSERT INTO nodes 
(pid, node_name, ord, depth)
VALUES 
($1, $2, $3, $4)

RETURNING nid;

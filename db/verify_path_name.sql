select path_name from paths
where path_name ILIKE $1 AND pid != $2;

--ILIKE is a case-insensitive =
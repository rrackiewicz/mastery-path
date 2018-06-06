update paths
set path_name = $2,
    abstract = $3,
    img = $4
    hrs = $5
    rating = $6
where pid = $1;
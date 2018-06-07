SELECT img, hrs, rating, path_name, abstract, paths.pid, skill_name, is_tld, ord, node_name, depth
FROM users
    JOIN masters
        ON users.uid = masters.uid
    JOIN masters_paths
        ON masters.mid = masters_paths.mid
    JOIN paths
        ON masters_paths.pid = paths.pid
    JOIN paths_skills
        ON paths.pid = paths_skills.pid
    LEFT JOIN skills
        ON paths_skills.skid = skills.skid
    JOIN nodes
        ON paths.pid = nodes.pid

WHERE paths.pid = $1
ORDER BY ord ASC;
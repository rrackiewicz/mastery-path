SELECT username, img, hrs, rating, path_name, abstract, paths.pid, pub, skill_name
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

WHERE users.uid = $1 AND is_tld = 'true';
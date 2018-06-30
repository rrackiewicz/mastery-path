SELECT username, first_name, last_name, img, hrs, rating, path_name, abstract, paths.pid, skill_name
FROM users
    JOIN masters
        ON users.uid = masters.uid
    JOIN masters_paths
        ON masters.mid = masters_paths.mid
    JOIN paths
        ON masters_paths.pid = paths.pid
    JOIN paths_skills
        ON paths.pid = paths_skills.pid
    JOIN skills
        ON paths_skills.skid = skills.skid       

WHERE path_name ~* $1 AND pub = 'true' AND is_tld = 'true';
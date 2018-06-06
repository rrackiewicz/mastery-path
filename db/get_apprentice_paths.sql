SELECT username, img, hrs, rating, path_name, abstract, paths.pid, skill_name
FROM users
    JOIN apprentices
        ON users.uid = apprentices.uid
    JOIN apprentices_paths
        ON apprentices.aid = apprentices_paths.aid
    JOIN paths
        ON apprentices_paths.pid = paths.pid
    JOIN paths_skills
        ON paths.pid = paths_skills.pid
    JOIN skills
        ON paths_skills.skid = skills.skid       

WHERE users.uid = $1 AND is_tld = 'true';
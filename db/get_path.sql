SELECT img, hrs, rating, path_name, abstract, paths.pid, skill_name, is_tld, nodes.nid, nodes.ord AS node_ord, node_name, depth, content_type, content, content.ord AS content_ord
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
    LEFT JOIN content
        ON nodes.nid = content.nid

WHERE paths.pid = $1
ORDER BY nodes.ord, content.ord;


--Added in content join and columns returned. Had to alias multiple "ord" columns. Removed order by as it seemed pointless now that there are two orders
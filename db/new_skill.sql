WITH ins AS (
  INSERT INTO skills
    (skill_name)
  VALUES
    ($2)
  RETURNING skid)

INSERT INTO paths_skills
  (pid, skid, is_tld)
SELECT $1, skid, $3
FROM ins;
WITH ins AS (
  INSERT INTO skills
    (skill_name)
  VALUES
    ($2)
  ON CONFLICT(skill_name)
  DO UPDATE SET skill_name = EXCLUDED.skill_name
  RETURNING skid)

INSERT INTO paths_skills
  (pid, skid, is_tld)
SELECT $1, skid, $3
FROM ins;


--NOTE: The DO UPDATE clause is necessary in order to return skid a skill by the name $2 already exists. We are basically setting skill_name equal to itself because DO NOTHING will not return a skid
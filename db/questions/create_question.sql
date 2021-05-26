INSERT INTO pov_questions
(user_id, question)
WHERE ($1, $2) RETURNING *;
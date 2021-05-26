DROP TABLE IF EXISTS i_povs;
DROP TABLE IF EXISTS pov_questions;
DROP TABLE IF EXISTS pov_users;

CREATE TABLE pov_users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(2000) NOT NULL,
);

CREATE TABLE pov_questions (
    question_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES pov_users(user_id)
    question VARCHAR(300)
);
CREATE TABLE i_povs (
    i_pov_id SERIAL PRIMARY KEY,
    question_id INT REFERENCES pov_questions(question_id),
    i_pov VARCHAR(3000),
);

DROP TABLE descriptions;
DROP TABLE users;
DROP TABLE comments;

CREATE TABLE IF NOT EXISTS descriptions (
    id INT,
    video_id INT,
    description TEXT,
    categories TEXT [],
    likes INT
);

CREATE TABLE IF NOT EXISTS users (
    id INT,
    username TEXT,
    user_thumbnail TEXT
);

CREATE TABLE IF NOT EXISTS comments (
    id TEXT,
    video_id INT,
    user_id INT,
    comment TEXT,
    date TIMESTAMPTZ
);
CREATE TABLE IF NOT EXISTS users(
    id serial PRIMARY KEY,
    username text UNIQUE NOT NULL,
    email text UNIQUE NOT NULL
);


Log into postgres and create vimeo database

```
psql -U postgres
psql=# CREATE DATABASE vimeo;`
psql=# \q
```

Create descriptions table

```
psql -U postgres vimeo
vimeo=# CREATE TABLE descriptions (
    _id INT,
    video_id INT,
    description TEXT,
    categories TEXT [],
    likes INT
);
```

Create users table

```
psql -U postgres vimeo
vimeo=# CREATE TABLE users (
    _id INT,
    username TEXT,
    user_thumbnail TEXT
);
```

Create comments table

```
psql -U postgres vimeo
vimeo=# CREATE TABLE comments (
    _id TEXT,
    video_id INT,
    user_id INT,
    comment TEXT
);
```
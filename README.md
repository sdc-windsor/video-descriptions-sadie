# CRUD Docs

## Comments

* `POST /comments/` body include: video_id, user_id, and comment
* `GET /comments/video_id`
* `PUT /comments/_id` body include: video_id, user_id, and comment
* `DELETE /comments/_id`

## Descriptions

Category options: 'Animation', 'Comedy', 'Music', 'Education', 'Art & Design', 'Documentary', 'Food', 'Fashion', 'Travel', 'Journalism'

* `POST /descriptions` body include: video_id, description, and an array of categories
* `GET /descriptions/video_id`
* `PUT /descriptions` body include: video_id, description, and an array of categories
* `DELETE /descriptions/video_id`


# Initialize Database

### Log into postgres and create vimeo database

```
psql -U postgres
psql=# CREATE DATABASE vimeo;`
psql=# \q
```

### Create descriptions table

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

### Create users table

```
psql -U postgres vimeo
vimeo=# CREATE TABLE users (
    _id INT,
    username TEXT,
    user_thumbnail TEXT
);
```

### Create comments table

```
psql -U postgres vimeo
vimeo=# CREATE TABLE comments (
    _id TEXT,
    video_id INT,
    user_id INT,
    comment TEXT,
    date TIMESTAMPTZ
);
```

### Update descriptions table to auto increment id

```
psql -U postgres vimeo
vimeo=# CREATE SEQUENCE seq_video_id;
vimeo=# SELECT setval('seq_video_id', max(video_id)) FROM descriptions;
vimeo=# ALTER TABLE descriptions ALTER COLUMN _id SET DEFAULT nextval('seq_video_id');
```
### Create Index

After seeding the database:

created index on video_id for descriptions and comments
```
psql -U postgres vimeo
vimeo=# CREATE UNIQUE INDEX on descriptions (video_id);
vimeo=# CREATE INDEX on comments (video_id);
vimeo=# CREATE UNIQUE INDEX on users (_id);
```
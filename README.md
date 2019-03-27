# CRUD Docs

## Comments

* `POST /comments?video_id=2&user_id=2&comment=dogs+smell+bad`
* `GET /comments/video_id`
* `PUT /comments?video_id=2&user_id=2&comment=dogs+smell+good`
* `DELETE /comments/video_id`

## Descriptions

Category options: 'Animation', 'Comedy', 'Music', 'Education', 'Art & Design', 'Documentary', 'Food', 'Fashion', 'Travel', 'Journalism'

* `POST /descriptions?video_id=10000001&description=video+of+dogs+smelling+bad&categories=Animation+Food`
* `GET /descriptions/video_id`
* `PUT /descriptions?video_id=2&description=video+of+cats&categories=Documentary`
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
    date TIME
);
```

### Update descriptions table to auto increment id

```
psql -U postgres vimeo
vimeo=# CREATE SEQUENCE seq_video_id;
vimeo=# SELECT setval('seq_video_id', max(video_id)) FROM descriptions;
vimeo=# ALTER TABLE descriptions ALTER COLUMN _id SET DEFAULT nextval('seq_video_id');
```

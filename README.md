# CRUD Docs

## Comments

* `POST /comments/` body include: video_id, user_id, and comment
* `GET /comments/video_id`
* `GET /comments?min=1&max=1000` return comments for 1000 videos at a time
* `PUT /comments/_id` body include: video_id, user_id, and comment
* `DELETE /comments/_id`

## Descriptions

Category options: 'Animation', 'Comedy', 'Music', 'Education', 'Art & Design', 'Documentary', 'Food', 'Fashion', 'Travel', 'Journalism'

* `POST /descriptions` body include: video_id, description, and an array of categories
* `GET /descriptions/video_id`
* `GET /descriptions?min=1&max=1000` return descriptions for 1000 videos at a time
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
    id INT,
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
    id INT,
    username TEXT,
    user_thumbnail TEXT
);
```

### Create comments table

```
psql -U postgres vimeo
vimeo=# CREATE TABLE comments (
    id TEXT,
    video_id INT,
    user_id INT,
    comment TEXT,
    date TIMESTAMPTZ
);
```

# Seeding Database

### Descriptions

To create fake descriptions for 10 million videos:

1. open a terminal and navigate to project directory
2. run the following commands
```
BATCH_NUM=0 node database/create-fake-descriptions.js
BATCH_NUM=1 node database/create-fake-descriptions.js
BATCH_NUM=2 node database/create-fake-descriptions.js
BATCH_NUM=3 node database/create-fake-descriptions.js
BATCH_NUM=4 node database/create-fake-descriptions.js
BATCH_NUM=5 node database/create-fake-descriptions.js
BATCH_NUM=6 node database/create-fake-descriptions.js
BATCH_NUM=7 node database/create-fake-descriptions.js
BATCH_NUM=8 node database/create-fake-descriptions.js
BATCH_NUM=9 node database/create-fake-descriptions.js
```

3.  run `node database/seed-description.js`

### Comments

To create fake comments for 10 million videos:

1. open a terminal and navigate to project directory
2. run `node database/create-fake-comments.js`
3. run `node database/seed-comments.js`

### Users

To create fake users:

1. open a terminal and navigate to project directory
2. run `node database/create-fake-users.js`
3. run `node database/seed-users.js`

### Create Index

After seeding the database:

created index on video_id for descriptions and comments
```
psql -U postgres vimeo
vimeo=# CREATE UNIQUE INDEX on descriptions (video_id);
vimeo=# CREATE INDEX on comments (video_id);
vimeo=# CREATE UNIQUE INDEX on users (id);
```

### Update descriptions table to auto increment id

```
psql -U postgres vimeo
vimeo=# CREATE SEQUENCE seq_video_id;
vimeo=# SELECT setval('seq_video_id', max(video_id)) FROM descriptions;
vimeo=# ALTER TABLE descriptions ALTER COLUMN id SET DEFAULT nextval('seq_video_id');
```
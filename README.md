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
# Setup information

Any SQL database can be used, but PostgreSQL is a plus. You can either create your own setup or use the one described below.

After database setup you should be able to connect to database by using command below on your local environment
```sh
psql -U postgres -W -d postgres  -h localhost -p 5432
```

# Windows

1. Download PostgreSQL installer ([link](https://www.postgresql.org/download/)) and run it
2. Add the PostgreSQL bin directory path to the PATH environmental variable.
   > * Open 'Edit the system environment variables' from Control Panel or Windows Search
   > * Select 'Environment variables..' at the bottom right corner of opened window
   > * Double click 'Path' value in either 'User' or 'System' variables section and add the path to newly opened window

# Linux (Ubuntu)


```sh
sudo apt update
# switch to postgres user
sudo -i -u postgres
# install postgres
sudo apt install postgresql -y
# start the service
sudo service postgresql start
```

# Docker

[Docker file](./Dockerfile) is included.

```sh
docker build -t mock-db .
docker run -p 5432:5432 -it mock-db 
```

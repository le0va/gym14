FROM postgres:latest

RUN apt-get update &&  \ 
  apt-get -y install postgresql-16-cron && \ 
  apt-get clean \ 
  && rm -rf /var/lib/apt/lists/*

COPY init-pgcron.sh /docker-entrypoint-initdb.d/
COPY init-pgcron.sql /docker-entrypoint-initdb.d/

EXPOSE 5432

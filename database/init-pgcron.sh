#!/bin/bash
echo "shared_preload_libraries = 'pg_cron'" >> /var/lib/postgresql/data/postgresql.conf
echo "cron.database_name = 'postgres'" >> /var/lib/postgresql/data/postgresql.conf

# Принудительно перезапустить PostgreSQL, чтобы применить изменения в конфигурации
pg_ctl -D /var/lib/postgresql/data -l /var/lib/postgresql/data/logfile stop
pg_ctl -D /var/lib/postgresql/data -l /var/lib/postgresql/data/logfile start

# Сообщение о завершении скриптаa
echo "init-pgcron.sh work end"
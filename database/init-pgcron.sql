-- Создаем расширение pg_cron если оно еще не создано
CREATE EXTENSION IF NOT EXISTS pg_cron;


-- -- Создаем функцию
CREATE OR REPLACE FUNCTION check_training_max_duration() RETURNS VOID AS $$
DECLARE
  user_id INTEGER;
BEGIN
  -- Логика функции
  FOR user_id IN (
    SELECT id 
    FROM "user" 
    WHERE "trainingStart" IS NOT NULL 
      AND (CURRENT_TIMESTAMP - "trainingStart") > interval '4 hours'
  )
  LOOP
    INSERT INTO training_session ("start", "end", "userId")
    VALUES (
      (SELECT "trainingStart" FROM "user" WHERE id=user_id),
      CURRENT_TIMESTAMP,
      user_id
    );
    UPDATE "user" SET "trainingStart" = NULL WHERE id = user_id;
  END LOOP;
END;
$$ LANGUAGE plpgsql;


-- Добавляем задачу в pg_cron
SELECT cron.schedule(
  '0 * * * *',  -- Каждый час
  'SELECT check_training_max_duration()'
);
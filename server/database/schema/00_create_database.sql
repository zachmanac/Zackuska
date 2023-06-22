DO $$BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'zackuska') THEN
    CREATE DATABASE zackuska;
  END IF;
END$$;
-- \c zackuska
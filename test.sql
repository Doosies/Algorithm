CREATE OR REPLACE FUNCTION change()
RETURNS INTEGER VOID AS
DECLARE
    id INTEGER := 0;
BEGIN
    select * from tt;
    -- END LOOP;
    -- RETURN result;
    
END;
$$ LANGUAGE plpgsql;
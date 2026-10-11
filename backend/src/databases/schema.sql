-- ==========================================
-- GRAVITY CALCULATOR DATABASE
-- ==========================================


-- Stores planets and other celestial bodies.
CREATE TABLE IF NOT EXISTS celestial_bodies (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100)
        NOT NULL
        UNIQUE,

    mass DOUBLE PRECISION
        NOT NULL
        CHECK (mass > 0),

    radius DOUBLE PRECISION
        NOT NULL
        CHECK (radius > 0),

    created_at TIMESTAMPTZ
        DEFAULT CURRENT_TIMESTAMP
);


-- Stores successful physics calculations.
CREATE TABLE IF NOT EXISTS calculation_history (
    id SERIAL PRIMARY KEY,

    calculation_type VARCHAR(100)
        NOT NULL,

    input_data JSONB
        NOT NULL,

    result_data JSONB
        NOT NULL,

    created_at TIMESTAMPTZ
        DEFAULT CURRENT_TIMESTAMP
);


-- Makes retrieving recent history faster.
CREATE INDEX IF NOT EXISTS
    idx_calculation_history_created_at
ON calculation_history (created_at DESC);


-- ==========================================
-- DEFAULT CELESTIAL BODIES
-- ==========================================

INSERT INTO celestial_bodies (
    name,
    mass,
    radius
)
VALUES
    ('Mercury', 3.3011e23, 2439700),
    ('Venus', 4.8675e24, 6051800),
    ('Earth', 5.972e24, 6371000),
    ('Moon', 7.342e22, 1737400),
    ('Mars', 6.4171e23, 3389500),
    ('Jupiter', 1.8982e27, 69911000),
    ('Saturn', 5.6834e26, 58232000),
    ('Uranus', 8.6810e25, 25362000),
    ('Neptune', 1.02413e26, 24622000)

-- Do not create duplicates if the script
-- is executed more than once.
ON CONFLICT (name) DO NOTHING;
-- Users Table
CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text,
    email text UNIQUE,
    role text DEFAULT 'user',
    preferences jsonb,
    created_at timestamptz DEFAULT now()
);

-- Jobs Table
CREATE TABLE jobs (
    id bigserial PRIMARY KEY,
    user_id uuid REFERENCES users(id),
    type text NOT NULL, -- 'audiobook' or 'podcast'
    input_file text,
    status text DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
    pages integer,
    book_name text,
    created_at timestamptz DEFAULT now(),
    started_at timestamptz,
    finished_at timestamptz,
    outputs jsonb,
    error_message text
);

-- Chunks Table
CREATE TABLE chunks (
    id bigserial PRIMARY KEY,
    job_id bigint REFERENCES jobs(id),
    number integer,
    start_page integer,
    end_page integer,
    status text DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
    attempts integer DEFAULT 0,
    provider_used text,
    file_path text
);

-- Voices Table
CREATE TABLE voices (
    voice_id text PRIMARY KEY,
    language text,
    region text,
    gender text,
    personality text,
    sample_path text
);

-- Model Configs Table
CREATE TABLE model_configs (
    id bigserial PRIMARY KEY,
    user_id uuid REFERENCES users(id) UNIQUE,
    main_model_id text,
    fallbacks jsonb,
    created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_configs ENABLE ROW LEVEL SECURITY;

-- Policies for RLS
CREATE POLICY "Users can see their own jobs" ON jobs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own jobs" ON jobs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can see their own chunks" ON chunks
    FOR SELECT USING (auth.uid() = (SELECT user_id FROM jobs WHERE id = job_id));

CREATE POLICY "Users can see their own model configs" ON model_configs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own model configs" ON model_configs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own model configs" ON model_configs
    FOR UPDATE USING (auth.uid() = user_id);

/*
  # Create database schema for Activity Booking App
  
  1. New Tables
    - `users` - Store user information
    - `activities` - Store activity details
    - `bookings` - Store user activity bookings
  
  2. Security
    - Enable RLS on all tables
    - Add policies for proper data access
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  activity_id UUID NOT NULL REFERENCES activities(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, activity_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own data"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

-- RLS Policies for activities table
CREATE POLICY "Anyone can view activities"
  ON activities
  FOR SELECT
  TO authenticated, anon
  USING (true);

-- RLS Policies for bookings table
CREATE POLICY "Users can view their own bookings"
  ON bookings
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings"
  ON bookings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Insert sample activities
INSERT INTO activities (title, description, location, date, time, type)
VALUES 
  ('Cricket Match', 'T20 cricket match between India and Australia', 'Central Stadium', '2025-06-15', '14:00:00', 'sports'),
  ('Movie Night', 'Premiere screening of the latest blockbuster', 'City Cinema', '2025-06-16', '19:00:00', 'entertainment'),
  ('Football Tournament', 'Local football clubs competition', 'City Ground', '2025-06-20', '15:00:00', 'sports'),
  ('Music Concert', 'Live performance by popular artists', 'Concert Hall', '2025-06-25', '20:00:00', 'entertainment'),
  ('Yoga Workshop', 'Beginners yoga workshop', 'Wellness Center', '2025-06-18', '08:00:00', 'wellness');
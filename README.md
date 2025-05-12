# Activity Booking API

A RESTful API backend for a basic activity booking application, built with Node.js, Express, and Supabase.

## Features

- User registration and authentication with JWT
- Activity listing and detailed views
- Activity booking functionality
- User booking history
- Secure password handling with bcrypt
- Input validation with express-validator
- Clean code architecture with proper folder structure

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT
- **Validation**: express-validator
- **Password Hashing**: bcrypt

## API Documentation

The API documentation is available as a static webpage when you run the application. It provides detailed information about all available endpoints, request/response formats, and authentication requirements.

### Postman Collection

For testing the API, you can use the Postman collection available at: [Postman Collection Link](https://www.postman.com/your-collection-link)

## Database Schema

The application uses the following database schema:

### Users Table
- `id` (UUID, primary key)
- `name` (text)
- `email` (text, unique)
- `phone` (text)
- `password` (text, hashed)
- `created_at` (timestamp)

### Activities Table
- `id` (UUID, primary key)
- `title` (text)
- `description` (text)
- `location` (text)
- `date` (date)
- `time` (time)
- `type` (text)
- `created_at` (timestamp)

### Bookings Table
- `id` (UUID, primary key)
- `user_id` (UUID, foreign key to users.id)
- `activity_id` (UUID, foreign key to activities.id)
- `created_at` (timestamp)
- Unique constraint on (user_id, activity_id)

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Authenticate a user and get JWT token
- `GET /api/users/me` - Get current user profile (requires authentication)

### Activities
- `GET /api/activities` - List all activities
- `GET /api/activities/:id` - Get details of a specific activity
- `POST /api/activities/:id/book` - Book an activity (requires authentication)
- `GET /api/activities/user/bookings` - Get all bookings of the authenticated user (requires authentication)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- NPM or Yarn
- Supabase account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/activity-booking-api.git
   cd activity-booking-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=7d
   SUPABASE_URL=https://your-project-url.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. Connect to Supabase:
   - Create a Supabase project at https://app.supabase.io
   - Get your Supabase URL and anon key from the API settings
   - Run the SQL migration in the `supabase/migrations` folder to create the necessary tables

5. Start the server:
   ```
   npm run dev
   ```

6. The API will be available at `http://localhost:3000` and you can view the API documentation at the same URL.

## Deployment

This API can be deployed to Vercel using the following steps:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Set up the environment variables in the Vercel dashboard
4. Deploy your application

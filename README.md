# Audiobook App

## Project Description
This is a simple audiobook app that allows users to browse audiobooks, filter them by genre, rating, and author, listen to audiobooks, and add reviews and ratings.

## Installation Instructions

### Backend Setup

1. **Clone the Repository**
   ```
   git clone https://github.com/pratham123kr/audiobook-app.git
   cd Backend/audiobook-api
   ```

2. **Install Dependencies**
   ```
   npm install
   ```
   Dependencies used: `express`, `body-parser`, `cors`, `pg`, `nodemon`, `axios`

3. **Configure PostgreSQL Database**
   - Create a PostgreSQL database named `audiobook`.
   - Create tables using the following SQL commands:
     ```sql
     CREATE TABLE audiobooks (
       id SERIAL PRIMARY KEY,
       title TEXT,
       author TEXT,
       genre TEXT,
       description TEXT,
       cover_image TEXT,
       audio_url TEXT
     );

     CREATE TABLE reviews (
       id SERIAL PRIMARY KEY,
       audiobook_id INT REFERENCES audiobooks(id),
       user_name TEXT,
       rating INT,
       review TEXT,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     ```

4. **Seed the Database**
   - Update the `seed.js` file with your PostgreSQL credentials.
   - Run the seed script to populate the database with dummy data:
     ```
     node seed.js
     ```
   This will confirm "Audiobooks created" upon successful seeding.

5. **Start the Server**
   ```
   npm run dev
   ```
   This will start the server at `http://localhost:5000`.

### Frontend Setup

1. **Navigate to the Frontend Directory**
   ```
   cd ../../Frontend/audiobook-app
   ```

2. **Install Dependencies**
   ```
   npm install
   ```
   Dependencies used: `react`, `react-dom`, `react-router-dom`, `axios`, `@mui/material`, `@emotion/react`, `@emotion/styled`, `react-rating-stars-component`, `@mui/icons-material`

3. **Start the Development Server**
   ```
   npm run dev
   ```
   The app will be accessible at `http://localhost:5173`.

## Usage

- Use `http://localhost:5000/api/audiobooks` to access the API for retrieving audiobooks.
- Explore the frontend app at `http://localhost:5173` to search, filter, listen to audiobooks, and add reviews.

---


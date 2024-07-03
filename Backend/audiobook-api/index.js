const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'audiobook',
  password: 'admin',
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

app.get('/api/audiobooks', async (req, res) => {
  try {
    const { genre, author, rating, title, sort_by, order } = req.query;
    let query = `
      SELECT a.*, COALESCE(AVG(r.rating), 0) AS average_rating
      FROM audiobooks a
      LEFT JOIN reviews r ON a.id = r.audiobook_id
    `;
    const queryParams = [];
    const conditions = [];

    if (genre) {
      conditions.push(`a.genre = $${queryParams.length + 1}`);
      queryParams.push(genre);
    }

    if (author) {
      conditions.push(`a.author ILIKE $${queryParams.length + 1}`);
      queryParams.push(`%${author}%`);
    }

    if (title) {
      conditions.push(`a.title ILIKE $${queryParams.length + 1}`);
      queryParams.push(`%${title}%`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    query += ` GROUP BY a.id`;

    if (rating === 'not_rated') {
      query += ` HAVING COUNT(r.rating) = 0`;
    } else if (rating) {
      query += ` HAVING COALESCE(AVG(r.rating), 0) = $${queryParams.length + 1}`;
      queryParams.push(rating);
    }

    const validSortColumns = ['title', 'genre', 'author', 'average_rating'];
    if (sort_by && validSortColumns.includes(sort_by)) {
      query += ` ORDER BY ${sort_by}`;
      if (order && (order.toLowerCase() === 'asc' || order.toLowerCase() === 'desc')) {
        query += ` ${order}`;
      } else {
        query += ` ASC`;
      }
    }

    const result = await pool.query(query, queryParams);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


app.get('/api/audiobooks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT a.*, COALESCE(AVG(r.rating), 0) AS average_rating
      FROM audiobooks a
      LEFT JOIN reviews r ON a.id = r.audiobook_id
      WHERE a.id = $1
      GROUP BY a.id
    `, [id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/reviews', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reviews');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const { audiobook_id, user_name, rating, review } = req.body;
    const result = await pool.query(
      'INSERT INTO reviews (audiobook_id, user_name, rating, review) VALUES ($1, $2, $3, $4) RETURNING *',
      [audiobook_id, user_name, rating, review]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

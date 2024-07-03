const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'audiobook',
  password: 'admin',
  port: 5432,
});

const createAudiobooks = async () => {
  const audiobooks = [
    {
      title: 'Book Title 1',
      author: 'Author 1',
      genre: 'Genre 1',
      description: 'Description 1',
      cover_image: 'https://i.ytimg.com/vi/lKU-aHQpiyY/maxresdefault.jpg',
      audio_url: 'https://drive.google.com/uc?export=download&id=1Y0xJqFN2yYx9XnxBv-s4vRxxt3CEvtSl'
    },
    {
      title: 'Book Title 2',
      author: 'Author 2',
      genre: 'Genre 2',
      description: 'Description 2',
      cover_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpEW9ngCmiIZOJH8J9LKdPvat2opk1JWZYKg&s',
      audio_url: 'https://drive.google.com/uc?export=download&id=1Y0xJqFN2yYx9XnxBv-s4vRxxt3CEvtSl'
    },
    {
      title: 'Book Title 3',
      author: 'Author 3',
      genre: 'Genre 1',
      description: 'Description 3',
      cover_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK4rl5lsj9JBip5nD6dgA3seEq_b93JpFNog&s',
      audio_url: 'https://drive.google.com/uc?export=download&id=1Y0xJqFN2yYx9XnxBv-s4vRxxt3CEvtSl'
    },
    {
      title: 'Book Title 4',
      author: 'Author 4',
      genre: 'Genre 2',
      description: 'Description 4',
      cover_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQuExobFU5QY67STKAx0IkrKlUZ1z3RcK0zg&s',
      audio_url: 'https://drive.google.com/uc?export=download&id=1Y0xJqFN2yYx9XnxBv-s4vRxxt3CEvtSl'
    },
    {
      title: 'Book Title 5',
      author: 'Author 1',
      genre: 'Genre 1',
      description: 'Description 5',
      cover_image: 'https://i.scdn.co/image/ab67616d0000b273f4c36213d8fbf11dec924f97',
      audio_url: 'https://drive.google.com/uc?export=download&id=1Y0xJqFN2yYx9XnxBv-s4vRxxt3CEvtSl'
    },
    {
      title: 'Book Title 6',
      author: 'Author 3',
      genre: 'Genre 2',
      description: 'Description 6',
      cover_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpEW9ngCmiIZOJH8J9LKdPvat2opk1JWZYKg&s',
      audio_url: 'https://drive.google.com/uc?export=download&id=1Y0xJqFN2yYx9XnxBv-s4vRxxt3CEvtSl'
    },
    {
      title: 'Book Title 7',
      author: 'Author 7',
      genre: 'Genre 1',
      description: 'Description 7',
      cover_image: 'https://i.ytimg.com/vi/lKU-aHQpiyY/maxresdefault.jpg',
      audio_url: 'https://drive.google.com/uc?export=download&id=1Y0xJqFN2yYx9XnxBv-s4vRxxt3CEvtSl'
    },
    {
      title: 'Book Title 8',
      author: 'Author 1',
      genre: 'Genre 2',
      description: 'Description 8',
      cover_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQuExobFU5QY67STKAx0IkrKlUZ1z3RcK0zg&s',
      audio_url: 'https://drive.google.com/uc?export=download&id=1Y0xJqFN2yYx9XnxBv-s4vRxxt3CEvtSl'
    },
    // Add more audiobooks as needed
  ];

  for (let audiobook of audiobooks) {
    await pool.query(
      'INSERT INTO audiobooks (title, author, genre, description, cover_image, audio_url) VALUES ($1, $2, $3, $4, $5, $6)',
      [audiobook.title, audiobook.author, audiobook.genre, audiobook.description, audiobook.cover_image, audiobook.audio_url]
    );
  }
};

createAudiobooks().then(() => console.log('Audiobooks created')).catch(err => console.error(err)).finally(() => pool.end());

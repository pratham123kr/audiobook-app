import React, { useState } from 'react';
import { TextField, Button, Typography, Rating, Box } from '@mui/material';
import axios from 'axios';

function ReviewForm({ audiobookId }) {
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userName || rating === 0) {
      setError('Name and rating are required.');
      return;
    }
    setError('');
    try {
      await axios.post('http://localhost:5000/api/reviews', {
        audiobook_id: audiobookId,
        user_name: userName,
        rating: rating,
        review: review,
      });
      setUserName('');
      setRating(0);
      setReview('');
      alert('Review submitted successfully');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Submit a Review
      </Typography>
      <TextField
        label="Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Box margin="normal">
        <Typography component="legend">Rating</Typography>
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          precision={1}
          max={5}
          required
        />
      </Box>
      <TextField
        label="Review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}

export default ReviewForm;

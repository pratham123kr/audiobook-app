import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import ReviewForm from './ReviewForm';
import Rating from 'react-rating-stars-component';

function AudiobookDetail() {
  const { id } = useParams();
  const [audiobook, setAudiobook] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch audiobook details
    axios.get(`http://localhost:5000/api/audiobooks/${id}`)
      .then(response => setAudiobook(response.data))
      .catch(error => console.error('Error fetching audiobook details:', error));

    // Fetch reviews for the specific audiobook
    axios.get('http://localhost:5000/api/reviews', { params: { audiobook_id: id } })
      .then(response => {
        // Filter reviews to show only for the current audiobook
        const filteredReviews = response.data.filter(review => review.audiobook_id === parseInt(id));
        setReviews(filteredReviews);
      })
      .catch(error => console.error('Error fetching reviews:', error));
  }, [id]);

  if (!audiobook) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {audiobook.title}
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        {audiobook.author}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {audiobook.description}
      </Typography>
      <img src={audiobook.cover_image} alt={audiobook.title} style={{ width: '100%', maxWidth: '400px' }} />
      <audio controls style={{ width: '100%', marginTop: '20px' }}>
        <source src={audiobook.audio_url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <ReviewForm audiobookId={audiobook.id} />
      <Typography variant="h5" component="h3" gutterBottom style={{ marginTop: '10px'}}>
        User Reviews
      </Typography>
      <List>
        {reviews.map(review => (
          <ListItem key={review.id}>
            <ListItemText
              primary={review.user_name}
              secondary={
                <>
                  <div>
                    <Rating
                      value={review.rating}
                      count={5}
                      size={24}
                      activeColor="#ffd700"
                      edit={false}
                    />
                  </div>
                  <Typography>{review.review}</Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default AudiobookDetail;

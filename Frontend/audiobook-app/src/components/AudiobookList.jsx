import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Grid, TextField, MenuItem, Button, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import axios from 'axios';
import Rating from 'react-rating-stars-component';

function AudiobookList() {
  const [audiobooks, setAudiobooks] = useState([]);
  const [filters, setFilters] = useState({ genre: '', author: '', rating: '', title: '', sort_by: '', order: 'asc' });
  const [orderDisabled, setOrderDisabled] = useState(true);
  const [orderError, setOrderError] = useState('');

  useEffect(() => {
    fetchAudiobooks();
  }, [filters]);

  const fetchAudiobooks = () => {
    axios.get('http://localhost:5000/api/audiobooks', { params: filters })
      .then(response => {
        setAudiobooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching audiobooks:', error);
      });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'sort_by' && value === '') {
      setFilters({ ...filters, [name]: value, order: '' });
      setOrderDisabled(true);
    } else {
      setFilters({ ...filters, [name]: value });
      if (name === 'sort_by') {
        setOrderDisabled(false);
      }
    }
  };

  const handleOrderChange = (e) => {
    if (filters.sort_by === '') {
      setOrderError('Please select "Sort By" criteria first.');
    } else {
      setOrderError('');
      setFilters({ ...filters, order: e.target.value });
    }
  };

  const handleSearch = () => {
    fetchAudiobooks();
  };

  return (
    <div>
      <div style={{ marginBottom: '40px', marginTop: '40px' }}>
        <TextField
          label="Search by Title"
          name="title"
          value={filters.title}
          onChange={handleFilterChange}
          variant="outlined"
          style={{ marginRight: '10px', marginBottom: '20px' }}
        />
        <TextField
          label="Search by Author"
          name="author"
          value={filters.author}
          onChange={handleFilterChange}
          variant="outlined"
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Filter by Genre"
          name="genre"
          value={filters.genre}
          onChange={handleFilterChange}
          variant="outlined"
          select
          style={{ marginRight: '10px', width: '200px' }}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value="Genre 1">Genre 1</MenuItem>
          <MenuItem value="Genre 2">Genre 2</MenuItem>
          {/* Add more genres as needed */}
        </TextField>
        <TextField
          label="Filter by Rating"
          name="rating"
          value={filters.rating}
          onChange={handleFilterChange}
          variant="outlined"
          select
          style={{ marginRight: '10px', width: '200px' }}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="not_rated">Not Rated</MenuItem>
        </TextField>
        <FormControl variant="outlined" style={{ marginRight: '10px', width: '200px' }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            name="sort_by"
            value={filters.sort_by}
            onChange={handleFilterChange}
            label="Sort By"
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="genre">Genre</MenuItem>
            <MenuItem value="author">Author</MenuItem>
            <MenuItem value="average_rating">Rating</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ marginRight: '10px', width: '200px' }} disabled={orderDisabled}>
          <InputLabel>Order</InputLabel>
          <Select
            name="order"
            value={filters.order}
            onChange={handleOrderChange}
            label="Order"
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
          {orderError && <FormHelperText error>{orderError}</FormHelperText>}
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginLeft: '30px', width: '200px', height: '50px' }}>
          Search
        </Button>
      </div>
      <Grid container spacing={4}>
        {audiobooks.map(audiobook => (
          <Grid item key={audiobook.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={audiobook.cover_image}
                alt={audiobook.title}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {audiobook.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {audiobook.author}
                </Typography>
                <Rating
                  value={parseFloat(audiobook.average_rating)}
                  count={5}
                  size={24}
                  activeColor="#ffd700"
                  edit={false}
                />
                <Link to={`/audiobooks/${audiobook.id}`}>
                  View Details
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default AudiobookList;

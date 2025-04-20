import React, { useState, useEffect } from 'react';
import { fetchMovie, submitReview } from '../actions/movieActions';
import { useDispatch, useSelector } from 'react-redux';
import { Card, ListGroup, ListGroupItem, Image, Form, Button } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const selectedMovie = useSelector(state => state.movie.selectedMovie);
  const loading = useSelector(state => state.movie.loading);
  const error = useSelector(state => state.movie.error);

  // 🔸 Form state
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    dispatch(fetchMovie(movieId));
  }, [dispatch, movieId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitReview({ movieId, review: reviewText, rating: Number(rating) }))
      .then(() => {
        setReviewText('');
        setRating(5);
        dispatch(fetchMovie(movieId)); // 🔁 Refresh the movie after review
      });
  };

  const DetailInfo = () => {
    if (loading) return <div>Loading....</div>;
    if (error) return <div>Error: {error}</div>;
    if (!selectedMovie) return <div>No movie data available.</div>;

    return (
      <Card className="bg-dark text-light p-4 rounded">
        <Card.Header>Movie Detail</Card.Header>
        <Card.Body>
          <Image className="image" src={selectedMovie.imageUrl} thumbnail />
        </Card.Body>
        
        {/* 🔹 REVIEW FORM */}
        <Card.Body>
          <h5>Submit a Review</h5>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="reviewText" className="mb-2">
              <Form.Label>Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="rating" className="mb-2">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                {[1, 2, 3, 4, 5].map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button type="submit" variant="success">Submit Review</Button>
          </Form>
        </Card.Body>

        {/* 🔹 EXISTING REVIEWS */}
        <ListGroup>
          <ListGroupItem>{selectedMovie.title}</ListGroupItem>
          <ListGroupItem>
            {selectedMovie.actors.map((actor, i) => (
              <p key={i}><b>{actor.actorName}</b> {actor.characterName}</p>
            ))}
          </ListGroupItem>
          <ListGroupItem>
            <h4><BsStarFill /> {selectedMovie.avgRating}</h4>
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
          {Array.isArray(selectedMovie.reviews) && selectedMovie.reviews.length > 0 ? (
            selectedMovie.reviews.map((review, i) => (
              <p key={i}>
                <b>{review.username}</b>&nbsp; {review.review} &nbsp; <BsStarFill /> {review.rating}
              </p>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </Card.Body>
      </Card>
    );
  };

  return <DetailInfo />;
};

export default MovieDetail;

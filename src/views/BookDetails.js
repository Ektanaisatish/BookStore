import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";
import toast from "react-hot-toast";
import { ADDED_SUCCESSFULLY } from "../constants/Constants";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);

  useEffect(() => {
    const fetchBookDetails = async () => {
      const url = `https://freetestapi.com/api/v1/books/${id}`;
      try {
        setLoading(true);
        const response = await axios.get(url);
        setBook(response.data);
        setLoading(false);
        console.log("Book details:", response.data);
      } catch (error) {
        console.error("Error fetching Book details:", error);
      }
    };
    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!book) {
    return <p>Book not found!</p>;
  }

  const handleAddToCart = () => {
    dispatch(addItem(book));
    toast.success(ADDED_SUCCESSFULLY)
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid item xs={12} md={4}>
        <CardMedia
          component="img"
          alt="image"
          height="500"
          sx={{ width: "100%", objectFit: "cover" }}
          image={book.cover_image}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h4" component="div">
              {book.title} $50
            </Typography>
            <Typography gutterBottom variant="h5" color="text.secondary">
              HardCover-Import, {book.publication_year}
            </Typography>
            <Typography gutterBottom variant="h5" color="text.secondary">
              by {book.author} (author)
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {book.description}
            </Typography>
            <Typography variant="h6" color="text.secondary" mt={2}>
              Genre: {book.genre.join(", ")}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              component={Link}
              onClick={handleAddToCart}
              variant="outlined"
              color="secondary"
              disabled={!loggedInUser}
              sx={{ margin: "auto" }}
            >
              {loggedInUser ? "Add to Cart" : "Login to Add to Cart"}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BookDetails;

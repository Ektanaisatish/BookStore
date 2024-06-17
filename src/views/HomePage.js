import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import WidgetsTwoToneIcon from "@mui/icons-material/WidgetsTwoTone";
import { Link } from "react-router-dom";
import ListIcon from '@mui/icons-material/List';
const HomePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const url = "https://freetestapi.com/api/v1/books";
      try {
        setLoading(true);
        const response = await axios.get(url);
        setItems(response.data);
        setLoading(false);
        const allGenres = response.data.reduce((acc, cur) => {
          cur.genre.forEach((g) => {
            if (!acc.includes(g)) {
              acc.push(g);
            }
          });
          return acc;
        }, []);
        setGenres(allGenres);
        const allYears = response.data
          .map((item) => item.publication_year)
          .filter((year, index, self) => self.indexOf(year) === index);
        setYears(allYears.sort((a, b) => b - a)); 
      } catch (error) {
        console.error("Error fetching Books:", error);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const filtered = items.filter((item) => {
      const titleMatch = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const authorMatch = item.author
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return titleMatch || authorMatch;
    });
    const genreFiltered = selectedGenre
      ? filtered.filter((item) => item.genre.includes(selectedGenre))
      : filtered;

    setFilteredItems(genreFiltered);
  }, [searchQuery, items, selectedGenre]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setAnchorEl(null); 
  };

  const clearGenreFilter = () => {
    setSelectedGenre("");
    setAnchorEl(null);
  };


  const filterByYear = (year) => {

    const filtered = items.filter(
      (item) => item.publication_year === (year)
    );
    setFilteredItems(filtered);
    if(items.publication_year==="All Years"){
      setFilteredItems(!filtered)
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          marginTop: "20px",
          marginLeft: "20px",
          marginBottom: "10px",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          style={{ marginRight: "10px" }}
        >
          {selectedGenre || <WidgetsTwoToneIcon />}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={clearGenreFilter}>All Genres</MenuItem>
          {genres.map((genre) => (
            <MenuItem key={genre} onClick={() => handleGenreSelect(genre)}>
              {genre}
            </MenuItem>
          ))}
        </Menu>
   
        <TextField
          label="Search books by title or author"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginRight: "10px" }}
        />
        <div>
    
        <TextField
          select
          label={<ListIcon/>}
          
          variant="outlined"
          style={{marginRight: "10px" }}
        >
          
 <MenuItem >All Years</MenuItem>
          {years.map((year) => (
            <MenuItem
              key={year}
              value={year}
              variant="outlined"
              onClick={() => filterByYear(year)}
              style={{ marginRight: "5px" }}
            >
              {year}
            </MenuItem>
          ))}</TextField>
        </div>
      </div>
      <Grid container spacing={2}>
        {filteredItems.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 345, marginTop: "20px", marginLeft: "20px" }}>
              <CardMedia
                component="img"
                alt="image"
                height="250"
                image={item.cover_image}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {item.title}   <Badge sx={{backgroundColor:'lightgreen',borderRadius:"16px"}}>
                    <Typography variant="h5">
                    ($50) </Typography> </Badge>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  by {item.author} - {item.publication_year}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Genre: {item.genre.join(", ")}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  to={`/detail/${item.id}`}
                  variant="outlined"
                  color="secondary"
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
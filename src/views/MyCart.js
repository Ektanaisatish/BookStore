import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/CartSlice";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { DELETE_CARD } from "../constants/Constants";
import DeleteIcon from '@mui/icons-material/Delete';
const MyCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
    toast.success(DELETE_CARD);
  };

  const handleIncrease = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecrease = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    localStorage.removeItem("cartItems");
  };

  const calculateItemTotalPrice = (quantity) => {
    return quantity * 50;
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + calculateItemTotalPrice(item.quantity);
    }, 0);
  };

  return (
    <div>
      <Typography variant="h4" sx={{marginTop:"20px"}}>
                   MY CART
                  </Typography>
      {cartItems.length === 0 ? (
       
        <Typography variant="h4" >
      Your cart is empty
       </Typography>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" ,marginLeft:"auto"}}>
          {cartItems.map((item) => (
            <div key={item.id} style={{ flex: "0 0 20%", padding: "20px" }}>
              <Card>
                <CardMedia
                  component="img"
                  alt="image"
                  height="350"
                  image={item.cover_image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.title} Price: $
                    {calculateItemTotalPrice(item.quantity)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    by {item.author} - {item.publication_year}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                  sx={{marginLeft:"20px"}}
                    variant="outlined"
                   
                    color="error"
                    size="small"
                    onClick={() => handleDecrease(item.id)}
                  >
                    -
                  </Button>
                  <p>Quantity: {item.quantity}</p>
                  <Button
                    variant="outlined"
                    
                    color="success"
                    size="small"
                    onClick={() => handleIncrease(item.id)}
                  >
                    +
                  </Button>

              
                </CardActions>
                
                <Button
                sx={{marginLeft:"20px",marginBottom:"20px"}}
                  component={Link}
                  variant="outlined"
                  size="medium"
                  color="secondary"
                  to="/checkout"
                >
                  Checkout
                </Button>
                <Button
                sx={{marginLeft:"170px",marginBottom:"20px"}}
                  component={Link}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  color="secondary"
                  size="medium"
                  onClick={() => handleRemoveItem(item.id)}
                >
                </Button>
              </Card>
            </div>
          ))}
        </div>
      )}
      <Typography variant="h6" gutterBottom>
        Total Price: ${calculateTotalPrice()}
      </Typography>
      <Button
        component={Link}
        variant="contained"
        color="error"
        marginTop="auto"
        size="large"
        onClick={handleClearCart}
      >
        Clear Cart
      </Button>
      
    </div>
  );
};

export default MyCart;

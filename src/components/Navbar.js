import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../redux/AuthSlice";
import { clearCart } from "../redux/CartSlice";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const cartItems = useSelector((state) => state.cart.items);
  const handleLogout = () => {
     dispatch(logout());
     dispatch(clearCart());
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("users");
  
  };
  useEffect(() => {
    if (loginSuccess()) {
      navigate("/");
    }
  }, []);
  return (
    <AppBar position="sticky" sx={{ background: "grey" }}>
      <Toolbar>
        <Typography variant="h5" sx={{ color: "white" }}>
          Online Book-store
        </Typography>
        <Box display="flex" marginLeft="auto" marginRight="auto">
          <Tabs>
            <Tab
              variant="h4"
              sx={{ color: "white" }}
              LinkComponent={Link}
              to="/"
              label="Books"
            />
          </Tabs>
        </Box>
        <Box display="flex" marginLeft="auto">
          {loggedInUser && (
         
              <Box display="flex" marginLeft="auto" marginTop="10px" marginRight="auto">
          <Tabs>
            <Tab
              variant="h4"
              sx={{ color: "white"}}
              LinkComponent={Link}
              to="/profile"
              label=<AccountCircleIcon/>
            />
          </Tabs>
        </Box>
                     
          )}
          {!loggedInUser && (
            <>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signin"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
              >
                SignUp
              </Button>
            </>
          )}
          {loggedInUser && (
            <>            <Button
              component={Link}
              to="/mycart"
              variant="contained"
              size='small'
              sx={{ margin: 2 }}
              color="warning"
            >
             MyCart:{cartItems.length}
            </Button>
            <Button
            variant="contained"
            size='small'
            sx={{ margin: 1, borderRadius: 10 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
          </>

          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

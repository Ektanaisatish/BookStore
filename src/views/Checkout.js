import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { ORDERED_SUCCESSFULLY } from "../constants/Constants";
const UserDetails = () => {
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
const totalPayment=localStorage.getItem("totalPrice")
  const handleSubmit = () => {
    toast.success(ORDERED_SUCCESSFULLY);
  };

  return (
    <div>
      <Box
        maxWidth={400}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        margin="auto"
        marginTop={5}
        borderRadius={5}
      >
        <Typography variant="h4" padding={3} textAlign={"center"}>
          USER DETAILS
        </Typography>
        {loggedInUser ? (
          <div>
            <Typography variant="h5" padding={3} textAlign={"center"}>
              Name: {loggedInUser.name}
            </Typography>
            <Typography variant="h5" padding={3} textAlign={"center"}>
              Email: {loggedInUser.email}
            </Typography>
            <Typography variant="h5" padding={3} textAlign={"center"}>
              Phone: {loggedInUser.phone}
            </Typography>
            <Typography variant="h6" padding={3} textAlign={"center"} gutterBottom>
            totalPrice={totalPayment} 
            </Typography>
            <TextField
              label="Address"
              textAlign={"center"}
              name="address"
              type="text"
              placeholder="Address"
              margin="normal"
            />
            <div display='flex'>
              <Button
                type="submit"
                variant="contained"
                margin="normal"
                onClick={handleSubmit}
              >
                Pay
              </Button>
            </div>
          </div>
        ) : (
          <h5>No user details available</h5>
        )}
      </Box>
    </div>
  );
};

export default UserDetails;

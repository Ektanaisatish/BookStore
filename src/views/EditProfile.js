import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { PHONE_REQUIRED, PHONE_VALIDATION, UPDATE_SUCCESSFULLY } from '../constants/Constants';
import toast from 'react-hot-toast';
const EditProfile = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors: formErrors }, setValue } = useForm();
  const [errorMessage, setErrorMessage] = useState(""); 
  const [loggedInUser, setLoggedInUser] = useState(null); 

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
      setLoggedInUser(user);
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("phone", user.phone);
    }
  }, [setValue]);

  const onSubmit = (data) => {
    localStorage.setItem('loggedInUser', JSON.stringify(data));
    localStorage.setItem('users', JSON.stringify(data));

    navigate("/profile");
  };
  const handleClick=()=>{
    toast.success(UPDATE_SUCCESSFULLY)
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Typography variant="h2" padding={3} textAlign={"center"}>
            Edit Profile
          </Typography>
          <TextField
            name="name"
            type="text"
            placeholder="Username"
            margin="normal"
            {...register("name", { 
              required: "Name is required",
            })}
          />
          <p>{formErrors.name?.message} </p>
          <TextField
            name="email"
            type="email"
            placeholder="Email"
            margin="normal"
            {...register("email", {
              required: "Email is required",
            })}
          />
          <p>{formErrors.email?.message} </p>
          <TextField
            name="phone"
            type="phone"
            placeholder="Phone number"
            margin="normal"
            {...register("phone", {
              required: PHONE_REQUIRED,
              pattern: {
                value: /^[0-9]/,
                message: PHONE_VALIDATION,
              },
            })}
          />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} 
          <Button
            type="submit"
            variant="contained"
            margin="normal"
            onClick={handleClick}
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default EditProfile;

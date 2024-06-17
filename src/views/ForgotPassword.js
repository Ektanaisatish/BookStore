import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Email_REQUIRED, PASSWORD_REQUIRED, UPDATED_PASSWORD, USER_NOT } from '../constants/Constants';
import toast from 'react-hot-toast';
const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors: formErrors } } = useForm();
  const [errorMessage, setErrorMessage] = useState(""); 

  const onSubmit = (data) => {
    const { email, password } = data;
    const users = JSON.parse(localStorage.getItem('users')) || [];

  
    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex !== -1) {
      
      users[userIndex].password = password;
      localStorage.setItem('users', JSON.stringify(users));
      toast.success(UPDATED_PASSWORD)
    } else {
      setErrorMessage(USER_NOT); 
      toast.error(USER_NOT)
    }
  };

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
            Forgot Password
          </Typography>
          <TextField
            name="email"
            type="email"
            placeholder="Email"
            margin="normal"
            {...register("email", {
              required: Email_REQUIRED,
            })}
          />
          <p>{formErrors.email?.message} </p>
          <TextField
            name="password"
            type="password"
            placeholder="New Password"
            margin="normal"
            {...register("password", {
              required: PASSWORD_REQUIRED,
            })}
          />
          <p>{formErrors.password?.message} </p>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} 
          <Button
            type="submit"
            variant="contained"
            margin="normal"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default ForgotPassword;

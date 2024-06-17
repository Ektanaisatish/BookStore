import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import { Email_REQUIRED, INVALID_EMAIL, NAME_REQUIRED, NAME_VALIDATION, PASSWORD_MAXLENGTH, PASSWORD_MINLENGTH, PASSWORD_REQUIRED, SIGNUP_SUCCESS, PHONE_REQUIRED, PHONE_VALIDATION } from '../constants/Constants';
import { Box, Button, TextField, Typography } from '@mui/material';
const SignUpForm = () => {
  const { register, handleSubmit, formState: { errors: formErrors } } = useForm();
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();
  
  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(data);
    localStorage.setItem('users', JSON.stringify(users));
    setSignupSuccess(true);
    toast.success(SIGNUP_SUCCESS) 
    navigate("/login");
  };
  return (
    <div className="form">
      <div className="container">
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
            Signup
          </Typography>
          <TextField
            name="name"
            type="name"
            placeholder="Username"
            margin="normal"
            {...register("name", { 
              required: NAME_REQUIRED,
              validate: {
                noBlankSpace: value => value.trim() !== "" || NAME_VALIDATION
              }
            })}
          />
          <TextField
            name="email"
            type="email"
            placeholder="Email"
            margin="normal"
            {...register("email", {
              required: Email_REQUIRED
            ,
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: INVALID_EMAIL,
              },
            })}
          />{formErrors.email?.message} 
           <TextField
            name="phone"
            type="phone"
            placeholder="phone number"
            margin="normal"
            {...register("phone", {
              required: PHONE_REQUIRED
            ,
              pattern: {
                value: /^[0-9]/,
                message: PHONE_VALIDATION,
              },
            })}
            
          />
          
          <TextField
            name="password"
            type="password"
            placeholder="Password"
            margin="normal"
            {...register("password", {
              required: PASSWORD_REQUIRED,
              minLength: {
                value: 4,
                message: PASSWORD_MINLENGTH,
              },
              maxLength: {
                value: 20,
                message: PASSWORD_MAXLENGTH,
              },
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
    </div>
  );
};
export default SignUpForm;

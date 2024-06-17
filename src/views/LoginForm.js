import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/AuthSlice.js";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import {
    Email_REQUIRED,
    INVALID_CREDENTIALS,
    INVALID_EMAIL,
    INVALID_PASSWORD,
    LOGIN_SUCCESS,
    PASSWORD_MAXLENGTH,
    PASSWORD_MINLENGTH,
    PASSWORD_REQUIRED,
} from "../constants/Constants.js";
import { Box, Button, TextField, Typography } from "@mui/material";

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState(""); 
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState("");
  
  const onSubmit = (data) => {
    const { email, password } = data;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loggedInUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (loggedInUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      dispatch(loginSuccess(loggedInUser));
      console.log(loggedInUser);
      navigate("/mycart");
      toast.success(LOGIN_SUCCESS);
    } else {
      let errorMessage = "";
      const userWithEmail = users.find((user) => user.email === email);
      const userWithPassword = users.find((user) => user.password === password);
      if (!userWithEmail && !userWithPassword) {
        errorMessage = INVALID_CREDENTIALS;
        toast.error(INVALID_CREDENTIALS)
      } else if (!userWithEmail) {
        errorMessage = INVALID_EMAIL;
        toast.error(INVALID_EMAIL)
      } else if (!userWithPassword) {
        errorMessage = INVALID_PASSWORD;
        toast.error(INVALID_PASSWORD)
      }
      setLoginError("errorMessage");
      toast.error("Login fails")
      dispatch(loginFailure(errorMessage));
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
            Login
          </Typography>
          <TextField
            name="email"
            type="email"
            placeholder="Email"
            margin="normal"
            {...register("email", {
              required: Email_REQUIRED,
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: INVALID_EMAIL,
              },
            })}
          />
          <p>{formErrors.email?.message} </p>
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
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Submit
          </Button>
          <Link to="/forgot">Forgot Password?</Link> 
          
        </Box>
      </form>
    </div>
  );
};

export default LoginForm;

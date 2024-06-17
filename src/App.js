
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import {Toaster} from 'react-hot-toast';
import HomePage from "./views/HomePage.js";
import BookDetails from "./views/BookDetails.js";
import MyCart from "./views/MyCart.js";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "./redux/AuthSlice.js";
import SignUpForm from "./views/SignUpForm.js";
import LoginForm from "./views/LoginForm.js";
import ForgotPassword from "./views/ForgotPassword.js";
import EditProfile from "./views/EditProfile.js";
import CheckoutPage from "./views/Checkout.js";
function App() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth?.loggedInUser);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      dispatch(loginSuccess(user));
    }
  }, [dispatch]);
  const storageListener = (event) => {
    if (event.storageArea === localStorage && event.key === "loggedInUser") {
      const user = JSON.parse(event.newValue);
      dispatch(loginSuccess(user));
    }
  };
  useEffect(() => {
    window.addEventListener("storage", storageListener);
    return () => {
      window.removeEventListener("storage", storageListener);
    };
  }, [dispatch]);
  return (
  
      <div className="App">
       <React.Fragment>
        <Navbar />
        <Routes>
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/profile" element={<EditProfile />} />
          {!loggedInUser ? (
            <>
              <Route path="/signin" element={<SignUpForm />} />
              <Route path="/login" element={<LoginForm />} />
              
              
            </>
          ) : (
            <>
              <Route path="/mycart" element={<MyCart />} />
            </>
          )}
          <Route path="/" element={<HomePage />} />
          <Route path="/detail/:id" element={<BookDetails />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
        <Toaster />
      </React.Fragment>
      </div>
  );
}

export default App;

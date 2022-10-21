import axios from "axios";
import {  useRef, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import classes from "./Auth.module.css";

import { useDispatch, useSelector } from "react-redux/es/exports";
import { authActions } from "../store/redux";

const Auth = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
 

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [passwordMatch, setPasswordMatch] = useState(true);

  const history = useHistory();

  const [error, setError] = useState(false);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onLogInHandler = async (event) => {
    event.preventDefault();
    console.log(`inside login handler`);
    let enteredEmail
    let enteredPassword
    let enteredConfirmPassword 
    if(isLogin){
      enteredEmail = emailInputRef.current.value;
      enteredPassword = passwordInputRef.current.value;
     
    }
    else{
      enteredEmail = emailInputRef.current.value;
      enteredPassword = passwordInputRef.current.value;
      enteredConfirmPassword = confirmPasswordInputRef.current.value;
      if (enteredPassword !== enteredConfirmPassword) {
        passwordInputRef.current.value = null;
        confirmPasswordInputRef.current.value = null;
        return setPasswordMatch(false);
      }
    }
    setIsLoading(true);
    //  if (enteredPassword !== enteredConfirmPassword) {
    //     passwordInputRef.current.value = null;
    //     confirmPasswordInputRef.current.value = null;
    //     return setPasswordMatch(false);
    //   }
    let url;
    const loginCrentials = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };

    console.log(`inside login handler before try`);
    try {
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCh16XEVl-F0hbqJ1L5BG61uXEAxqpSYyU";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCh16XEVl-F0hbqJ1L5BG61uXEAxqpSYyU";
      }
      const response = await axios.post(url, loginCrentials);

      const token = response.data.idToken;
      console.log(token);
      setIsLoading(false);

      console.log(`inside try after token received`);

      // authCtx.addToken(token);
      dispatch(authActions.onTokenreceive(token));
      console.log(`inside login handler after dispatch`);
      localStorage.setItem("token", token);
      dispatch(authActions.login())

      console.log(response);
     
      setPasswordMatch(true)


  

     console.log(isAuth);
      if (isAuth) {
       <Redirect to='/expense-tracker'/>
      } else {
        console.log(`something went wrong`);
      }
    } catch (err) {
      // console.log(err)
      const errorMessage = err.response.data.error.message;
      resetInputField(errorMessage);
      console.log(err.response.data.error.message);
      setError(errorMessage);
     
    }
  };

  const resetInputField = (error) => {
    if (error === "EMAIL_NOT_FOUND") {
      emailInputRef.current.value = null;
      passwordInputRef.current.value = null;
    } else if (error === "INVALID_PASSWORD") {
      passwordInputRef.current.value = null;
    }
  };

  const onForgotPasswordClickHandler = (event) => {
    event.preventDefault();
    console.log(`inside forgot password`);
    history.replace("/forgot-password");

    <Redirect to="/forgot-password" />;
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Sign-In" : "Sign Up"}</h1>
      <form onSubmit={onLogInHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email-Id</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="password"
              required
              ref={confirmPasswordInputRef}
            />
          </div>
        )}
        {isLogin && (
          <p
            style={{ textDecoration: "none", color: "#777", cursor: "pointer" }}
            onClick={onForgotPasswordClickHandler}
          >
            Forgot Password?
          </p>
        )}
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? "Sign-In" : " Sign-up"}</button>}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "New-User? Sign-Up" : "Already a user? Sign-in"}
          </button>
        </div>

        {error === "EMAIL_NOT_FOUND" && (
          <p>Email id is incorrect!! PLease try again</p>
        )}
        {error === "INVALID_PASSWORD" && (
          <p>Password is incorrect!! Please try again</p>
        )}
      </form>
    </section>
  );
};

export default Auth;

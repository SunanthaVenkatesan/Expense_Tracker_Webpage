import axios from "axios";
import { useRef, useState } from "react";

const SignUp = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState(false);

  const onSignUpHandler = async (event) => {
    event.preventDefault();

    try {
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      const enteredConfirmPassword = confirmPasswordInputRef.current.value;

      if (enteredPassword !== enteredConfirmPassword) {
        passwordInputRef.current.value = null;
        confirmPasswordInputRef.current.value = null;
        return setPasswordMatch(false);
      }

      const signUpDetails = {
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      };

      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxJbdh9oRNKYgksgX7DDWO7EK1pm6yMmk`,
        signUpDetails
      );

      console.log(response);
      setPasswordMatch(true)
      setError(false)

      console.log(`User has successfully signed up`);
    } catch (err) {
      console.log(err);
      setError(true);
    }
    emailInputRef.current.value = null;
    passwordInputRef.current.value = null;
    confirmPasswordInputRef.current.value = null;
  };
  return (
    <form onSubmit={onSignUpHandler}>
      <h1>Sign Up</h1>
      <div>
        <span>Email</span>
        <input type="email" required ref={emailInputRef}></input>
      </div>
      <div>
        <span>Password</span>
        <input type="password" required ref={passwordInputRef}></input>
      </div>
      <div>
        <span>Confirm Password</span>
        <input type="password" required ref={confirmPasswordInputRef}></input>
      </div>
      <button type="submit">Sign Up</button>
      {!passwordMatch && <p>Password do not match, please try again</p>}
      {error && <p>Something went wrong!! please try again after sometime.</p>}
    </form>
  );
};

export default SignUp;

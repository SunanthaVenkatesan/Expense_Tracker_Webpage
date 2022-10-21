import axios from "axios";
import { useRef, useState } from "react";
import LoadingSpinner from "./LoadingSpinner"
import classes from './Forgotpassword.module.css'
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {

  const [isLoading, setIsLoading] = useState(false);
  const history=useHistory()
  const enteredEmailInputRef = useRef();

  const onSendForgotPasswordLinkClickHandler = async () => {

    setIsLoading(true)
    const enteredEmail = enteredEmailInputRef.current.value;

    const passwordResetObj = {
      requestType: "PASSWORD_RESET",
      email: enteredEmail,
    };

    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCh16XEVl-F0hbqJ1L5BG61uXEAxqpSYyU`,
        passwordResetObj
      );

      console.log(response);
      setTimeout(()=>{
        history.replace('/auth')
    
       },1000)
    } catch (err) {
      console.log(err);
    }


  };
  return (
    <div className={classes.password}>
      <h2>Enter your registered Email to receive a password reset link</h2>
      <input type="email" ref={enteredEmailInputRef} required />
      <button onClick={onSendForgotPasswordLinkClickHandler}>Send Link</button>
      {isLoading && <LoadingSpinner />&& <p>Check your Email Inbox/Spam to reset password </p>}
    </div>
  );
};

export default ForgotPassword;

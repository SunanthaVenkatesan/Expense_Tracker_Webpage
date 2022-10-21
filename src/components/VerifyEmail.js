import axios from "axios";
import { useRef, useState ,useContext} from "react";
import LoadingSpinner from "./LoadingSpinner";
import AuthContext from '../store/auth-context'
import classes from './VerifyEmail.module.css'
import { useHistory } from "react-router-dom";

const VerifyEmail = () => {
  const authCtx = useContext(AuthContext);
  const history=useHistory()

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const enteredEmailInputRef = useRef();

  const onVerifyEmailHandler = async () => {
    setIsLoading(true)
  
    

    const verifyEmailPayload = {
      requestType: "VERIFY_EMAIL",
      idToken: localStorage.getItem("token"),
    };

    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCh16XEVl-F0hbqJ1L5BG61uXEAxqpSYyU`,
        verifyEmailPayload
      );

      console.log(response);
     setTimeout(()=>{
      history.replace('/expense-tracker')
  
     },2000)
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  return (
    <>
      <div className={classes.email}>
        <h2>Enter your registered E-mail id</h2>
      <input type="email" ref={enteredEmailInputRef} required />
      <button onClick={onVerifyEmailHandler}>Send Link</button>
      {isLoading && <LoadingSpinner /> && <p>Check your Email Inbox/spam to verify </p>}
      </div>
     
    </>
  );
};

export default VerifyEmail;




/*
import axios from "axios";
import { useRef, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const ForgotPassword = () => {

  const [isLoading, setIsLoading] = useState(false);

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
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDxJbdh9oRNKYgksgX7DDWO7EK1pm6yMmk`,
        passwordResetObj
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false)
  };
  return (
    <>
      <div>Enter the email with which you have registered</div>
      <input type="email" ref={enteredEmailInputRef} />
      <button onClick={onSendForgotPasswordLinkClickHandler}>Send Link</button>
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default ForgotPassword;
*/

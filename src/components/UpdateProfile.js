import axios from "axios";
import { useEffect, useRef } from "react";

import classes from "./UpdateProfile.module.css";
const UpdateProfile = () => {
  const enteredNameInputRef = useRef();
  const enteredProfilePhotoURLRef = useRef();


  //console.log(token);

  useEffect(() => {
    axios

      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCh16XEVl-F0hbqJ1L5BG61uXEAxqpSYyU`,
        { idToken: localStorage.getItem("token") }
      )
      .then((response) => {
        console.log(response.data.users[0]).catch((err) => console.log(err));

        const displayName = response.data.users[0].displayName;
        const photoUrl = response.data.users[0].photoUrl;

        enteredNameInputRef.current.value = displayName;
        enteredProfilePhotoURLRef.current.value = photoUrl;
      })
      .catch((err) => {
        return console.log(err);
      });
  }, []);

  const onUpdateProfileSubmitHandler = async (event) => {
    event.preventDefault();

    const enteredName = enteredNameInputRef.current.value;
    const enteredPhotoURL = enteredProfilePhotoURLRef.current.value;

    const updatedInfo = {
      idToken: localStorage.getItem("token"),
      displayName: enteredName,
      photoUrl: enteredPhotoURL,
      returnSecureToken: true,
    };
    enteredNameInputRef.current.value = "";
    enteredProfilePhotoURLRef.current.value = "";

    {<p>Profile updated Successfully</p>}

    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCh16XEVl-F0hbqJ1L5BG61uXEAxqpSYyU`,
        updatedInfo
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    }
   
  };
 
  return (
    <>
      <form className={classes.form} onSubmit={onUpdateProfileSubmitHandler}>
        <div className={classes.control}>
          <h1>Update-Profile</h1>
          <span>Full Name:</span>
          <input type="text" ref={enteredNameInputRef} required />
          <br />

          <span>Profile Photo URL:</span>
          <input type="url" ref={enteredProfilePhotoURLRef} />
        </div>
        <div className={classes.action}>
          <button >Update</button>
        </div>
      </form>
    </>
  );
};

export default UpdateProfile;

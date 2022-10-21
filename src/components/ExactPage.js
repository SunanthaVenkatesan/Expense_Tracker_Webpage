import React from "react";
import { Link } from "react-router-dom";

const ExactPage = () => {
  return (
    <div>
      <Link
        style={{
          textDecoration: "none",
          color: "rgb(63, 60, 60)",
          textAlign: "center",
          fontFamily: "metal-mania",
        }}
        to="/auth"
      >
        <h1 style={{fontFamily:"metal-mania"}}>SignUp/Login to continue</h1>
      </Link>
    </div>
  );
};

export default ExactPage;

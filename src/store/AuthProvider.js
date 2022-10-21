import { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const [token, setToken] = useState(null);

  const onTokenReceive = (token) => {
    setToken(token);
  };

  const authContext = {
    token: token,
    addToken: onTokenReceive,
  
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

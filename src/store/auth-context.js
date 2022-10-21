import { createContext } from "react";

const AuthContext = createContext({
    token: "",
    addToken: () => {}
})

export default AuthContext;
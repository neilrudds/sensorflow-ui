import { createContext } from "react";

// set defaults
const AuthContext = createContext({
    user: null,
    signin: () => {},
    signout: () => {}
})

export default AuthContext;
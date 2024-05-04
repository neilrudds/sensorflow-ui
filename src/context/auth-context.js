import { createContext } from "react";

// set defaults
const AuthContext = createContext({
    user: null, // Object containing user authentication properties
    signin: () => {}, // Signin callback function
    signout: () => {} // Signout callback function
})

export default AuthContext;
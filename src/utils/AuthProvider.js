import { useState } from "react"
import AuthContext from "../context/auth-context"
import { authProvider } from "./auth"

export default function AuthProvider({ children }) {
    let [user, setUser] = useState(null) // user object, in state
  
    // define the signin function
    let signin = (username, password, callback) => { 
      // using the provided username and password, call the signin API
      return authProvider.signin(username, password, () => {
        // once completed, set the user object in state with the user object returned by the API
        setUser(authProvider.user)
        // execute the callback function
        callback()
      })
    }
  
    let signout = callback => {
      // on signout, execute the authProvider signout function
      return authProvider.signout(() => {
        // clear the user stored in state
        setUser(null)
        // execute the callback function
        callback()
      })
    }

    let value = { user, signin, signout }
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider> // Return the AuthContext values
}
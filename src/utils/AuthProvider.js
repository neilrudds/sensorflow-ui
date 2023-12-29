import { useState } from "react"
import AuthContext from "../context/auth-context"
import { authProvider } from "./auth"

export default function AuthProvider({ children }) {
    let [user, setUser] = useState(null)
  
    let signin = (username, password, callback) => {
      return authProvider.signin(username, password, () => {
        setUser(authProvider.user)
        callback()
      })
    }
  
    let signout = callback => {
      return authProvider.signout(() => {
        setUser(null)
        callback()
      })
    }

    let value = { user, signin, signout }
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
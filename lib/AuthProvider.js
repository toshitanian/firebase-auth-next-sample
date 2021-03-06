import { User } from 'firebase'
import { FC, createContext, useEffect, useState } from 'react'
import { auth } from '../lib/firebase'

const AuthContext = createContext({ currentUser: undefined })

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
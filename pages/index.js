import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { auth } from '../lib/firebase'
import Header from "../components/header";
import { Container, TextField, Typography, Button } from "@material-ui/core";
const Home = (props) => {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setCurrentUser(user) : router.push('/login')
    })
  }, [])


  return (
    <div>
      <Header></Header>
      <pre>{currentUser && JSON.stringify(currentUser, null, 4)}</pre>
    </div>
  )
}

export default Home
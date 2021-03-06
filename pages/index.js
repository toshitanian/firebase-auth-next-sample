import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { auth } from '../lib/firebase'

const Home = (props) => {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setCurrentUser(user) : router.push('/login')
    })
  }, [])

  const logOut = async () => {
    try {
      await auth.signOut()
      router.push('/login')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div>
      <pre>{currentUser && JSON.stringify(currentUser, null, 4)}</pre>
      <button onClick={logOut}>Logout</button>
    </div>
  )
}

export default Home
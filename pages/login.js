import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth, googleProvider } from "../lib/firebase";
import {
  Toolbar,
  Container,
  Button,
  AppBar,
  Typography,
  IconButton,
  TextField,
} from "@material-ui/core";
import Header from "../components/header";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && router.push("/");
    });
  }, []);

  const clickEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      router.push("/");
    } catch (err) {
      alert(err.message);
    }
  };
  const clickGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth
        .signInWithPopup(googleProvider)
        .then((result) => {
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="wrapper">
      <Header></Header>
      <Container maxWidth="lg">
        <Container className="login-box" maxWidth="md">
          <Typography variant="h5">Email Login</Typography>

          <TextField
            id="standard-basic"
            label="Email"
            required
            fullWidth
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Password"
            required
            fullWidth
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={clickEmailLogin}>
            Login
          </Button>
        </Container>
        <Container className="login-box" maxWidth="md">
          <Typography variant="h5">Google Login</Typography>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={clickGoogleLogin}
            >
              Login
            </Button>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default Login;

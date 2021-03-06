import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";

import { auth } from "../lib/firebase";
import { AuthContext } from "../lib/AuthProvider";
import Header from "../components/header";
import { Container, TextField, Typography, Button } from "@material-ui/core";
const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && router.push("/");
    });
  }, []);

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      router.push("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="wrapper">
      <Header></Header>
      <Container maxWidth="lg">
        <Typography variant="h5">Email Signup</Typography>

        <form className="auth" onSubmit={createUser}>
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
          <Button variant="contained" color="primary" onClick={createUser}>
            Sign Up
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default SignUp;

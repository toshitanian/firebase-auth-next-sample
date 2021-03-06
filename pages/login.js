import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth, googleProvider } from "../lib/firebase";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && router.push("/");
    });
  }, []);

  const logIn = async (e) => {
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
    }).catch((error) => {
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
  }

  return (
    <div className="wrapper">
      <h2>Email Login</h2>
      <form className="auth" onSubmit={logIn}>
        <div>
          <label htmlFor="email" className="auth-label">
            Email:{" "}
          </label>
          <input
            id="email"
            className="auth-input"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="password" className="auth-label">
            Password:{" "}
          </label>
          <input
            id="password"
            className="auth-input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="auth-btn" type="submit">
          Login
        </button>
      </form>
      <h2>Google Login</h2>
      <div>
        <button onClick={clickGoogleLogin}></button>
      </div>
      <Link href="/signup">
        <a className="auth-link">signup</a>
      </Link>
    </div>
  );
};

export default Login;

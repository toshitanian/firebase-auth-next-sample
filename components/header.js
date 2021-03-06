import { useRouter } from "next/router";
import {
  Toolbar,
  Container,
  AppBar,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@material-ui/core";
import { auth } from "../lib/firebase";

import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const logOut = async () => {
    try {
      await auth.signOut();
      router.push("/login");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <Link href="/ ">Firebase Auth Next.js sample</Link>
          </Typography>

          <div className="login-button">
            <Typography>
              <Link href="/login">Login</Link>
            </Typography>
          </div>
          <div className="sign-up-button">
            <Typography>
              <Link href="/signup">Sign up</Link>
            </Typography>
          </div>
          <div className="logout-button">
            <Typography>
              <Button color="secondary" onClick={logOut}>
                Logout
              </Button>
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <style jsx global>{`
        .login-box {
          padding: 30px 0;
        }
        .sign-up-button,
        .login-button,
        .logout-button {
          margin: 0 20px;
        }
      `}</style>
    </div>
  );
}

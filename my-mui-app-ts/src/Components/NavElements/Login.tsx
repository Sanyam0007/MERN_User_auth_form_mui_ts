import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from 'react-redux';

const theme = createTheme();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(false);
  const [valid, setValid] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [userData, setUserdata] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const goToSignUp = () => {
    setTimeout(() => {
      <CircularProgress />;
    }, 1000);
    navigate("/signup");
  };
  const handleLogin = async () => {
    setValid(true);
    setValidPassword(true);
    const config = {
      
    }
    // handle login logic here
    const response = await axios
      .post("http://localhost:4000/login", { email, password }, config)
      .then((res) => {
        console.log("mydata", res.data);
        if (res.data.message === "Not Exists") {
          console.log("email does not exists");
          setUser(false);
          setValid(false);
        } else if (res.data.message === "Invalid credentials") {
          setValidPassword(false);
        } else if (res.data.message === "exists") {
          setUser(true);
          setToken(res.data.token);
          setUserdata(res.data.user);
        }
      })
      .catch((err) => {
        setValid(false);
        setUser(false);
        // alert("wrong details");
        console.log(err.message);
      });
  };

  useEffect(() => {
    if (token !== null && user !== null) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }, [token]);
  useEffect(() => {
    if (user && valid && validPassword) {
      setTimeout(() => {
        navigate("/profile");
      }, 500);
    }
  }, [user]);

  useEffect(() => {
    if (!valid || !validPassword) {
      enqueueSnackbar("Invalid username or password", { variant: "warning" });
    }
  }, [valid, validPassword]);
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h3" style={{ margin: "5px" }}>
        Login
      </Typography>
      <div>
        <Container
          style={{
            marginTop: "50px",
            width: "400px",
            border: "1px solid black",
            padding: "30px",
            borderRadius: "8px",
            background: "linear-gradient(to right, white ,aqua)",
          }}
        >
          <Grid>
            <TextField
              label="Email"
              style={{ margin: "10px" }}
              variant="outlined"
              value={email}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid>
            <TextField
              label="Password"
              variant="outlined"
              style={{ margin: "10px" }}
              type="password"
              value={password}
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid>
            <Button
              variant="contained"
              onClick={handleLogin}
              style={{ marginTop: "25px" }}
            >
              Login
            </Button>
          </Grid>
          <Typography style={{ marginTop: "4px" }}>Not a user?</Typography>
          <Button onClick={goToSignUp}>signup</Button>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Login;

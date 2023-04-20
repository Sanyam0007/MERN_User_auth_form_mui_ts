import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { CardContent, CircularProgress, Container } from "@mui/material";
import { enqueueSnackbar } from "notistack";
// import { useDispatch } from "react-redux";
// import { setToken } from "../../Auth/AuthSlice";

interface SignUpProps {
  onSignUp: (
    name: string,
    email: string,
    password: string,
    phoneNumber: number
  ) => void;
}

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default function SignUp2({ onSignUp }: SignUpProps) {
  const classes = useStyles();
  // const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [isSubmit, setSubmit] = useState(false);
  const [message, setmessage] = useState("");
  const [data, setData] = useState({});
  const [token, setToken] = useState("");
  const [userdata,setUserdata] = useState({})

  //handle all input events
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //api
    fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        phoneNumber: phone,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        if (data) {
          setmessage(data.message);
          setToken(data.token);
          setData(data);
          setUserdata(data.user)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (message === "success") {
      enqueueSnackbar("succesfully signing in!", { variant: "success" });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userdata));
      navigate("/successSign");
    } else if (message === "exists") {
      enqueueSnackbar("user already exists!", { variant: "warning" });
    } else if (message === "fail") {
      enqueueSnackbar("Failed to login", { variant: "error" });
      console.log("some error occured");
    }
  }, [message]);

  async function saveData(data: any) {
    setSubmit(true);

    try {
      handleSubmit(data);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmit(false);
    }
  }

  const goToLogin = () => {
    setTimeout(() => {
      <CircularProgress/>
     
    }, 1000);
    navigate("/login");
  };
  return (
    <form >
      <Card
        style={{
          border: "1.5px solid black",
          width: "450px",
          backgroundImage:'linear-gradient(to right, white , blue)',
          // background: "#90a3db",
          marginTop: "30px",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius:'15px',
          height:'520px',
          // padding: "10px",
        }}
      >
        <Typography
          variant="h4"
          style={{
            margin: "8px",
            color: "#0a061d",
            // background: "",
            borderRadius: "5px",
            padding: "4px",
            fontFamily: "Segoe UI",
          }}
        >
          Sign Up
        </Typography>
        <CardContent>
          <TextField
            label="Name"
            value={name}
            onChange={handleNameChange}
            required={true}
            fullWidth
          />
        </CardContent>
        <CardContent>
          <TextField
            label="Email"
            type="email"
            value={email}
            required={true}
            fullWidth
            onChange={handleEmailChange}
          />
        </CardContent>
        <CardContent>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required={true}
            fullWidth
          />
        </CardContent>
        <CardContent>
          <TextField
            label="Phone"
            type="number"
            value={phone}
            onChange={handlePhoneChange}
            required={true}
            fullWidth
          />
        </CardContent>
        <Button
          style={{ margin: "20px", width: "150px" }}
          type="submit"
          variant="contained"
          color="primary"
          onClick={saveData}
        >
          Sign Up
        </Button>
        <Typography>
          Already have an account? {<Button onClick={goToLogin}>Login</Button>}
          {loading && <CircularProgress />}
        </Typography>
      </Card>
    </form>
  );
}

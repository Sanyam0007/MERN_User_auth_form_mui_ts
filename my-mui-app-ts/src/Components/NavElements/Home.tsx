import { Button, CircularProgress, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Container from "@mui/material/Container/Container";

export const Home = () => {
  const navigate = useNavigate();
  const [islogged, setisLogged] = useState(false);

  const [newUser, setNewUser] = useState(false);

  const gotoLogin = () => {
    navigate("/login");
  };
  const gotoSignUp = () => {
    navigate("/signup");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setisLogged(true);
    }
    // console.log('yes effect',token)
  }, [islogged]);

  if (islogged) {
    setTimeout(() => {
      <CircularProgress />;
    }, 5000);
    navigate("/profile");
  }

  return (
    <div>
      <Typography
        style={{
          // marginTop: "40px",
          marginBottom: "100px",
          padding: "10px",
          color:'white'
        }}
        variant="h3"
      >
        Welcome to the Home Page
      </Typography>
      <Container
        style={{
          display: "flex",
          background: "transparent",
          padding: "40px",
          width: "auto",
          // border: "0.1px solid black",
          height: "300px",
        }}
      >
        <Container
          style={{
            background: "#d8f8f5",
            margin: "auto",
            width: "250px",
            height:'150px',
            padding:'5px',
            borderRadius: "8px",
            border: "2px solid black",
          }}
        >
          <Typography variant="h6">
            New User?
            {
              <Button
                onClick={gotoSignUp}
                style={{
                  marginTop: "30px",
                  borderRadius: "5%",
                  border: "1px solid black",
                  color:'black',
                  background:'#f5ced2'
                }}
              >
                Go to signup Page
              </Button>
            }
          </Typography>
        </Container>
        <Typography margin={"auto"}>OR</Typography>
        {/* <br /> */}
        <Container
          style={{
            background: "#d8f8f5",
            margin: "auto",
            width: "250px",
            borderRadius: "8px",
            height:'150px',
            padding:'5px',
            border: "2px solid black",
          }}
        >
          <Typography variant="h6">
            Already a user?
            {
              <Button
                onClick={gotoLogin}
                style={{
                  marginTop: "30px",
                  borderRadius: "5%",
                  border: "1px solid black",
                  background:'#f5ced2',
                  color:'black'
                }}
              >
                Go to Login up page
              </Button>
            }
          </Typography>
        </Container>
      </Container>
      {/* <SignUp2 onSignUp={handleSignUp}/> */}
    </div>
  );
};

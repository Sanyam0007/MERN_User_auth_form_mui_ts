import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Avatar, CircularProgress } from "@mui/material";
import { Container } from "@material-ui/core";
import { useLocation } from "react-router";

interface User {
  name: string;
  email: string;
  phoneNumber: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(4),
    },
    title: {
      marginBottom: theme.spacing(2),
    },
    textField: {
      margin: theme.spacing(1),
      width: "100%",
    },
  })
);

const Profile = () => {
  const classes = useStyles();
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isloggedIn, setisloggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setisloggedIn(true);
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (userData !== null) {
          setUser(JSON.parse(userData));
        }
        console.log("userdata is->", userData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (!isloggedIn) {
    return (
      <Typography style={{ color: "white" }}>user data not found</Typography>
    );
  }
  return (
    <div className={classes.root}>
      {isLoading ? (
        <CircularProgress />
      ) : user !== null ? (
        <>
          <Typography
            variant="h4"
            className={classes.title}
            style={{ color: "white" }}
          >
            Welcome {location.state}! This is your profile page
          </Typography>
          <Container
            style={{
              width: "50%",
              height: "400px",
              border: "1px solid black",
              padding: "30px",
              borderRadius: "8px",
              background: "linear-gradient(to right, #C5DDF9 ,#F4F99F)",
            }}
          >
            <Avatar
              style={{ margin: "auto", height: "70px", width: "70px" }}
            ></Avatar>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  value={user.name}
                  className={classes.textField}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  value={user.email}
                  className={classes.textField}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone"
                  value={user.phoneNumber}
                  className={classes.textField}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
          </Container>
        </>
      ) : (
        <Typography variant="body1" gutterBottom>
          No user data found.
        </Typography>
      )}
    </div>
  );
};

export default Profile;

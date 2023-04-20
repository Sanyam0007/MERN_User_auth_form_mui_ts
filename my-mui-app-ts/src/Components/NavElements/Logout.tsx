import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

export const Logout = () => {
  const navigate = useNavigate();
  const [loggedOut, setLoggedout] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logoutDevice();
    } finally {
      setLoading(false);
    }
  };

  async function logoutDevice() {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setLoggedout(true);
    }
  }

  useEffect(() => {
    if (loggedOut) {
      enqueueSnackbar("logging out...", { variant: "info" });
      setTimeout(() => {
        navigate("/");
      }, 2500);
    }
  }, [loggedOut]);

  async function handleDeleteAccount() {
    try {
      await fetch("http://localhost:4000/logout", {
        method: "DELETE",
      });
      const token = localStorage.getItem("token");
      if (token) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setLoggedout(true);
      }
      setDeleteAccount(true);
    } catch (error) {
      console.error("Network error:", error);
    }
  }
  useEffect(() => {
    if (deleteAccount) {
      setTimeout(() => {
        enqueueSnackbar("deleting account...", { variant: "error" });
        navigate("/");
      }, 3000);
    }
  }, [deleteAccount]);

  return (
    <div style={{ background: "transparent" }}>
      <Grid>
        <Card
          style={{
            maxWidth: 450,
            padding: "20px 5px",
            marginTop: "45px",
            marginRight: "auto",
            marginLeft: "auto",
            border: "2px solid black",
            background: "#ffffb7",
            borderRadius: "30px",
          }}
        >
          <CardContent>
            <Typography>Are You sure you want to logout?</Typography>
            <Button
              onClick={handleLogout}
              disabled={loading}
              style={{
                background: "yellow",
                marginTop: "40px",
                color: "black",
                border: "0.5px solid black",
              }}
            >
              {loading ? <CircularProgress size={28} /> : "Logout"}
            </Button>
          </CardContent>
        </Card>
        <Typography style={{ margin: "5px", color: "white" }}>OR</Typography>
        <Card
          style={{
            maxWidth: 450,
            padding: "20px 5px",
            margin: "auto",
            border: "2px solid black",
            background: "#cccc84",
            borderRadius: "30px",
          }}
        >
          <CardContent>
            <Typography>
              Do you want to delete your account permanently from this device?
            </Typography>
            <Button
              onClick={handleDeleteAccount}
              disabled={loading}
              style={{
                background: "red",
                marginTop: "40px",
                color: "white",
                border: "0.5px solid black",
              }}
            >
              Yes
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

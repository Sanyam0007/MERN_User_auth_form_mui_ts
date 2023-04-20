import { Button, Card, Container, Typography } from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { useNavigate } from "react-router-dom";

export const SuccessSignIn = () => {
  const [progress, setProgress] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleProfilePage = () => {
    navigate("/profile");
  };

  return (
    <div>
      <Container
        style={{
          margin: "auto",
          padding: "4px",
          width: "auto",
          height: "400px",
        }}
      >
        <VerifiedUserOutlinedIcon
          style={{ height: "200px", width: "200px", margin: "40px" }}
        />
        <Typography
          variant="h3"
          style={{ color: "green", background: "#f8fcfd", width: "auto" }}
        >
          Successfully signed in!
        </Typography>
        <Typography variant="h5" style={{ color: "black", marginTop: "40px" }}>
          You are succesfully signed in,please go to your profile
        </Typography>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          style={{
            marginTop: "15px",
            color: "black",
            background: "#2c778f",
            borderRadius: "10px",
          }}
          onClick={handleProfilePage}
        >
          Go to Profile
        </Button>
      </Container>
    </div>
  );
};

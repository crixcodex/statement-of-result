import { Card, CardContent, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import PageContainer from "../layout/PageContainer";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Footer from "../layout/Footer";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
function Welcome() {
  const [token] = useLocalStorage("token", null);
  const MATRIC_NUM = process.env.MATRIC_NUM ?? "123456789";
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (token && token == MATRIC_NUM) setIsAuth(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      <Header title="Home" />
      <PageContainer>
        <Container maxWidth="sm">
          <center>
            <Card>
              <CardContent>
                <Typography
                  sx={{ fontSize: 20 }}
                  color="text.secondary"
                  gutterBottom
                >
                  <strong>
                    WELCOME {isAuth && "Francisca!".toUpperCase()}
                  </strong>
                </Typography>

                <Typography variant="body2">
                  {!isAuth &&
                    ` hurry up and surf through all you certificates, with your
                  matric number and password`}

                  {isAuth &&
                    `Now you're logged in you can easily manage your results through this portal`}
                </Typography>
              </CardContent>
              <CardActions>
                {!isAuth && (
                  <Button size="small" onClick={() => navigate("/login")}>
                    Login Now
                  </Button>
                )}
                {isAuth && (
                  <Button size="small" onClick={() => navigate("/login")}>
                    Manage Results
                  </Button>
                )}
              </CardActions>
            </Card>
          </center>
        </Container>
      </PageContainer>
      <Footer />
    </React.Fragment>
  );
}

export default Welcome;

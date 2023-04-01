import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import PageContainer from "../layout/PageContainer";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Footer from "../layout/Footer";
import { Label } from "reactstrap";
import { Toast } from "../layout/Util";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const REACT_APP_MATRIC_NUM = process.env.REACT_APP_MATRIC_NUM ?? "123456789";
const PASSWORD = process.env.REACT_APP_PASSWORD ?? "PASSWORD";

function AuthLogin() {
  const [token, setToken] = useLocalStorage("token", null);

  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (token && token == REACT_APP_MATRIC_NUM) navigate("/dashboard");
  }, [navigate, token]);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const onHandleMouseDownPassword = (e) => e.preventDefault();

  const [error, setError] = useState({
    REACT_APP_MATRIC_NUM: "",
    password: "",
  });

  const [data, setData] = useState({
    REACT_APP_MATRIC_NUM: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    let err = {
      password: "",
      REACT_APP_MATRIC_NUM: "",
    };
    if (!data.password.length > 0) {
      err.password = "Password cannot be empty";
    }
    if (!data.REACT_APP_MATRIC_NUM.length > 0) {
      err.REACT_APP_MATRIC_NUM = "Matric number cannot be empty";
    }
    setError(err);

    if (!error.password && !error.REACT_APP_MATRIC_NUM) {
      setIsLoading(true);
      setTimeout(() => {
        if (
          data.REACT_APP_MATRIC_NUM.trim() === REACT_APP_MATRIC_NUM &&
          data.password.trim() === PASSWORD
        ) {
          setData({
            REACT_APP_MATRIC_NUM: "",
            password: "",
          });
          setToken(data.REACT_APP_MATRIC_NUM);
          navigate("/dashboard", { replace: true });
          Toast.fire({
            icon: "success",
            title: "Signed in successfully",
          });
          console.log("success");
        } else {
          setError({ ...error, REACT_APP_MATRIC_NUM: "Invalid Credentials" });
        }
        setIsLoading(false);
      }, 700);
    }
  };

  useEffect(() => {
    if (error?.REACT_APP_MATRIC_NUM) {
      setError({ ...error, REACT_APP_MATRIC_NUM: "" });
    }
    if (error?.password) {
      setError({ ...error?.password, password: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <React.Fragment>
      <Header title="Login" />
      <PageContainer>
        <Container maxWidth={"sm"}>
          <Card variant="outlined">
            <CardHeader
              component={() => (
                <div className="bg-primary text-center p-3">
                  <Typography variant="h5" color={"white"}>
                    <strong>LOGIN</strong>
                  </Typography>
                </div>
              )}
            />
            <CardContent>
              <Stack spacing={2}>
                <FormControl>
                  <TextField
                    error={error?.REACT_APP_MATRIC_NUM ? true : false}
                    label={"Matric Number"}
                    variant="filled"
                    type={"text"}
                    value={data.REACT_APP_MATRIC_NUM}
                    autoComplete={"off"}
                    onChange={(e) =>
                      setData({ ...data, REACT_APP_MATRIC_NUM: e.target.value })
                    }
                  />
                  <Label
                    className="invalid text-danger small form-label"
                    role={"alert"}
                  >
                    <strong>
                      <i>
                        {error?.REACT_APP_MATRIC_NUM &&
                          error?.REACT_APP_MATRIC_NUM}
                      </i>
                    </strong>
                  </Label>
                </FormControl>

                <FormControl variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">
                    {"Password"}
                  </InputLabel>
                  <FilledInput
                    error={error?.password ? true : false}
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle Password Visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={onHandleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <Label
                    className="invalid text-danger small form-label"
                    role={"alert"}
                  >
                    <strong>
                      <i>{error?.password && error?.password}</i>
                    </strong>
                  </Label>
                </FormControl>

                <Button
                  onClick={handleClick}
                  sx={{
                    padding: "10px",
                    background: "#0d6efd",
                  }}
                  variant="contained"
                  disabled={isLoading}
                >
                  {isLoading ? "PROCESSING" : "AUTHENTICATE"}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </PageContainer>
      <Footer />
    </React.Fragment>
  );
}

export default AuthLogin;

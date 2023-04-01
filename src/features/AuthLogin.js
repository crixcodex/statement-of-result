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

const MATRIC_NUM = process.env.MATRIC_NUM ?? "123456789";
const PASSWORD = process.env.PASSWORD ?? "PASSWORD";

function AuthLogin() {
  const [token, setToken] = useLocalStorage("token", null);

  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (token && token == MATRIC_NUM) navigate("/dashboard");
  }, [navigate, token]);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const onHandleMouseDownPassword = (e) => e.preventDefault();

  const [error, setError] = useState({
    matric_num: "",
    password: "",
  });

  const [data, setData] = useState({
    matric_num: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    let err = {
      password: "",
      matric_num: "",
    };
    if (!data.password.length > 0) {
      err.password = "Password cannot be empty";
    }
    if (!data.matric_num.length > 0) {
      err.matric_num = "Matric number cannot be empty";
    }
    setError(err);

    if (!error.password && !error.matric_num) {
      setIsLoading(true);
      setTimeout(() => {
        if (
          data.matric_num.trim() === MATRIC_NUM &&
          data.password.trim() === PASSWORD
        ) {
          setData({
            matric_num: "",
            password: "",
          });
          setToken(data.matric_num);
          navigate("/dashboard", { replace: true });
          Toast.fire({
            icon: "success",
            title: "Signed in successfully",
          });
          console.log("success");
        } else {
          setError({ ...error, matric_num: "Invalid Credentials" });
        }
        setIsLoading(false);
      }, 700);
    }
  };

  useEffect(() => {
    if (error?.matric_num) {
      setError({ ...error, matric_num: "" });
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
                    error={error?.matric_num ? true : false}
                    label={"Matric Number"}
                    variant="filled"
                    type={"text"}
                    value={data.matric_num}
                    autoComplete={"off"}
                    onChange={(e) =>
                      setData({ ...data, matric_num: e.target.value })
                    }
                  />
                  <Label
                    className="invalid text-danger small form-label"
                    role={"alert"}
                  >
                    <strong>
                      <i>{error?.matric_num && error?.matric_num}</i>
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

import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const RoutesWare = () => {
  const [token] = useLocalStorage("token", null);
  const saved_token = process.env.REACT_APP_MATRIC_NUM ?? 123456789;
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (token && saved_token && token == saved_token) setIsAuth(true);
    else navigate("/login", { replace: true });
  }, [navigate, saved_token, token]);

  if (isAuth) {
    return <Outlet />;
  }
};

export default RoutesWare;

import React, { useEffect, useState } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink as RNavLink,
} from "reactstrap";
import { IoLogInOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import Head from "./Head";
import { Toast } from "./Util";
import useLocalStorage from "../hooks/useLocalStorage";

function Header({ ...props }) {
  const [token, setToken] = useLocalStorage("token", null);

  // console.log(token);

  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const mac_num = process.env.REACT_APP_MATRIC_NUM ?? 123456789;
    if (!token) setIsAuth(false);
    // eslint-disable-next-line eqeqeq
    else if (mac_num == token) setIsAuth(true);
    else setIsAuth(false);
  }, [isAuth, token]);

  const history = useNavigate();

  const navigate = (loc) => history(loc);

  const onLogOut = async () => {
    await localStorage.clear();
    await setToken(null);
    Toast.fire({
      icon: "success",
      title: "Signed out successfully",
    });
    navigate("/login");
  };
  return (
    <React.Fragment>
      <Head {...props} />
      {props.showMainHeader === false ? null : (
        <Navbar className="px-5 " color="primary">
          <NavbarBrand className="text-white">
            <strong>SCHOOL RESULT</strong>
          </NavbarBrand>
          <Nav>
            <NavItem>
              {!isAuth && (
                <NavLink
                  to={"/login"}
                  className={"link-light  text-decoration-none"}
                >
                  Login <IoLogInOutline size={20} />
                </NavLink>
              )}
              {isAuth && (
                <NavLink
                  to={"#"}
                  onClick={() => onLogOut()}
                  className={"link-light  text-decoration-none"}
                >
                  Logout <IoLogInOutline size={20} />
                </NavLink>
              )}
            </NavItem>
          </Nav>
        </Navbar>
      )}
      <Navbar sticky={"top"} className="shadow px-4" color="light">
        <Nav className="">
          {isAuth && (
            <>
              <NavItem>
                <RNavLink href="#" onClick={() => navigate("/")}>
                  Home
                </RNavLink>
              </NavItem>
              <NavItem>
                <RNavLink href="#" onClick={() => navigate("/")}>
                  Result Management
                </RNavLink>
              </NavItem>
            </>
          )}
        </Nav>
        <Nav className="">
          {!isAuth && (
            <>
              <NavItem>
                <RNavLink href="#" onClick={() => navigate("/")}>
                  Home
                </RNavLink>
              </NavItem>
              <NavItem>
                <RNavLink href="#" onClick={() => navigate("/")}>
                  Open Ticket
                </RNavLink>
              </NavItem>
              <NavItem>
                <RNavLink href="#" onClick={() => navigate("/")}>
                  Support
                </RNavLink>
              </NavItem>
            </>
          )}
        </Nav>
        <Nav>
          {isAuth && (
            <>
              <NavItem>
                <RNavLink>
                  <strong>AZUDIUGWU Ogochukwu Francisca</strong>
                </RNavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>
    </React.Fragment>
  );
}

export default Header;

import React, { useContext, useEffect } from "react";
import { AppBar, Avatar, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { ContextNavigate } from "../ContextProvider/Context";

const Navbar = () => {
  const { userdata, setUserData } = useContext(ContextNavigate);
  // console.log(userdata);

  const avatarForFetchData = async () => {
    const token = await localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch("http://localhost:4000/validUser", {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        Authorization: token,
      },
    });

    const res = await data.json();
    // console.log(res);

    if (res.status === 205) {
      // console.log(res);
      setUserData(res);
    } else {
      console.log("user not found");
    }
  };

  useEffect(() => {
    avatarForFetchData();
  });

  return (
    <>
      <div className="navbar">
        <AppBar position="static">
          <Toolbar>
            <div className="tab">
              <button className="btn btn-primary">
                <NavLink
                  to={"/home"}
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "25px",
                  }}
                >
                  Home
                </NavLink>
              </button>
            </div>
            <div className="tab">
              <button className="btn btn-primary">
                <NavLink
                  to={"/about"}
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "25px",
                  }}
                >
                  About
                </NavLink>
              </button>
            </div>
            <div className="tab">
              <button className="btn btn-primary">
                <NavLink
                  to={"/service"}
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "25px",
                  }}
                >
                  Service
                </NavLink>
              </button>
            </div>
            <div className="tab">
              <button className="btn btn-primary">
                <NavLink
                  to={"/portfolio"}
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "25px",
                  }}
                >
                  Portfolio
                </NavLink>
              </button>
            </div>
            <div className="tab">
              <button className="btn btn-primary">
                <NavLink
                  to={"/contact"}
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "25px",
                  }}
                >
                  Contact
                </NavLink>
              </button>
            </div>
            <div className="tab">
              <button className="btn btn-primary">
                <NavLink
                  to={"/login"}
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "25px",
                  }}
                >
                  Login
                </NavLink>
              </button>
            </div>
            <div className="avatar">
              <Avatar className="avatar-main">
                {userdata ? (
                  userdata.getData.email.charAt(0).toUpperCase()
                ) : (
                  <Avatar></Avatar>
                )}
              </Avatar>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Navbar;

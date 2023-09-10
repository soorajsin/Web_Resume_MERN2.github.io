import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
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
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Navbar;

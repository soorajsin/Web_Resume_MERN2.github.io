import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { ContextNavigate } from "../ContextProvider/Context";

const Home = () => {
  const { userdata, setUserData } = useContext(ContextNavigate);
  // console.log(userdata.getData);

  const history = useNavigate();

  const HomeFetchData = async () => {
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
      // history("/home");
    } else {
      console.log("userData not found");
      history("*");
    }
  };

  useEffect(() => {
    HomeFetchData();
  });

  return (
    <>
      <div className="home">
        <div className="tag">
          <h3>
            Hello, My name is{" "}
            <span>{userdata ? userdata.getData.name : "Loading"}</span>
          </h3>
        </div>
      </div>
    </>
  );
};

export default Home;

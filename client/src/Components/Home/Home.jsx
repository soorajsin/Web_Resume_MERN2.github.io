import React, { useEffect } from "react";

const Home = () => {
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
    console.log(res);
    
  };

  useEffect(() => {
    HomeFetchData();
  });

  return (
    <>
      <div className="home">
        <h1>Welcome to the homepage</h1>
      </div>
    </>
  );
};

export default Home;

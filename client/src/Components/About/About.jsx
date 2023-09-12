import React, { useContext, useEffect } from "react";
import "./About.css";
import { NavLink, useNavigate } from "react-router-dom";
import { ContextNavigate } from "../ContextProvider/Context";

const About = () => {
  const { userdata, setUserData } = useContext(ContextNavigate);
  // console.log(userdata.getData);

  const history = useNavigate();

  const aboutFetchData = async () => {
    const token = await localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch("http://localhost:4000/validUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const res = await data.json();
    // console.log(res);

    if (res.status === 205) {
      // console.log(res);
      setUserData(res);
      // history("/about");
    } else {
      console.log("user not found with data");
      history("*");
    }
  };

  useEffect(() => {
    aboutFetchData();
  });

  return (
    <>
      <div className="about">
        <div className="left">
          <h3>
            I'm <span>{userdata ? userdata.getData.name : "Loading"}</span> and{" "}
            <span>MERN Stact Developer</span>
          </h3>
          <p>
            Reliable and friendly individual who works hard to achieve his
            hoals. Adaptable quickly, and organized well. Interested in learning
            the latest web & software technologies quickly Able to work in teams
            as well as individually. My future goal is to become a senior
            full-stack developer
          </p>
        </div>
        <div className="right">
          <div className="skill">
            <div className="showSkill">
              {userdata
                ? userdata.getData.skills.map((skill, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <br />} {/* Add line break if index > 0 */}
                      <div className="skillCSSHandle">
                        <div className="handle">
                          {skill}{" "}
                          <i
                            className="fa-solid fa-pen-to-square"
                            onClick={() => {
                              history("/updateSkill");
                            }}
                          ></i>
                        </div>
                      </div>
                    </React.Fragment>
                  ))
                : "Loading"}
            </div>
            <div className="addSkill">
              <button className="btn btn-primary">
                <NavLink
                  to={"/skill"}
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Add Skill
                </NavLink>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

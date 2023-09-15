import React, { useContext, useEffect } from "react";
import "./About.css";
import { NavLink, useNavigate } from "react-router-dom";
import { ContextNavigate } from "../ContextProvider/Context";

const About = () => {
  const { userdata, setUserData } = useContext(ContextNavigate);
  // console.log(userdata);

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

  const deleteEducation = async (educationId, index) => {
    const token = await localStorage.getItem("userDataToken");
    // console.log(token);

    const data = await fetch("http://localhost:4000/deleteEducationOne", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ educationId }),
    });

    const res = await data.json();
    // console.log(res);

    if (res.status === 205) {
      alert("Are you sure ");
      console.log(res);
    } else {
      console.log("education detail not delete");
    }
  };

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
        <div className="personalInfo">
          <div className="showInfo">
            {userdata ? (
              <div className="showInfo-data">
                <p>Birthday: {userdata.getData.personalInfo[0].birthday}</p>
                <p>Age: {userdata.getData.personalInfo[0].age}</p>
                <p>Email: {userdata.getData.personalInfo[0].email}</p>
                <p>Course: {userdata.getData.personalInfo[0].course}</p>
                <p>Phone: {userdata.getData.personalInfo[0].phone}</p>
                <p>City: {userdata.getData.personalInfo[0].city}</p>
              </div>
            ) : (
              "Loading"
            )}
          </div>
          <div className="editInfo">
            <button
              onClick={() => history("/personalInfo")}
              className="btn btn-primary"
            >
              Edit Personal Information
            </button>
          </div>
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

        <div className="education">
          <div className="education-part">
            <div className="show-education">
              {userdata
                ? userdata.getData.education.map((education, index) => (
                    <div key={index} className="education-data">
                      <p>Duration: {education.duration}</p>
                      <p>Course: {education.course}</p>
                      <p>Description: {education.description}</p>
                      <div className="deleteIcon">
                        <i
                          onClick={() => deleteEducation(education._id, index)}
                          className="fa-sharp fa-solid fa-trash"
                        ></i>
                      </div>
                    </div>
                  ))
                : "Loading"}
            </div>
            <div className="edit-education">
              <button
                onClick={() => history("/editEducation")}
                className="btn btn-danger"
              >
                Edit Education
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

import React from "react";
import "./EditEducation.css";

const EditEducation = () => {
  return (
    <>
      <div className="education">
        <h1>Welcome to Education </h1>
        <br />
        <div className="form">
          <div className="time">
            <label htmlFor="time">Duration</label>
            <br />
            <input type="text" placeholder="Enter your education duration" />
          </div>
          <br />
          <div className="form">
            <label htmlFor="course">Course</label>
            <br />
            <input type="text" placeholder="Enter your course" />
          </div>
          <br />
          <div className="form">
            <label htmlFor="describtion">Describtion</label>
            <br />
            <textarea cols="50" rows="3"></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEducation;

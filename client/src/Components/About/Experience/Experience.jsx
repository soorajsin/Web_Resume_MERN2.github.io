import React, { useState } from "react";
import "./Experience.css";

const Experience = () => {
  const [experienceForms, setExperienceForm] = useState([
    {
      duration: "",
      department: "",
      describtion: "",
    },
  ]);

  const addExperienceForm = () => {
    const newForm = {
      duration: "",
      department: "",
      describtion: "",
    };
    setExperienceForm([...experienceForms, newForm]);
  };
  console.log(experienceForms);

  const saveExperienceData = async () => {
    const emptyField = experienceForms.some(
      (form) =>
        form.duration === "" ||
        form.department === "" ||
        form.describtion === ""
    );

    if (emptyField) {
      alert("Please fill all fields");
    } else {
      console.log("experience");

      const token = await localStorage.getItem("userDataToken");
      //       console.log(token);

      const data = await fetch("http://localhost:4000/editExperience", {
        method: "POTS",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ experienceForms }),
      });

      const res = await data.json();
      console.log(res);
    }
  };

  return (
    <>
      <div className="experience">
        <h1>Welcome to Experience </h1>
        <br />
        {experienceForms.map((subform, index) => (
          <div className="subform" key={index}>
            <div className="form">
              <label htmlFor="duration">Duration</label>
              <br />
              <input
                type="text"
                value={subform.duration}
                onChange={(e) => {
                  const updatedForms = [...experienceForms];
                  updatedForms[index].duration = e.target.value;
                  setExperienceForm(updatedForms);
                }}
                placeholder="Enter your duration experience"
              />
            </div>
            <br />
            <div className="form">
              <label htmlFor="department">Department</label>
              <br />
              <input
                type="text"
                value={subform.department}
                onChange={(e) => {
                  const updatedForms = [...experienceForms];
                  updatedForms[index].department = e.target.value;
                  setExperienceForm(updatedForms);
                }}
                placeholder="Enter your department"
              />
            </div>
            <br />
            <div className="form">
              <label htmlFor="describtion">Describtion</label>
              <br />
              <textarea
                value={subform.describtion}
                onChange={(e) => {
                  const updatedForms = [...experienceForms];
                  updatedForms[index].describtion = e.target.value;
                  setExperienceForm(updatedForms);
                }}
                placeholder="Enter your describtion"
                cols="50"
                rows="2"
              ></textarea>
            </div>
          </div>
        ))}
        <div className="form">
          <button onClick={addExperienceForm} className="btn btn-danger">
            Add Experience
          </button>
        </div>
      </div>
      <div className="saveExperinece">
        <button onClick={saveExperienceData} className="btn btn-success">
          Save
        </button>
      </div>
    </>
  );
};

export default Experience;

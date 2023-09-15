import React from "react";
import "./EditService.css";

const EditService = () => {
  return (
    <>
      <div className="editService">
        <h1>Edit Service</h1>
        <br />
        <div className="form">
          <label htmlFor="url">URL</label>
          <br />
          <input type="url" name="url" placeholder="Enter your service url" />
        </div>
        <br />
        <div className="form">
          <label htmlFor="name">Name</label>
          <br />
          <input type="text" placeholder="Enter your service name" />
        </div>
        <br />
        <div className="form">
          <label htmlFor="describtion">Describtion</label>
          <br />
          <textarea
            placeholder="Enter your service describtion"
            rows={2}
            cols={50}
          />
        </div>
        <br />
        <div className="form">
          <button className="btn btn-primary">Add Service</button>
        </div>
        <br />
      </div>
      <div className="saveService">
          <button className="btn btn-success">Save</button>
      </div>
    </>
  );
};

export default EditService;

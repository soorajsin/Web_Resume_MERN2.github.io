import React, { useState } from "react";
import "./EditPhoto.css";

const EditPhoto = () => {
  const [photo, setPhoto] = useState([
    {
      name: "",
      url: "",
    },
  ]);

  const setPhotoData = async (e) => {
    const { name, value } = e.target;

    setPhoto({
      ...photo,
      [name]: value,
    });
  };
  console.log(photo); 


  const savePhotoData=async(e)=>{
           
  }

  return (
    <>
      <div className="editPhoto">
        <div className="edit">
          <h1>Welcome to Edit Photo</h1>
          <br />
          <div className="form">
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              placeholder="Enter name..."
              name="name"
              value={photo.name}
              onChange={setPhotoData}
            />
          </div>
          <br />
          <div className="form">
            <label htmlFor="url">URL</label>
            <br />
            <input
              type="url"
              placeholder="Enter photo url..."
              name="url"
              value={photo.url}
              onChange={setPhotoData}
            />
          </div>
        </div>
        <div className="save">
          <button className="btn btn-success">Save</button>
        </div>
      </div>
    </>
  );
};

export default EditPhoto;

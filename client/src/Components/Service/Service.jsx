import React from "react";
import "./Service.css";
import { useNavigate } from "react-router-dom";

const Service = () => {
  const history = useNavigate();

  return (
    <>
      <div className="service">
        <div className="show"></div>
        <div className="edit">
          <div className="box" onClick={() => history("/editService")}>
            <i class="fa-solid fa-plus"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;

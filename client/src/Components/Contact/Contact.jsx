import React from "react";
import "./Contact.css";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const history = useNavigate();

  return (
    <>
      <div className="contact">
        <div className="edit">
          <div className="show"></div>
          <div className="contactEdit">
            <div
              className="box"
              onClick={() => {
                history("/editContact");
              }}
            >
              <i className="fa-regular fa-plus"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

import React from "react";
import { login } from "../utils/near";
import { Button } from "react-bootstrap";
import "../util/cover.css";

const Cover = () => {
  return (
    <div
      className="d-flex justify-content-center flex-column text-center "
      style={{ background: "#ffffff", minHeight: "100vh"    background-image: url("C:\Users\pc\Documents\farm-fronted\src\asset\background.jpg");
      background-size: 1080px 720px;
      background-repeat: no-repeat;
      background-position: 0px 0px;  }}
    >
      <div className="mt-auto text-dark mb-5">
        <div
          className=" ratio ratio-1x1 mx-auto mb-2"
          style={{ maxWidth: "320px" }}
        >
         
        </div>
        <h1>We are fruitfull</h1>
      
        <Button
          onClick={login}
          variant="outline-dark"
          className="rounded-pill px-3 mt-3"
        >
          Farmer
        </Button>
      </div>
    </div>
  );
};

export default Cover;

import React from "react";
import { login } from "../utils/near";
import { Button } from "react-bootstrap";
import "../util/cover.css";

const Cover = () => {
  return (
    <div
      className="d-flex justify-content-center flex-column text-center "
      style={{ background: "#ffffff", minHeight: "100vh" }}
    >
      <div className="mt-auto text-dark mb-5">
        <div
          className=" ratio ratio-1x1 mx-auto mb-2"
          style={{ maxWidth: "320px" }}
        >
         
        </div>
        <h1>We are fruitfull</h1>
        <p></p>
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

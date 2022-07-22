import React from "react";
import { login } from "../utils/near";
import { Button } from "react-bootstrap";
//import "../util/cover.css";

const Cover = () => {
  return (
    
    <div className="text-center margin-20px container">
        <h1>We are fruitfull</h1>
      
        <Button
          onClick={login}
          variant="outline-dark"
          className="rounded-pill px-3 mt-3"
        >
          Farmer
        </Button>
        </div>
     
  );
};

export default Cover;

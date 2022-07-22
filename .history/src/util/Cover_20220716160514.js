import React from "react";
import { login } from "../utils/near";
import { Button } from "react-bootstrap";

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
          <img
            src="https://coloringhome.com/coloring/niE/yxj/niEyxjbKT.png"
            alt=""
          />
        </div>
        <h1>WE ARE FRUITFUL</h1>
        <p>Farmer connect to your wallet to continue.</p>
        <Button
          onClick={login}
          variant="outline-dark"
          className="rounded-pill px-3 mt-3"
        >
          Connect Wallet
        </Button>
      </div>
    </div>
  );
};

export default Cover;

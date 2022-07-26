import React from "react";
import { login } from "../utils/near";
import Background from "../asset/background.jpg";
import { Button, Dropdown, Spinner } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";

const Cover = () => {
  return (

    <div
      className="d-flex justify-content-center flex-column text-center "
      style={{ backgroundImage: "url(" + Background + ")", minHeight: "100vh" }}
    >
     

      <div classNames="mt-auto text-dark mb-5">
        <div
          classNames=" ratio ratio-1x1 mx-auto mb-2"
          style={{ maxWidth: "320px" }}
        >
          
        </div>
        <h1>WE ARE FRUITFUL</h1>
        <p> connect to your wallet to continue.</p>
        

         <Dropdown>
          <DropdownToggle
          variant="dark"
          margin="2rem"
          className="d-flex align-items-center border rounded-pill py-1 "
          >
          
              <>
                 <span className="ms-1"> Connect Wallet</span>
              </>
             
          </DropdownToggle>
          <Dropdown.Menu className="shadow-lg border-0">
            <Dropdown.Item>
              
            <Button
          onClick={login}
          variant="outline-dark"
          className="rounded-pill px-3 mt-3"
        >
          Farmer Connect
        </Button>

            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>

            <Button
          onClick={login}
          variant="outline-dark"
          className="rounded-pill px-3 mt-3"
        >
          Buyer Connect
        </Button>

            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      </div>
    </div>
  );
};

export default Cover;

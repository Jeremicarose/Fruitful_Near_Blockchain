import React from "react";
import { logout } from "../util/near";
import { Dropdown, Stack, Spinner } from "react-bootstrap";

const Wallet = ({ address, amount }) => {
  if (address) {
    return (
      <>
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            //@ts-ignore
            align="end"
            id="dropdown-basic"
            className="d-flex align-items-center border rounded-pill py-1"
          >
            {amount ? (
              <>
                {amount} <span className="ms-1"> NEAR</span>
              </>
            ) : (
              <Spinner animation="border" size="sm" className="opacity-25" />
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu className="shadow-lg border-0">
            <Dropdown.Item
              href={`https://explorer.testnet.near.org/accounts/${address}`}
              target="_blank"
            >
              <Stack direction="horizontal" gap={2}>
                <i className="bi bi-person-circle fs-4" />
                <span className="font-monospace">{address}</span>
              </Stack>
            </Dropdown.Item>

            <Dropdown.Divider />
            <Dropdown.Item
              as="button"
              className="d-flex align-items-center"
              onClick={() => {
                logout();
              }}
            >
              <i className="bi bi-box-arrow-right me-2 fs-4" />
              Disconnect
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  }

  return null;
};

export default Wallet;
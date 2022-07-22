import React, { useCallback, useEffect, useState } from "react";
import Cover from "./util/Cover";
import { Container, Nav } from "react-bootstrap";
// import { Notification } from "./util/Notification";
import "./App.css";
import Wallet from "./util/wallet";
import {accountBalance} from "./utils/near";
import Navigation from "./components/Navigation";

function App() {
  const account = window.walletConnection.account();

  const [balance, setBalance] = useState("0");
  const getBalance = useCallback(async () => {
    if (account.accountId) {
      setBalance(await accountBalance());
    }
  });

  useEffect(() => {
    getBalance();
  }, [getBalance]);
  return (
    <>
      {/* <Notification /> */}
      <Navigation/>
      {account.accountId ? (
        <Container fluid="md">
          <Nav className="justify-content-end pt-3 pb-5">
            <Nav.Item>
              <Wallet address={account.accountId} amount={balance} />
            </Nav.Item>
          </Nav>
          <>
            {/* <main> */}
              {/* <Clothes />
            </main> */}
          </>
        </Container>
      ) : (
        <Cover />
      )}
    </>
  );
}
export default App;
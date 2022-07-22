import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Wallet from "./util/wallet";
import {  Nav } from "react-bootstrap";
import {accountBalance} from "./utils/near";

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
      <Nav className="justify-content-end pt-3 pb-5">
            <Nav.Item>
              <Wallet address={account.accountId} amount={balance} />
            </Nav.Item>
          </Nav>
    </>
  );
}

export default App;
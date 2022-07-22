import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Wallet from "./util/wallet";
import {  Nav } from "react-bootstrap";

function App() {
  const account = window.walletConnection.account();
  const [products, setProducts] = useState([]);
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
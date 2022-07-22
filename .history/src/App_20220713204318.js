import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { getProducts } from "./utils/marketplace";
import { login } from "./utils/near";

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
      {account.accountId ? (
        products.forEach((product) => console.log(product))
      ) : (
        <button onClick={login}>CONNECT WALLET</button>
      )}
    </>
  );
}

export default App;
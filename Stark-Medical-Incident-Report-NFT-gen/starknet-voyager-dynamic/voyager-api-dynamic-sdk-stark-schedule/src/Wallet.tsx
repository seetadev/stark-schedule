import React from "react";
import { useEmbeddedWallet } from "@dynamic-labs/sdk-react-core";

const Wallet = () => {
  const { createEmbeddedWallet, userHasEmbeddedWallet } = useEmbeddedWallet();

  const createWallet = async () => {
    try {
      if (!userHasEmbeddedWallet()) {
        const wallet = await createEmbeddedWallet();
        console.log(wallet);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <button onClick={() => createWallet()}>Create your wallet</button>
    </div>
  );
};

export default Wallet;

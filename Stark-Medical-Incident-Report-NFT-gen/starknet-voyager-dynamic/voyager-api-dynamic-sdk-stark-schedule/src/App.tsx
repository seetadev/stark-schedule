import "./App.css";
import React from "react";

import { SdkViewSectionType, SdkViewType } from "@dynamic-labs/sdk-api";

import {
  DynamicContextProvider,
  DynamicWidget,
  LocaleResource,
} from "@dynamic-labs/sdk-react-core";

import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { ZeroDevSmartWalletConnectors } from "@dynamic-labs/ethereum-aa";
import Transaction from "./Transaction.tsx";

const App = () => {
  const locale = {
    en: {
      dyn_widget: {
        connect: "Sign Up",
      },
      dyn_collect_user_data: {
        description: "Help us get to know you better!",
        fields: {
          alias: {
            label: "What should we call you?",
          },
        },
      },
    },
  };

  const viewOverrides = {
    type: SdkViewType.Login,
    sections: [
      {
        type: SdkViewSectionType.Email,
      },
    ],
  };

  const cssOverrides = `
    .account-control__name {
      font-size: 0;
    }

    .account-control__name:before {
      content: "Your wallet";
      font-size: 0.9rem;
    }
  `;

  return (
    <div className="app">
      <DynamicContextProvider
        settings={{
          environmentId: "4e598b41-f388-489b-a0b3-d24064b1d1ed",
          cssOverrides: cssOverrides,
          overrides: { views: [viewOverrides] },
          walletConnectors: [
            EthereumWalletConnectors,
            ZeroDevSmartWalletConnectors,
          ],
        }}
        locale={locale}
      >
        <DynamicWagmiConnector>
          <DynamicWidget innerButtonComponent={undefined} />
          <Transaction />
        </DynamicWagmiConnector>
      </DynamicContextProvider>
    </div>
  );
};

export default App;

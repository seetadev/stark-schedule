import React, { useState } from "react";
import {
  IonButton,
  IonButtons,
  //   IonChip,
  IonIcon,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useConnect, useDisconnect, useAccount } from "@starknet-react/core";
import { wallet, walletOutline, close } from "ionicons/icons";
// import { color } from "framer-motion";

const HeaderWallet: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, status } = useAccount();

  const isConnected = status === "connected" && address;

  const handleConnect = (connector: (typeof connectors)[number]) => {
    connect({ connector });
    setShowModal(false);
  };

  return (
    <>
      <IonButton
        color={isConnected ? "success" : "medium"}
        className="cursor-pointer"
        onClick={() => (isConnected ? disconnect() : setShowModal(true))}
      >
        <IonIcon icon={isConnected ? wallet : walletOutline} />
        {isConnected && (
          <IonLabel
            style={{
              fontSize: "12px",
              marginLeft: "2px",
            }}
          >{`${address.slice(0, 3)}...${address.slice(-4)}`}</IonLabel>
        )}
        {!isConnected && <small style={{ marginLeft: "2px" }}>Connect</small>}
      </IonButton>

      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Connect Wallet</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowModal(false)}>
                <IonIcon icon={close} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {connectors.map((connector) => (
              <IonItem
                key={connector.id}
                button
                onClick={() => handleConnect(connector)}
              >
                <IonIcon icon={wallet} slot="start" />
                <IonLabel>{connector.id}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};

export default HeaderWallet;

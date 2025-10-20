import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  // IonBadge,
  IonChip,
  IonLabel,
} from "@ionic/react";
import {
  // menuOutline,
  // notificationsOutline,
  flameOutline,
  diamondOutline,
} from "ionicons/icons";
import HeaderWallet from "./HeaderWallet";

interface HeaderProps {
  userName?: string;
  streakCount?: number;
  balance?: number;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  // userName = "User",
  streakCount = 0,
  balance = 0,
}: HeaderProps) => {
  //   const userInitials = userName.substring(0, 2).toUpperCase();

  return (
    <IonHeader className="io">
      <IonToolbar>
        <IonButtons slot="start" className="ion-margin-horizontal">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                height: "32px",
                width: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                backgroundColor: "var(--ion-color-primary)",
                color: "white",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              S
            </div>
            <IonTitle className="ion-hide-md-down">STRK Schedule</IonTitle>
          </div>
        </IonButtons>

        <IonButtons slot="end">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <div style={{ display: "flex" }}>
                <IonChip
                  outline={true}
                  style={{ height: "20px", fontSize: "12px" }}
                >
                  <IonIcon icon={flameOutline} style={{ fontSize: "12px" }} />
                  <IonLabel>{streakCount}</IonLabel>
                </IonChip>

                <IonChip
                  outline={true}
                  style={{ height: "20px", fontSize: "12px" }}
                >
                  <IonIcon icon={diamondOutline} style={{ fontSize: "12px" }} />
                  <IonLabel>{balance} STRK</IonLabel>
                </IonChip>
              </div>
            </div>

            <IonButton fill="clear" style={{ position: "relative" }}>
              <HeaderWallet />
            </IonButton>
          </div>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;

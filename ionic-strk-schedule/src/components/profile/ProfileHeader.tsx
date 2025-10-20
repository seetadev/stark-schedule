import {
  IonAvatar,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from "@ionic/react";
import { calendarOutline, personOutline } from "ionicons/icons";
import ProfileBadge from "./ProfileBadge";
import HeaderWallet from "../layout/HeaderWallet";
interface ProfileHeaderProps {
  handleEditProfile?: () => void; // Make it optional with ? or required without
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ handleEditProfile }) => {
  return (
    <IonGrid className="ion-no-padding ion-margin-bottom">
      <IonRow className="" style={{ gap: "16px" }}>
        <IonCol size="12" sizeMd="auto" className="ion-text-center">
          <IonAvatar
            style={{
              width: "96px",
              height: "96px",
              margin: "0 auto 16px auto",
              border: "4px solid var(--ion-color-light)",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "var(--ion-color-primary)",
                display: "flex",
                borderRadius: "50%",

                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "24px",
              }}
            >
              JD
            </div>
          </IonAvatar>
        </IonCol>
        <IonCol
          size="12"
          sizeMd="auto"
          className="ion-text-center ion-text-md-start"
        >
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              margin: "0 0 4px 0",
            }}
          >
            User
          </h1>
          <IonText
            color="medium"
            style={{ display: "block", marginBottom: "12px" }}
          >
            user@gmail.com
          </IonText>
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginBottom: "16px",
              justifyContent: "center", // Default for mobile
            }}
            className="ion-text-center ion-text-md-start"
          >
            <ProfileBadge icon={calendarOutline} text="Member since May 2024" />
            <ProfileBadge icon={personOutline} text="Silver Tier" />
          </div>

          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              justifyContent: "center", // Default for mobile
            }}
            className="ion-text-center ion-text-md-start"
          >
            <IonButton size="small" onClick={handleEditProfile}>
              Edit Profile
            </IonButton>
            <HeaderWallet />
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default ProfileHeader;

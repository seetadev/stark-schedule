import { useState } from "react";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonText,
} from "@ionic/react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileNavigation from "@/components/profile/ProfileNavigation";
import ProfileInfoTab from "@/components/profile/tabs/ProfileInfoTab";
import AccountSettingsTab from "@/components/profile/tabs/AccountSettingsTab";
import HealthRecordsTab from "@/components/profile/tabs/HealthRecordsTab";
import Web3WalletTab from "@/components/profile/tabs/Web3WalletTab";

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const [isEditing, setIsEditing] = useState(false);
  const handleEditProfile = () => {
    setIsEditing(!isEditing);
    setActiveTab("profile");
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonGrid style={{ maxWidth: "1024px", margin: "0 auto" }}>
          {/* Profile Header */}
          <ProfileHeader handleEditProfile={handleEditProfile} />

          {/* Profile Content */}
          <IonRow>
            {/* Navigation Sidebar */}
            <IonCol
              size="12"
              sizeMd="4"
              sizeLg="3"
              className="ion-margin-bottom"
            >
              <ProfileNavigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </IonCol>

            {/* Tab Content */}
            <IonCol size="12" sizeMd="8" sizeLg="9">
              {activeTab === "profile" && (
                <ProfileInfoTab
                  isEditing={isEditing}
                  setEditing={() => setIsEditing(false)}
                />
              )}
              {activeTab === "settings" && <AccountSettingsTab />}
              {activeTab === "records" && <HealthRecordsTab />}
              {activeTab === "wallet" && <Web3WalletTab />}

              {/* Placeholder cards for other tabs */}
              {activeTab === "privacy" && (
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Privacy & Security</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonText color="medium">
                      Privacy and security settings will be implemented in a
                      future update.
                    </IonText>
                  </IonCardContent>
                </IonCard>
              )}

              {activeTab === "notifications" && (
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Notifications</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonText color="medium">
                      Notification settings will be implemented in a future
                      update.
                    </IonText>
                  </IonCardContent>
                </IonCard>
              )}

              {activeTab === "terms" && (
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Terms & Policies</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonText color="medium">
                      Terms and policies information will be implemented in a
                      future update.
                    </IonText>
                  </IonCardContent>
                </IonCard>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;

import { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonList,
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/react";
import {
  personOutline,
  settingsOutline,
  lockClosedOutline,
  notificationsOutline,
  listOutline,
  shieldOutline,
  documentTextOutline,
  logOutOutline,
  menuOutline,
  chevronDownOutline,
} from "ionicons/icons";
import NavItem from "./NavItem";
import { useAuthContext } from "@/auth/useAuthContext";

interface ProfileNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProfileNavigation = ({
  activeTab,
  setActiveTab,
}: ProfileNavigationProps) => {
  const [showFullMenu, setShowFullMenu] = useState(false);
  const { logout } = useAuthContext();
  // Map tab keys to display headings
  const tabHeadings: Record<string, string> = {
    profile: "Profile Information",
    settings: "Account Settings",
    privacy: "Privacy & Security",
    notifications: "Notifications",
    records: "Health Records",
    wallet: "Web3 Wallet",
    terms: "Terms & Policies",
  };

  // Map tab keys to their corresponding icons
  const tabIcons: Record<string, string> = {
    profile: personOutline,
    settings: settingsOutline,
    privacy: lockClosedOutline,
    notifications: notificationsOutline,
    records: listOutline,
    wallet: shieldOutline,
    terms: documentTextOutline,
  };

  const handleLogout = () => {
    console.log("Logging out...");
    logout();
  };

  return (
    <IonCard className="ion-no-margin">
      <IonCardContent className="ion-no-padding">
        {/* Mobile Navigation (Collapsible) */}
        <div className="ion-hide-md-up">
          <IonItem
            button
            onClick={() => setShowFullMenu(!showFullMenu)}
            lines="none"
            detail={false}
          >
            {/* Show the icon corresponding to the active tab */}
            <IonIcon icon={tabIcons[activeTab] || menuOutline} slot="start" />
            <IonLabel>{tabHeadings[activeTab]}</IonLabel>
            <IonIcon
              icon={chevronDownOutline}
              slot="end"
              style={{
                transform: showFullMenu ? "rotate(180deg)" : "rotate(0)",
                transition: "transform 0.2s ease",
              }}
            />
          </IonItem>

          {showFullMenu && (
            <IonList lines="none" style={{ padding: "0" }}>
              <NavItem
                icon={personOutline}
                label="Profile Information"
                active={activeTab === "profile"}
                onClick={() => {
                  setActiveTab("profile");
                  setShowFullMenu(false); // Close menu after selection
                }}
              />
              <NavItem
                icon={settingsOutline}
                label="Account Settings"
                active={activeTab === "settings"}
                onClick={() => {
                  setActiveTab("settings");
                  setShowFullMenu(false);
                }}
              />
              <NavItem
                icon={lockClosedOutline}
                label="Privacy & Security"
                active={activeTab === "privacy"}
                onClick={() => {
                  setActiveTab("privacy");
                  setShowFullMenu(false);
                }}
              />
              <NavItem
                icon={notificationsOutline}
                label="Notifications"
                active={activeTab === "notifications"}
                onClick={() => {
                  setActiveTab("notifications");
                  setShowFullMenu(false);
                }}
              />
              <NavItem
                icon={listOutline}
                label="Health Records"
                active={activeTab === "records"}
                onClick={() => {
                  setActiveTab("records");
                  setShowFullMenu(false);
                }}
              />
              <NavItem
                icon={shieldOutline}
                label="Web3 Wallet"
                active={activeTab === "wallet"}
                onClick={() => {
                  setActiveTab("wallet");
                  setShowFullMenu(false);
                }}
              />
              <NavItem
                icon={documentTextOutline}
                label="Terms & Policies"
                active={activeTab === "terms"}
                onClick={() => {
                  setActiveTab("terms");
                  setShowFullMenu(false);
                }}
              />
              <NavItem
                icon={logOutOutline}
                label="Log Out"
                active={false}
                onClick={handleLogout}
                danger
              />
            </IonList>
          )}
        </div>

        {/* Desktop Navigation (Always visible) */}
        <div className="ion-hide-md-down" style={{ width: "100%" }}>
          <IonList lines="none" style={{ padding: "0" }}>
            <NavItem
              icon={personOutline}
              label="Profile Information"
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
            />
            <NavItem
              icon={settingsOutline}
              label="Account Settings"
              active={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
            />
            <NavItem
              icon={lockClosedOutline}
              label="Privacy & Security"
              active={activeTab === "privacy"}
              onClick={() => setActiveTab("privacy")}
            />
            <NavItem
              icon={notificationsOutline}
              label="Notifications"
              active={activeTab === "notifications"}
              onClick={() => setActiveTab("notifications")}
            />
            <NavItem
              icon={listOutline}
              label="Health Records"
              active={activeTab === "records"}
              onClick={() => setActiveTab("records")}
            />
            <NavItem
              icon={shieldOutline}
              label="Web3 Wallet"
              active={activeTab === "wallet"}
              onClick={() => setActiveTab("wallet")}
            />
            <NavItem
              icon={documentTextOutline}
              label="Terms & Policies"
              active={activeTab === "terms"}
              onClick={() => setActiveTab("terms")}
            />
            <NavItem
              icon={logOutOutline}
              label="Log Out"
              active={false}
              onClick={handleLogout}
              danger
            />
          </IonList>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default ProfileNavigation;

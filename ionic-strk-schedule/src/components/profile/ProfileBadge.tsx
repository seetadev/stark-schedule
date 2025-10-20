import { IonChip, IonIcon, IonLabel } from "@ionic/react";

interface BadgeProps {
  icon: string; // Change type to string instead of React.ReactNode
  text: string;
}

const ProfileBadge = ({ icon, text }: BadgeProps) => {
  return (
    <IonChip
      style={{
        backgroundColor: "var(--ion-color-light)",
        color: "var(--ion-color-medium)",
        fontSize: "12px",
        height: "24px",
      }}
    >
      <IonIcon aria-hidden="true" icon={icon} />
      <IonLabel>{text}</IonLabel>
    </IonChip>
  );
};

export default ProfileBadge;

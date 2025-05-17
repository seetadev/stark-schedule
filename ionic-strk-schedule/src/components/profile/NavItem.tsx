import { IonItem, IonIcon, IonLabel } from "@ionic/react";

interface NavItemProps {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
  danger?: boolean;
}

const NavItem = ({ icon, label, active, onClick, danger }: NavItemProps) => {
  const getColor = () => {
    if (active) return "primary";
    if (danger) return "danger";
    return "medium";
  };

  return (
    <IonItem
      button
      detail={false}
      lines="none"
      color={active ? "primary-light" : "none"}
      onClick={onClick}
      style={{
        borderRadius: "8px",
        margin: "4px 0",
        "--background-activated": active
          ? "var(--ion-color-primary-tint)"
          : "var(--ion-color-light)",
        "--color": danger
          ? "var(--ion-color-danger)"
          : active
          ? "var(--ion-color-primary)"
          : "var(--ion-color-medium)",
      }}
    >
      <IonIcon
        icon={icon || ""}
        color={getColor()}
        slot="start"
        style={{ fontSize: "18px" }}
      />
      <IonLabel style={{ fontSize: "14px" }}>{label}</IonLabel>
    </IonItem>
  );
};

export default NavItem;

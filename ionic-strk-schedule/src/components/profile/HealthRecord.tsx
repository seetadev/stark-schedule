import { IonItem, IonLabel, IonButton, IonText } from "@ionic/react";

interface HealthRecordProps {
  title: string;
  date: string;
  details: string;
}

const HealthRecord = ({ title, date, details }: HealthRecordProps) => {
  return (
    <IonItem
      lines="full"
      style={{
        margin: "8px 0",
        borderRadius: "8px",
        border: "1px solid var(--ion-color-light-shade)",
        "--background": "var(--ion-color-light)",
      }}
    >
      <IonLabel>
        <h2 style={{ fontWeight: "500", marginBottom: "4px" }}>{title}</h2>
        <IonText color="medium" style={{ fontSize: "14px" }}>
          <p>{date}</p>
        </IonText>
        <IonText style={{ fontSize: "14px", marginTop: "4px" }}>
          <p>{details}</p>
        </IonText>
      </IonLabel>
      <IonButton fill="clear" size="small" slot="end">
        Edit
      </IonButton>
    </IonItem>
  );
};

export default HealthRecord;

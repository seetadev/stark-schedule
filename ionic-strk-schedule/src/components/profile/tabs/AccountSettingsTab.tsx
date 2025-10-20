import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonList,
} from "@ionic/react";

const AccountSettingsTab: React.FC = () => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Account Settings</IonCardTitle>
        <IonCardSubtitle>Customize your account preferences</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          <IonItem>
            <IonLabel>Language</IonLabel>
            <IonSelect placeholder="Select language" value="en">
              <IonSelectOption value="en">English</IonSelectOption>
              <IonSelectOption value="es">Spanish</IonSelectOption>
              <IonSelectOption value="fr">French</IonSelectOption>
              <IonSelectOption value="de">German</IonSelectOption>
              <IonSelectOption value="zh">Chinese</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Timezone</IonLabel>
            <IonSelect placeholder="Select timezone" value="america-new_york">
              <IonSelectOption value="america-new_york">
                America/New York
              </IonSelectOption>
              <IonSelectOption value="america-los_angeles">
                America/Los Angeles
              </IonSelectOption>
              <IonSelectOption value="europe-london">
                Europe/London
              </IonSelectOption>
              <IonSelectOption value="europe-paris">
                Europe/Paris
              </IonSelectOption>
              <IonSelectOption value="asia-tokyo">Asia/Tokyo</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Blood Glucose Unit</IonLabel>
            <IonSelect placeholder="Select unit" value="mg/dl">
              <IonSelectOption value="mg/dl">mg/dL</IonSelectOption>
              <IonSelectOption value="mmol/l">mmol/L</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Weight Unit</IonLabel>
            <IonSelect placeholder="Select unit" value="lbs">
              <IonSelectOption value="lbs">lbs</IonSelectOption>
              <IonSelectOption value="kg">kg</IonSelectOption>
            </IonSelect>
          </IonItem>

          <div className="ion-padding-top ion-text-end">
            <IonButton color="primary">Save Preferences</IonButton>
          </div>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default AccountSettingsTab;

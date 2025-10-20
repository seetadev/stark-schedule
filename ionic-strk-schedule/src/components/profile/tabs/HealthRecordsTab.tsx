import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  useIonRouter,
} from "@ionic/react";
import HealthRecord from "../HealthRecord"; // Reuse as-is or convert separately

const HealthRecordsTab: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Health Records</IonCardTitle>
        <IonCardSubtitle>
          Manage your health data and medical records
        </IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonList className="ion-padding-vertical">
          {/* --- Medical History Section --- */}
          <IonCard className="ion-margin-vertical">
            <IonItem lines="full">
              <IonLabel className="ion-text-wrap">
                <strong>Medical History</strong>
              </IonLabel>
              <IonButton
                size="small"
                fill="outline"
                slot="end"
                onClick={() => router.push("/medical-form")}
              >
                Add Record
              </IonButton>
            </IonItem>
            <IonCardContent>
              <HealthRecord
                title="Type 2 Diabetes"
                date="Diagnosed: Jan 2020"
                details="HbA1c at diagnosis: 8.2%"
              />
              <HealthRecord
                title="Hypertension"
                date="Diagnosed: Mar 2021"
                details="Well-controlled with medication"
              />
              <HealthRecord
                title="Appendectomy"
                date="Procedure: Sep 2015"
                details="Laparoscopic procedure, no complications"
              />
            </IonCardContent>
          </IonCard>

          {/* --- Medications Section --- */}
          <IonCard className="ion-margin-vertical">
            <IonItem lines="full">
              <IonLabel className="ion-text-wrap">
                <strong>Medications</strong>
              </IonLabel>
              <IonButton size="small" fill="outline" slot="end">
                Add Medication
              </IonButton>
            </IonItem>
            <IonCardContent>
              <HealthRecord
                title="Metformin 500mg"
                date="Started: Feb 2020"
                details="Take twice daily with meals"
              />
              <HealthRecord
                title="Lisinopril 10mg"
                date="Started: Mar 2021"
                details="Take once daily in the morning"
              />
              <HealthRecord
                title="Atorvastatin 20mg"
                date="Started: Apr 2021"
                details="Take once daily in the evening"
              />
            </IonCardContent>
          </IonCard>

          {/* --- Allergies Section --- */}
          <IonCard className="ion-margin-vertical">
            <IonItem lines="full">
              <IonLabel className="ion-text-wrap">
                <strong>Allergies</strong>
              </IonLabel>
              <IonButton size="small" fill="outline" slot="end">
                Add Allergy
              </IonButton>
            </IonItem>
            <IonCardContent>
              <HealthRecord
                title="Penicillin"
                date="Reported: Jan 2010"
                details="Causes skin rash and hives"
              />
              <HealthRecord
                title="Sulfa Drugs"
                date="Reported: Mar 2015"
                details="Causes difficulty breathing"
              />
            </IonCardContent>
          </IonCard>
        </IonList>

        {/* Footer Buttons */}
        <div className="ion-padding-top ion-text-end ion-justify-content-between ion-flex">
          <IonButton fill="outline">Export Records</IonButton>
          <IonButton color="primary">Convert to NFT</IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default HealthRecordsTab;

import { Shield, FileText, Award, Users } from "lucide-react";
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
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";

const Web3WalletTab: React.FC = () => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Web3 Wallet Integration</IonCardTitle>
        <IonCardSubtitle>
          Manage your blockchain wallet and Web3 settings
        </IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonGrid className="ion-padding-vertical">
          {/* Connected Wallet */}
          <IonRow>
            <IonCol size="12">
              <div
                className="p-4 border rounded ion-padding ion-margin-bottom"
                style={{ background: "#f9fafb" }}
              >
                <h3 className="ion-margin-bottom font-medium">
                  Connected Wallet
                </h3>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full border">
                      <Shield size={20} className="text-health-primary" />
                    </div>
                    <div>
                      <p className="font-mono text-sm">0x71C...F3d2</p>
                      <p className="text-sm text-medium ion-text-color-medium">
                        Starknet Wallet
                      </p>
                    </div>
                  </div>
                  <IonButton fill="outline" size="small">
                    Disconnect
                  </IonButton>
                </div>
              </div>
            </IonCol>
          </IonRow>

          {/* Info Cards */}
          {[
            {
              icon: <FileText size={18} className="text-blue-600" />,
              title: "Medical Records NFTs",
              subtitle: "3 NFTs owned",
              bg: "bg-blue-100",
              buttonText: "View",
            },
            {
              icon: <Award size={18} className="text-green-600" />,
              title: "STRK Token Balance",
              subtitle: "250 STRK available",
              bg: "bg-green-100",
              buttonText: "Manage",
            },
            {
              icon: <Users size={18} className="text-purple-600" />,
              title: "DAO Participation",
              subtitle: "Voting power: 250 STRK",
              bg: "bg-purple-100",
              buttonText: "View",
            },
          ].map(({ icon, title, subtitle, bg, buttonText }, idx) => (
            <IonRow key={idx} className="ion-margin-bottom">
              <IonCol size="12">
                <div className="flex justify-between items-center p-3 bg-white border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${bg}`}>{icon}</div>
                    <div>
                      <h3 className="font-medium">{title}</h3>
                      <p className="text-sm text-gray-500">{subtitle}</p>
                    </div>
                  </div>
                  <IonButton fill="outline" size="small">
                    {buttonText}
                  </IonButton>
                </div>
              </IonCol>
            </IonRow>
          ))}

          {/* Data Sharing Preferences */}
          <IonRow className="ion-margin-bottom">
            <IonCol size="12">
              <IonItem lines="none">
                <IonLabel position="stacked">Data Sharing Preferences</IonLabel>
                <IonSelect placeholder="Select preference" value="selective">
                  <IonSelectOption value="selective">
                    Share selected data with doctors
                  </IonSelectOption>
                  <IonSelectOption value="all">
                    Share all data with healthcare providers
                  </IonSelectOption>
                  <IonSelectOption value="anonymous">
                    Share anonymized data for research
                  </IonSelectOption>
                  <IonSelectOption value="none">
                    Don't share any data
                  </IonSelectOption>
                </IonSelect>
              </IonItem>
              <p className="text-xs text-gray-500 ion-margin-start ion-margin-top">
                Data sharing is controlled via blockchain smart contracts for
                transparency
              </p>
            </IonCol>
          </IonRow>

          {/* Save Button */}
          <IonRow>
            <IonCol size="12" className="ion-text-end">
              <IonButton className="bg-health-primary hover:bg-health-primary/90">
                Save Web3 Settings
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default Web3WalletTab;

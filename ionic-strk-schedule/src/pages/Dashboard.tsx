import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonSegment,
  IonSegmentButton,
  IonProgressBar,
  IonList,
  IonSkeletonText,
} from "@ionic/react";
import {
  pulse as activityIcon,
  clipboard,
  calendar as calendarIcon,
  restaurant as utensilsIcon,
  medkit as pillIcon,
} from "ionicons/icons";
import Header from "@/components/layout/Header";
import { useAccount } from "@starknet-react/core";
import {
  useGetBloodSugarReadings,
  useGetHbReadings,
  useGetWeight,
  useGetWeightUnit,
} from "@/hooks/contractRead";

const Dashboard: React.FC = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("all");

  // Get user's wallet address
  const { address } = useAccount();

  // Fetch health metrics from blockchain
  const {
    readings: bloodSugarData,
    isLoading: bloodSugarLoading,
    isError: bloodSugarError,
  } = useGetBloodSugarReadings({ accountAddress: address });

  const {
    readings: hba1cData,
    isLoading: hba1cLoading,
    isError: hba1cError,
  } = useGetHbReadings({ accountAddress: address });

  const {
    weight: weightData,
    isLoading: weightLoading,
    isError: weightError,
  } = useGetWeight({ accountAddress: address });

  const { unit: weightUnitData } = useGetWeightUnit({
    accountAddress: address,
  });

  // State to store formatted health data
  const [healthMetrics, setHealthMetrics] = useState({
    bloodSugar: { value: "0", status: "normal", change: "0" },
    hba1c: { value: "0", status: "normal", change: "0" },
    weight: { value: "0", unit: "kg", status: "normal", change: "0" },
    healthScore: { value: "0", status: "normal", change: "0" },
  });

  // Process data when it arrives from blockchain
  useEffect(() => {
    // Process blood sugar data
    if (bloodSugarData && !bloodSugarLoading) {
      const bloodSugarValue = (
        parseInt(bloodSugarData.toString()) / 10
      ).toFixed(1);
      // Determine status based on blood sugar ranges
      let status = "normal";
      if (parseInt(bloodSugarValue) < 70) status = "danger";
      else if (parseInt(bloodSugarValue) > 180) status = "warning";
      else if (
        parseInt(bloodSugarValue) > 80 &&
        parseInt(bloodSugarValue) < 120
      )
        status = "good";

      setHealthMetrics((prev) => ({
        ...prev,
        bloodSugar: {
          value: bloodSugarValue,
          status,
          change: "-5", // This would ideally be calculated from historical data
        },
      }));
    }

    // Process HbA1c data
    if (hba1cData && !hba1cLoading) {
      const hba1cValue = (parseInt(hba1cData.toString()) / 10).toFixed(1);
      // Determine status based on HbA1c ranges
      let status = "normal";
      if (parseFloat(hba1cValue) < 5.7) status = "good";
      else if (parseFloat(hba1cValue) >= 5.7 && parseFloat(hba1cValue) < 6.5)
        status = "normal";
      else if (parseFloat(hba1cValue) >= 6.5) status = "warning";

      setHealthMetrics((prev) => ({
        ...prev,
        hba1c: {
          value: hba1cValue,
          status,
          change: "-0.3", // Ideally calculated from historical data
        },
      }));
    }

    // Process weight data
    if (weightData && !weightLoading) {
      let weightValue = (parseInt(weightData.toString()) / 10).toFixed(1);
      let unit = "kg";

      // Convert to lbs if that's the user's preference
      if (weightUnitData && weightUnitData.toString().includes("lbs")) {
        weightValue = (parseFloat(weightValue) * 2.20462).toFixed(1);
        unit = "lbs";
      }

      setHealthMetrics((prev) => ({
        ...prev,
        weight: {
          value: weightValue,
          unit,
          status: "normal", // This would be calculated based on BMI, etc.
          change: "-2.5", // Ideally calculated from historical data
        },
      }));
    }

    // Calculate health score (simplified example)
    if (bloodSugarData && hba1cData && weightData) {
      // This is a simplified algorithm - in a real app you'd use a more sophisticated approach
      const bloodSugarValue = parseInt(bloodSugarData.toString()) / 10;
      const hba1cValue = parseInt(hba1cData.toString()) / 10;

      let bloodSugarScore = 0;
      if (bloodSugarValue >= 70 && bloodSugarValue <= 180) {
        bloodSugarScore =
          30 - Math.min(30, Math.abs(bloodSugarValue - 100) / 3);
      }

      let hba1cScore = 0;
      if (hba1cValue <= 7) {
        hba1cScore = 30 - (hba1cValue - 5) * 15;
      }

      // Add other metrics for a total score out of 100
      const healthScore = Math.round(bloodSugarScore + hba1cScore + 25); // Other factors would contribute remaining points

      setHealthMetrics((prev) => ({
        ...prev,
        healthScore: {
          value: healthScore.toString(),
          status:
            healthScore >= 80
              ? "good"
              : healthScore >= 60
              ? "normal"
              : "warning",
          change: "+3", // Ideally calculated from historical data
        },
      }));
    }
  }, [
    bloodSugarData,
    hba1cData,
    weightData,
    weightUnitData,
    bloodSugarLoading,
    hba1cLoading,
    weightLoading,
  ]);

  return (
    <IonPage>
      <Header />

      <IonContent className="ion-padding">
        <h1
          style={{ fontSize: "24px", fontWeight: "bold", margin: "0 0 8px 0" }}
        >
          Your Health Dashboard
        </h1>
        <IonText color="medium">
          <p>Track your progress and manage your health</p>
        </IonText>

        {/* Health Metrics */}
        <IonGrid className="ion-margin-bottom">
          <IonRow>
            <IonCol size="6" sizeMd="3">
              {bloodSugarLoading ? (
                <LoadingMetricCard title="Blood Sugar" />
              ) : bloodSugarError ? (
                <ErrorMetricCard title="Blood Sugar" />
              ) : (
                <HealthMetricCard
                  title="Blood Sugar"
                  value={healthMetrics.bloodSugar.value}
                  unit="mg/dL"
                  status={
                    healthMetrics.bloodSugar.status as
                      | "normal"
                      | "good"
                      | "warning"
                      | "danger"
                  }
                  change={healthMetrics.bloodSugar.change}
                />
              )}
            </IonCol>
            <IonCol size="6" sizeMd="3">
              {hba1cLoading ? (
                <LoadingMetricCard title="HbA1c" />
              ) : hba1cError ? (
                <ErrorMetricCard title="HbA1c" />
              ) : (
                <HealthMetricCard
                  title="HbA1c"
                  value={healthMetrics.hba1c.value}
                  unit="%"
                  status={
                    healthMetrics.hba1c.status as
                      | "normal"
                      | "good"
                      | "warning"
                      | "danger"
                  }
                  change={healthMetrics.hba1c.change}
                />
              )}
            </IonCol>
            <IonCol size="6" sizeMd="3">
              {weightLoading ? (
                <LoadingMetricCard title="Weight" />
              ) : weightError ? (
                <ErrorMetricCard title="Weight" />
              ) : (
                <HealthMetricCard
                  title="Weight"
                  value={healthMetrics.weight.value}
                  unit={healthMetrics.weight.unit}
                  status={
                    healthMetrics.weight.status as
                      | "normal"
                      | "good"
                      | "warning"
                      | "danger"
                  }
                  change={healthMetrics.weight.change}
                />
              )}
            </IonCol>
            <IonCol size="6" sizeMd="3">
              <HealthMetricCard
                title="Health Score"
                value={healthMetrics.healthScore.value}
                unit="/100"
                status={
                  healthMetrics.healthScore.status as
                    | "normal"
                    | "good"
                    | "warning"
                    | "danger"
                }
                change={healthMetrics.healthScore.change}
              />
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Medications Summary */}
        <IonCard className="ion-margin-bottom">
          <IonItem lines="none">
            <IonLabel>
              <h2>Medication</h2>
            </IonLabel>
            <IonButton fill="clear" slot="end" size="small">
              View All
            </IonButton>
          </IonItem>

          <IonCardContent>
            <MedicationItem
              name="Metformin"
              dosage="500mg"
              time="8:00 AM"
              remaining={14}
              total={30}
            />
            <MedicationItem
              name="Gliclazide"
              dosage="80mg"
              time="6:00 PM"
              remaining={10}
              total={30}
            />
            <MedicationItem
              name="Insulin"
              dosage="10 units"
              time="7:30 PM"
              remaining={20}
              total={30}
            />
          </IonCardContent>
        </IonCard>

        {/* Activity Feed */}
        <div className="ion-margin-bottom">
          <IonItem lines="none" className="ion-margin-bottom">
            <IonLabel>
              <h2>Recent Activity</h2>
            </IonLabel>
          </IonItem>

          <IonSegment
            value={activeTab}
            onIonChange={(e) => setActiveTab(e.detail.value as string)}
          >
            <IonSegmentButton value="all">
              <IonLabel>All</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="appointments">
              <IonLabel>Appointments</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="meals">
              <IonLabel>Meals</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="medications">
              <IonLabel>Medications</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="readings">
              <IonLabel>Readings</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          <IonList className="ion-margin-top">
            {activeTab === "all" && (
              <>
                <ActivityItem
                  type="appointment"
                  title="Dr. Smith Appointment"
                  description="Annual checkup and bloodwork"
                  time="Tomorrow at 10:00 AM"
                  icon={clipboard}
                />
                <ActivityItem
                  type="meal"
                  title="Lunch Logged"
                  description="Grilled chicken salad, 450 calories"
                  time="Today at 1:30 PM"
                  icon={utensilsIcon}
                />
                <ActivityItem
                  type="medication"
                  title="Metformin Taken"
                  description="Morning dose completed"
                  time="Today at 8:15 AM"
                  icon={pillIcon}
                />
                <ActivityItem
                  type="exercise"
                  title="Walking"
                  description="30 minutes, 2500 steps"
                  time="Today at 5:30 PM"
                  icon={activityIcon}
                />
                <ActivityItem
                  type="reading"
                  title="Blood Sugar Reading"
                  description="105 mg/dL (In target range)"
                  time="Today at 9:00 AM"
                  icon={activityIcon}
                />
              </>
            )}

            {activeTab === "appointments" && (
              <>
                <ActivityItem
                  type="appointment"
                  title="Dr. Smith Appointment"
                  description="Annual checkup and bloodwork"
                  time="Tomorrow at 10:00 AM"
                  icon={clipboard}
                />
                <ActivityItem
                  type="appointment"
                  title="Nutritionist Meeting"
                  description="Diet plan review"
                  time="Friday at 2:00 PM"
                  icon={clipboard}
                />
              </>
            )}

            {activeTab === "meals" && (
              <>
                <ActivityItem
                  type="meal"
                  title="Lunch Logged"
                  description="Grilled chicken salad, 450 calories"
                  time="Today at 1:30 PM"
                  icon={utensilsIcon}
                />
                <ActivityItem
                  type="meal"
                  title="Breakfast Logged"
                  description="Oatmeal with berries, 320 calories"
                  time="Today at 7:45 AM"
                  icon={utensilsIcon}
                />
              </>
            )}

            {activeTab === "medications" && (
              <>
                <ActivityItem
                  type="medication"
                  title="Metformin Taken"
                  description="Morning dose completed"
                  time="Today at 8:15 AM"
                  icon={pillIcon}
                />
                <ActivityItem
                  type="medication"
                  title="Gliclazide Taken"
                  description="Evening dose completed"
                  time="Yesterday at 6:05 PM"
                  icon={pillIcon}
                />
              </>
            )}

            {activeTab === "readings" && (
              <>
                <ActivityItem
                  type="reading"
                  title="Blood Sugar Reading"
                  description="105 mg/dL (In target range)"
                  time="Today at 9:00 AM"
                  icon={activityIcon}
                />
                <ActivityItem
                  type="reading"
                  title="Blood Sugar Reading"
                  description="118 mg/dL (In target range)"
                  time="Yesterday at 9:15 AM"
                  icon={activityIcon}
                />
              </>
            )}
          </IonList>
        </div>

        {/* Upcoming Events Summary */}
        <IonCard>
          <IonItem lines="none">
            <IonLabel>
              <h2>Upcoming Events</h2>
            </IonLabel>
            <IonButton
              fill="clear"
              slot="end"
              size="small"
              onClick={() => history.push("/schedule")}
            >
              View Calendar
            </IonButton>
          </IonItem>

          <IonCardContent>
            <EventItem
              title="Dr. Smith Appointment"
              date="Tomorrow"
              time="10:00 AM"
              location="Downtown Medical Center"
              icon={calendarIcon}
            />
            <EventItem
              title="Blood Sugar Check"
              date="Today"
              time="6:00 PM"
              location="Home"
              icon={activityIcon}
            />
            <EventItem
              title="Pharmacy Pickup"
              date="Friday"
              time="3:30 PM"
              location="Main Street Pharmacy"
              icon={pillIcon}
            />
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

const LoadingMetricCard: React.FC<{ title: string }> = ({ title }) => {
  return (
    <IonCard className="ion-no-margin">
      <IonCardContent className="ion-padding-horizontal ion-padding-top">
        <IonText color="medium">
          <p>{title}</p>
        </IonText>
        <div className="ion-margin-top">
          <IonSkeletonText animated style={{ width: "70%", height: "24px" }} />
        </div>
        <IonSkeletonText animated style={{ width: "40%", height: "16px" }} />
      </IonCardContent>
    </IonCard>
  );
};

const ErrorMetricCard: React.FC<{ title: string }> = ({ title }) => {
  return (
    <IonCard className="ion-no-margin">
      <IonCardContent className="ion-padding-horizontal ion-padding-top">
        <IonText color="medium">
          <p>{title}</p>
        </IonText>
        <div className="ion-margin-top">
          <IonText color="danger">
            <span style={{ fontSize: "1rem" }}>Error loading data</span>
          </IonText>
        </div>
        <IonText color="medium">
          <p>Check connection</p>
        </IonText>
      </IonCardContent>
    </IonCard>
  );
};
// Component definitions for the sub-components:

interface HealthMetricCardProps {
  title: string;
  value: string;
  unit: string;
  status: "normal" | "good" | "warning" | "danger";
  change: string;
}

const HealthMetricCard: React.FC<HealthMetricCardProps> = ({
  title,
  value,
  unit,
  status,
  change,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "good":
        return "success";
      case "normal":
        return "primary";
      case "warning":
        return "warning";
      case "danger":
        return "danger";
      default:
        return "medium";
    }
  };

  return (
    <IonCard className="ion-no-margin">
      <IonCardContent className="ion-padding-horizontal ion-padding-top">
        <IonText color="medium">
          <p>{title}</p>
        </IonText>
        <div className="ion-margin-top">
          <IonText>
            <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              {value}
            </span>
            <span style={{ fontSize: "0.875rem", marginLeft: "4px" }}>
              {unit}
            </span>
          </IonText>
        </div>
        <IonText color={getStatusColor()}>
          <p>
            {change.startsWith("+") ? "↑" : "↓"} {change.replace(/[+-]/, "")}{" "}
            {status}
          </p>
        </IonText>
      </IonCardContent>
    </IonCard>
  );
};

interface MedicationItemProps {
  name: string;
  dosage: string;
  time: string;
  remaining: number;
  total: number;
}

const MedicationItem: React.FC<MedicationItemProps> = ({
  name,
  dosage,
  time,
  remaining,
  total,
}) => {
  const percentage = (remaining / total) * 100;

  return (
    <IonCard className="ion-margin-bottom">
      <IonCardContent>
        <div
          className="ion-justify-content-between"
          style={{ display: "flex" }}
        >
          <div>
            <IonText>
              <h3>{name}</h3>
            </IonText>
            <IonText color="medium">
              <p>
                {dosage} at {time}
              </p>
            </IonText>
          </div>
          <IonButton size="small">Take</IonButton>
        </div>

        <div className="ion-margin-top">
          <div
            className="ion-justify-content-between"
            style={{ display: "flex" }}
          >
            <IonText color="medium" style={{ fontSize: "0.75rem" }}>
              Remaining: {remaining} of {total}
            </IonText>
            <IonText
              color={percentage < 30 ? "danger" : "medium"}
              style={{ fontSize: "0.75rem" }}
            >
              {percentage.toFixed(0)}%
            </IonText>
          </div>
          <IonProgressBar
            value={percentage / 100}
            color={percentage < 30 ? "danger" : "primary"}
            style={{ height: "6px", marginTop: "4px" }}
          ></IonProgressBar>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

interface ActivityItemProps {
  type: "appointment" | "meal" | "medication" | "exercise" | "reading";
  title: string;
  description: string;
  time: string;
  icon: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  type,
  title,
  description,
  time,
  icon,
}) => {
  const getIconColor = () => {
    switch (type) {
      case "appointment":
        return "primary";
      case "meal":
        return "success";
      case "medication":
        return "tertiary";
      case "exercise":
        return "warning";
      case "reading":
        return "secondary";
      default:
        return "medium";
    }
  };

  return (
    <IonItem lines="full" detail={false} className="ion-margin-bottom">
      <IonIcon icon={icon} slot="start" color={getIconColor()} />
      <IonLabel>
        <h2>{title}</h2>
        <p>{description}</p>
        <IonText color="medium" style={{ fontSize: "0.75rem" }}>
          <p>{time}</p>
        </IonText>
      </IonLabel>
    </IonItem>
  );
};

interface EventItemProps {
  title: string;
  date: string;
  time: string;
  location: string;
  icon: string;
}

const EventItem: React.FC<EventItemProps> = ({
  title,
  date,
  time,
  location,
  icon,
}) => {
  return (
    <IonItem lines="full" className="ion-margin-bottom">
      <IonIcon icon={icon} slot="start" />
      <IonLabel>
        <h2>{title}</h2>
        <p>
          {date} at {time}
        </p>
        <IonText color="medium" style={{ fontSize: "0.75rem" }}>
          <p>{location}</p>
        </IonText>
      </IonLabel>
      <IonButton slot="end" size="small" fill="outline">
        Details
      </IonButton>
    </IonItem>
  );
};

export default Dashboard;

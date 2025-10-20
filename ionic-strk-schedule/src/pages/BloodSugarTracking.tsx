import { useState } from "react";
import { format } from "date-fns";
import {
  IonPage,
  // IonHeader,
  // IonToolbar,
  // IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  // IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol,
  IonSegment,
  IonSegmentButton,
  // IonDatetime,
  IonToast,
  IonText,
  useIonLoading,
} from "@ionic/react";
// import {
//   analyticsOutline,
//   documentTextOutline,
//   waterOutline,
//   scaleOutline,
//   calendarOutline,
// } from "ionicons/icons";

// Import Chart.js
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import {
  useUpdateBloodSugarReading,
  useUpdateHba1cReading,
  useUpdateWeight,
} from "@/hooks/contractWrite";
import { useAccount } from "@starknet-react/core";

// Register Chart.js components
ChartJS.register(...registerables);

// Sample data for demonstration
const sampleBloodSugarData = [
  {
    date: "2024-05-01",
    fasting: 120,
    preMeal: 110,
    postMeal: 160,
    bedtime: 140,
  },
  {
    date: "2024-05-02",
    fasting: 125,
    preMeal: 115,
    postMeal: 155,
    bedtime: 135,
  },
  {
    date: "2024-05-03",
    fasting: 118,
    preMeal: 108,
    postMeal: 162,
    bedtime: 142,
  },
  {
    date: "2024-05-04",
    fasting: 122,
    preMeal: 112,
    postMeal: 158,
    bedtime: 138,
  },
  {
    date: "2024-05-05",
    fasting: 121,
    preMeal: 111,
    postMeal: 159,
    bedtime: 139,
  },
  {
    date: "2024-05-06",
    fasting: 119,
    preMeal: 109,
    postMeal: 161,
    bedtime: 141,
  },
  {
    date: "2024-05-07",
    fasting: 123,
    preMeal: 113,
    postMeal: 157,
    bedtime: 137,
  },
  {
    date: "2024-05-08",
    fasting: 120,
    preMeal: 110,
    postMeal: 160,
    bedtime: 140,
  },
  {
    date: "2024-05-09",
    fasting: 117,
    preMeal: 107,
    postMeal: 163,
    bedtime: 143,
  },
  {
    date: "2024-05-10",
    fasting: 124,
    preMeal: 114,
    postMeal: 156,
    bedtime: 136,
  },
  {
    date: "2024-05-11",
    fasting: 122,
    preMeal: 112,
    postMeal: 158,
    bedtime: 138,
  },
  {
    date: "2024-05-12",
    fasting: 126,
    preMeal: 116,
    postMeal: 154,
    bedtime: 134,
  },
  {
    date: "2024-05-13",
    fasting: 121,
    preMeal: 111,
    postMeal: 159,
    bedtime: 139,
  },
  {
    date: "2024-05-14",
    fasting: 119,
    preMeal: 109,
    postMeal: 161,
    bedtime: 141,
  },
];

const sampleHbA1cData = [
  { date: "2024-01-15", level: 7.2 },
  { date: "2024-02-15", level: 7.0 },
  { date: "2024-03-15", level: 6.8 },
  { date: "2024-04-15", level: 6.7 },
  { date: "2024-05-15", level: 6.5 },
];

const sampleWeightData = [
  { date: "2024-01-15", weight: 85 },
  { date: "2024-02-15", weight: 84 },
  { date: "2024-03-15", weight: 82 },
  { date: "2024-04-15", weight: 81 },
  { date: "2024-05-15", weight: 80 },
];

const BloodSugarTracking: React.FC = () => {
  const [activeTab, setActiveTab] = useState("blood-sugar");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    title: "",
    message: "",
    color: "success",
  });

  const [bloodSugarForm, setBloodSugarForm] = useState({
    glucoseLevel: "",
    readingType: "fasting",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().split(" ")[0].substring(0, 5),
    notes: "",
  });

  const [hba1cForm, setHba1cForm] = useState({
    hba1cLevel: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const [weightForm, setWeightForm] = useState({
    weight: "",
    unit: "kg",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const [bloodSugarErrors, setBloodSugarErrors] = useState({
    glucoseLevel: "",
    readingType: "",
    date: "",
    time: "",
  });

  const [hba1cErrors, setHba1cErrors] = useState({
    hba1cLevel: "",
    date: "",
  });

  const [weightErrors, setWeightErrors] = useState({
    weight: "",
    unit: "",
    date: "",
  });

  const handleBloodSugarChange = (
    field: string,
    value: string | number | null
  ) => {
    setBloodSugarForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (bloodSugarErrors[field as keyof typeof bloodSugarErrors]) {
      setBloodSugarErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleHba1cChange = (field: string, value: string | number | null) => {
    setHba1cForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (hba1cErrors[field as keyof typeof hba1cErrors]) {
      setHba1cErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleWeightChange = (field: string, value: string | number | null) => {
    setWeightForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (weightErrors[field as keyof typeof weightErrors]) {
      setWeightErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateBloodSugarForm = () => {
    const errors = {
      glucoseLevel: "",
      readingType: "",
      date: "",
      time: "",
    };
    let isValid = true;

    if (!bloodSugarForm.glucoseLevel) {
      errors.glucoseLevel = "Blood sugar reading is required";
      isValid = false;
    }

    if (!bloodSugarForm.readingType) {
      errors.readingType = "Reading type is required";
      isValid = false;
    }

    if (!bloodSugarForm.date) {
      errors.date = "Date is required";
      isValid = false;
    }

    if (!bloodSugarForm.time) {
      errors.time = "Time is required";
      isValid = false;
    }

    setBloodSugarErrors(errors);
    return isValid;
  };

  const validateHba1cForm = () => {
    const errors = {
      hba1cLevel: "",
      date: "",
    };
    let isValid = true;

    if (!hba1cForm.hba1cLevel) {
      errors.hba1cLevel = "HbA1c level is required";
      isValid = false;
    }

    if (!hba1cForm.date) {
      errors.date = "Date is required";
      isValid = false;
    }

    setHba1cErrors(errors);
    return isValid;
  };
  const { updateBloodSugarReading } = useUpdateBloodSugarReading();
  const { updateHba1cReading } = useUpdateHba1cReading();
  const { updateWeight: updateWeightOnChain } = useUpdateWeight();
  const [present, dismiss] = useIonLoading();
  const { status } = useAccount();

  const validateWeightForm = () => {
    const errors = {
      weight: "",
      unit: "",
      date: "",
    };
    let isValid = true;

    if (!weightForm.weight) {
      errors.weight = "Weight is required";
      isValid = false;
    }

    if (!weightForm.unit) {
      errors.unit = "Unit is required";
      isValid = false;
    }

    if (!weightForm.date) {
      errors.date = "Date is required";
      isValid = false;
    }

    setWeightErrors(errors);
    return isValid;
  };

  const showSuccessToast = (title: string, message: string) => {
    setToastMessage({
      title,
      message,
      color: "success",
    });
    setShowToast(true);
  };

  const showErrorToast = (title: string, message: string) => {
    setToastMessage({
      title,
      message,
      color: "danger",
    });
    setShowToast(true);
  };

  const onSubmitBloodSugar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateBloodSugarForm()) {
      return;
    }

    // Check wallet connection
    if (status !== "connected") {
      showErrorToast("Not Connected", "Please connect your wallet first");
      return;
    }

    setIsSubmitting(true);

    try {
      // Show loading indicator
      await present({
        message: "Saving to blockchain...",
        spinner: "circular",
      });

      const glucoseValue = Math.round(
        parseFloat(bloodSugarForm.glucoseLevel) * 10
      );

      console.log("Sending blood sugar reading to contract:", glucoseValue);

      // Call contract method
      const response = await updateBloodSugarReading(glucoseValue);
      console.log("Transaction response:", response);

      dismiss();
      showSuccessToast(
        "Blood Sugar Reading Saved",
        `Your reading of ${bloodSugarForm.glucoseLevel} mg/dL (${bloodSugarForm.readingType}) has been recorded on the blockchain.`
      );

      // Reset the form
      setBloodSugarForm({
        glucoseLevel: "",
        readingType: "fasting",
        date: new Date().toISOString().split("T")[0],
        time: new Date().toTimeString().split(" ")[0].substring(0, 5),
        notes: "",
      });
    } catch (error) {
      dismiss();
      console.error("Error saving blood sugar reading:", error);
      showErrorToast(
        "Transaction Failed",
        error instanceof Error
          ? `Error: ${error.message}`
          : "There was an error saving your blood sugar reading."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitHbA1c = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateHba1cForm()) {
      return;
    }

    if (status !== "connected") {
      showErrorToast("Not Connected", "Please connect your wallet first");
      return;
    }

    setIsSubmitting(true);

    try {
      await present({
        message: "Saving to blockchain...",
        spinner: "circular",
      });

      const hba1cValue = Math.round(parseFloat(hba1cForm.hba1cLevel) * 10);

      console.log("Sending HbA1c reading to contract:", hba1cValue);

      const response = await updateHba1cReading(hba1cValue);
      console.log("Transaction response:", response);

      dismiss();
      showSuccessToast(
        "HbA1c Reading Saved",
        `Your HbA1c reading of ${hba1cForm.hba1cLevel}% has been recorded on the blockchain.`
      );

      setHba1cForm({
        hba1cLevel: "",
        date: new Date().toISOString().split("T")[0],
        notes: "",
      });
    } catch (error) {
      dismiss();
      console.error("Error saving HbA1c reading:", error);
      showErrorToast(
        "Transaction Failed",
        error instanceof Error
          ? `Error: ${error.message}`
          : "There was an error saving your HbA1c reading."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitWeight = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateWeightForm()) {
      return;
    }

    if (status !== "connected") {
      showErrorToast("Not Connected", "Please connect your wallet first");
      return;
    }

    setIsSubmitting(true);

    try {
      await present({
        message: "Saving to blockchain...",
        spinner: "circular",
      });

      let weightInKg = parseFloat(weightForm.weight);
      if (weightForm.unit === "lbs") {
        weightInKg = weightInKg * 0.45359237;
      }

      const weightValue = Math.round(weightInKg * 10);

      console.log("Sending weight reading to contract:", weightValue);

      const response = await updateWeightOnChain(weightValue);
      console.log("Transaction response:", response);

      dismiss();
      showSuccessToast(
        "Weight Reading Saved",
        `Your weight of ${weightForm.weight} ${weightForm.unit} has been recorded on the blockchain.`
      );

      setWeightForm({
        weight: "",
        unit: "kg",
        date: new Date().toISOString().split("T")[0],
        notes: "",
      });
    } catch (error) {
      dismiss();
      console.error("Error saving weight reading:", error);
      showErrorToast(
        "Transaction Failed",
        error instanceof Error
          ? `Error: ${error.message}`
          : "There was an error saving your weight reading."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, "MMM d");
  };

  const bloodSugarChartData = {
    labels: sampleBloodSugarData.map((item) => formatDate(item.date)),
    datasets: [
      {
        label: "Fasting",
        data: sampleBloodSugarData.map((item) => item.fasting),
        fill: false,
        backgroundColor: "#8884d8",
        borderColor: "#8884d8",
      },
      {
        label: "Pre-Meal",
        data: sampleBloodSugarData.map((item) => item.preMeal),
        fill: false,
        backgroundColor: "#82ca9d",
        borderColor: "#82ca9d",
      },
      {
        label: "Post-Meal",
        data: sampleBloodSugarData.map((item) => item.postMeal),
        fill: false,
        backgroundColor: "#ff7300",
        borderColor: "#ff7300",
      },
      {
        label: "Bedtime",
        data: sampleBloodSugarData.map((item) => item.bedtime),
        fill: false,
        backgroundColor: "#0088fe",
        borderColor: "#0088fe",
      },
    ],
  };

  const hba1cChartData = {
    labels: sampleHbA1cData.map((item) => formatDate(item.date)),
    datasets: [
      {
        label: "HbA1c",
        data: sampleHbA1cData.map((item) => item.level),
        fill: false,
        backgroundColor: "#8884d8",
        borderColor: "#8884d8",
      },
    ],
  };

  const weightChartData = {
    labels: sampleWeightData.map((item) => formatDate(item.date)),
    datasets: [
      {
        label: "Weight (kg)",
        data: sampleWeightData.map((item) => item.weight),
        fill: false,
        backgroundColor: "#82ca9d",
        borderColor: "#82ca9d",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 80,
        max: 180,
      },
    },
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonGrid style={{ maxWidth: "1024px", margin: "0 auto" }}>
          <IonRow>
            <IonCol>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  margin: "0 0 4px 0",
                }}
              >
                Vital Readings
              </h1>
              <IonText color="medium">
                Monitor your blood sugar, HbA1c, and weight
              </IonText>
            </IonCol>
          </IonRow>

          <IonRow className="ion-margin-top">
            <IonCol>
              <IonSegment
                value={activeTab}
                onIonChange={(e) => setActiveTab(e.detail.value as string)}
              >
                <IonSegmentButton value="blood-sugar">
                  <IonLabel>Blood Sugar</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="hba1c">
                  <IonLabel>HbA1c</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="weight">
                  <IonLabel>Weight</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonCol>
          </IonRow>

          {/* Blood Sugar Tab */}
          {activeTab === "blood-sugar" && (
            <div className="ion-margin-top">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Blood Sugar Readings</IonCardTitle>
                  <IonCardSubtitle>
                    Track your blood glucose levels over time
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <div style={{ height: "300px", width: "100%" }}>
                    <Line data={bloodSugarChartData} options={chartOptions} />
                  </div>
                </IonCardContent>
              </IonCard>

              <IonCard className="ion-margin-top">
                <IonCardHeader>
                  <IonCardTitle>Add New Blood Sugar Reading</IonCardTitle>
                  <IonCardSubtitle>
                    Enter your latest blood glucose measurement
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <form onSubmit={onSubmitBloodSugar}>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="12" sizeMd="6">
                          <IonItem
                            className={
                              bloodSugarErrors.glucoseLevel ? "ion-invalid" : ""
                            }
                          >
                            <IonLabel position="stacked">
                              Blood Sugar Level (mg/dL)
                            </IonLabel>
                            <IonInput
                              type="number"
                              placeholder="e.g., 120"
                              value={bloodSugarForm.glucoseLevel}
                              onIonChange={(e) =>
                                handleBloodSugarChange(
                                  "glucoseLevel",
                                  e.detail.value!
                                )
                              }
                            />
                            {bloodSugarErrors.glucoseLevel && (
                              <IonText
                                color="danger"
                                className="ion-padding-start"
                              >
                                <small>{bloodSugarErrors.glucoseLevel}</small>
                              </IonText>
                            )}
                          </IonItem>
                        </IonCol>
                        <IonCol size="12" sizeMd="6">
                          <IonItem
                            className={
                              bloodSugarErrors.readingType ? "ion-invalid" : ""
                            }
                          >
                            <IonLabel position="stacked">Reading Type</IonLabel>
                            <IonSelect
                              value={bloodSugarForm.readingType}
                              onIonChange={(e) =>
                                handleBloodSugarChange(
                                  "readingType",
                                  e.detail.value
                                )
                              }
                            >
                              <IonSelectOption value="fasting">
                                Fasting
                              </IonSelectOption>
                              <IonSelectOption value="pre-meal">
                                Before Meal
                              </IonSelectOption>
                              <IonSelectOption value="post-meal">
                                After Meal (2 hrs)
                              </IonSelectOption>
                              <IonSelectOption value="bedtime">
                                Bedtime
                              </IonSelectOption>
                              <IonSelectOption value="random">
                                Random
                              </IonSelectOption>
                            </IonSelect>
                            {bloodSugarErrors.readingType && (
                              <IonText
                                color="danger"
                                className="ion-padding-start"
                              >
                                <small>{bloodSugarErrors.readingType}</small>
                              </IonText>
                            )}
                          </IonItem>
                        </IonCol>
                      </IonRow>

                      <IonRow>
                        <IonCol size="12" sizeMd="6">
                          <IonItem
                            className={
                              bloodSugarErrors.date ? "ion-invalid" : ""
                            }
                          >
                            <IonLabel position="stacked">Date</IonLabel>
                            <IonInput
                              type="date"
                              value={bloodSugarForm.date}
                              onIonChange={(e) =>
                                handleBloodSugarChange("date", e.detail.value!)
                              }
                            />
                            {bloodSugarErrors.date && (
                              <IonText
                                color="danger"
                                className="ion-padding-start"
                              >
                                <small>{bloodSugarErrors.date}</small>
                              </IonText>
                            )}
                          </IonItem>
                        </IonCol>
                        <IonCol size="12" sizeMd="6">
                          <IonItem
                            className={
                              bloodSugarErrors.time ? "ion-invalid" : ""
                            }
                          >
                            <IonLabel position="stacked">Time</IonLabel>
                            <IonInput
                              type="time"
                              value={bloodSugarForm.time}
                              onIonChange={(e) =>
                                handleBloodSugarChange("time", e.detail.value!)
                              }
                            />
                            {bloodSugarErrors.time && (
                              <IonText
                                color="danger"
                                className="ion-padding-start"
                              >
                                <small>{bloodSugarErrors.time}</small>
                              </IonText>
                            )}
                          </IonItem>
                        </IonCol>
                      </IonRow>

                      <IonRow>
                        <IonCol>
                          <IonItem>
                            <IonLabel position="stacked">
                              Notes (Optional)
                            </IonLabel>
                            <IonTextarea
                              placeholder="Any relevant details about this reading..."
                              value={bloodSugarForm.notes}
                              onIonChange={(e) =>
                                handleBloodSugarChange("notes", e.detail.value!)
                              }
                              rows={3}
                            />
                          </IonItem>
                        </IonCol>
                      </IonRow>

                      <IonRow className="ion-margin-top">
                        <IonCol className="ion-text-end">
                          <IonButton type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Reading"}
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </form>
                </IonCardContent>
              </IonCard>
            </div>
          )}

          {/* HbA1c Tab */}
          {activeTab === "hba1c" && (
            <div className="ion-margin-top">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>HbA1c Readings</IonCardTitle>
                  <IonCardSubtitle>
                    Track your long-term blood glucose levels
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <div style={{ height: "300px", width: "100%" }}>
                    <Line
                      data={hba1cChartData}
                      options={{
                        ...chartOptions,
                        scales: {
                          y: {
                            min: 5,
                            max: 9,
                          },
                        },
                      }}
                    />
                  </div>
                </IonCardContent>
              </IonCard>

              <IonCard className="ion-margin-top">
                <IonCardHeader>
                  <IonCardTitle>Add New HbA1c Reading</IonCardTitle>
                  <IonCardSubtitle>
                    Enter your latest HbA1c test result
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <form onSubmit={onSubmitHbA1c}>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="12" sizeMd="6">
                          <IonItem
                            className={
                              hba1cErrors.hba1cLevel ? "ion-invalid" : ""
                            }
                          >
                            <IonLabel position="stacked">
                              HbA1c Level (%)
                            </IonLabel>
                            <IonInput
                              type="number"
                              step="0.1"
                              placeholder="e.g., 6.5"
                              value={hba1cForm.hba1cLevel}
                              onIonChange={(e) =>
                                handleHba1cChange("hba1cLevel", e.detail.value!)
                              }
                            />
                            {hba1cErrors.hba1cLevel && (
                              <IonText
                                color="danger"
                                className="ion-padding-start"
                              >
                                <small>{hba1cErrors.hba1cLevel}</small>
                              </IonText>
                            )}
                          </IonItem>
                        </IonCol>
                        <IonCol size="12" sizeMd="6">
                          <IonItem
                            className={hba1cErrors.date ? "ion-invalid" : ""}
                          >
                            <IonLabel position="stacked">Test Date</IonLabel>
                            <IonInput
                              type="date"
                              value={hba1cForm.date}
                              onIonChange={(e) =>
                                handleHba1cChange("date", e.detail.value!)
                              }
                            />
                            {hba1cErrors.date && (
                              <IonText
                                color="danger"
                                className="ion-padding-start"
                              >
                                <small>{hba1cErrors.date}</small>
                              </IonText>
                            )}
                          </IonItem>
                        </IonCol>
                      </IonRow>

                      <IonRow>
                        <IonCol>
                          <IonItem>
                            <IonLabel position="stacked">
                              Notes (Optional)
                            </IonLabel>
                            <IonTextarea
                              placeholder="Any relevant details about this test..."
                              value={hba1cForm.notes}
                              onIonChange={(e) =>
                                handleHba1cChange("notes", e.detail.value!)
                              }
                              rows={3}
                            />
                          </IonItem>
                        </IonCol>
                      </IonRow>

                      <IonRow className="ion-margin-top">
                        <IonCol className="ion-text-end">
                          <IonButton type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save HbA1c"}
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </form>
                </IonCardContent>
              </IonCard>
            </div>
          )}

          {/* Weight Tab */}
          {activeTab === "weight" && (
            <div className="ion-margin-top">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Weight Tracking</IonCardTitle>
                  <IonCardSubtitle>
                    Monitor your weight over time
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <div style={{ height: "300px", width: "100%" }}>
                    <Line
                      data={weightChartData}
                      options={{
                        ...chartOptions,
                        scales: {
                          y: {
                            min: 70,
                            max: 90,
                          },
                        },
                      }}
                    />
                  </div>
                </IonCardContent>
              </IonCard>

              <IonCard className="ion-margin-top">
                <IonCardHeader>
                  <IonCardTitle>Add New Weight Reading</IonCardTitle>
                  <IonCardSubtitle>
                    Enter your latest weight measurement
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <form onSubmit={onSubmitWeight}>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="12" sizeMd="8">
                          <IonItem
                            className={weightErrors.weight ? "ion-invalid" : ""}
                          >
                            <IonLabel position="stacked">Weight</IonLabel>
                            <IonInput
                              type="number"
                              step="0.1"
                              placeholder="e.g., 70.5"
                              value={weightForm.weight}
                              onIonChange={(e) =>
                                handleWeightChange("weight", e.detail.value!)
                              }
                            />
                            {weightErrors.weight && (
                              <IonText
                                color="danger"
                                className="ion-padding-start"
                              >
                                <small>{weightErrors.weight}</small>
                              </IonText>
                            )}
                          </IonItem>
                        </IonCol>
                        <IonCol size="12" sizeMd="4">
                          <IonItem
                            className={weightErrors.unit ? "ion-invalid" : ""}
                          >
                            <IonLabel position="stacked">Unit</IonLabel>
                            <IonSelect
                              value={weightForm.unit}
                              onIonChange={(e) =>
                                handleWeightChange("unit", e.detail.value)
                              }
                            >
                              <IonSelectOption value="kg">
                                Kilograms (kg)
                              </IonSelectOption>
                              <IonSelectOption value="lbs">
                                Pounds (lbs)
                              </IonSelectOption>
                            </IonSelect>
                            {weightErrors.unit && (
                              <IonText
                                color="danger"
                                className="ion-padding-start"
                              >
                                <small>{weightErrors.unit}</small>
                              </IonText>
                            )}
                          </IonItem>
                        </IonCol>
                      </IonRow>

                      <IonRow>
                        <IonCol>
                          <IonItem
                            className={weightErrors.date ? "ion-invalid" : ""}
                          >
                            <IonLabel position="stacked">Date</IonLabel>
                            <IonInput
                              type="date"
                              value={weightForm.date}
                              onIonChange={(e) =>
                                handleWeightChange("date", e.detail.value!)
                              }
                            />
                            {weightErrors.date && (
                              <IonText
                                color="danger"
                                className="ion-padding-start"
                              >
                                <small>{weightErrors.date}</small>
                              </IonText>
                            )}
                          </IonItem>
                        </IonCol>
                      </IonRow>

                      <IonRow>
                        <IonCol>
                          <IonItem>
                            <IonLabel position="stacked">
                              Notes (Optional)
                            </IonLabel>
                            <IonTextarea
                              placeholder="Any relevant details about this measurement..."
                              value={weightForm.notes}
                              onIonChange={(e) =>
                                handleWeightChange("notes", e.detail.value!)
                              }
                              rows={3}
                            />
                          </IonItem>
                        </IonCol>
                      </IonRow>

                      <IonRow className="ion-margin-top">
                        <IonCol className="ion-text-end">
                          <IonButton type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Weight"}
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </form>
                </IonCardContent>
              </IonCard>
            </div>
          )}
        </IonGrid>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          header={toastMessage.title}
          message={toastMessage.message}
          duration={3000}
          color={toastMessage.color}
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default BloodSugarTracking;

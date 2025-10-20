import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonRadioGroup,
  IonRadio,
  IonCheckbox,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonItemDivider,
  useIonToast,
} from "@ionic/react";

const HealthRecordsForm: React.FC = () => {
  const history = useHistory();
  const [presentToast] = useIonToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [computedBMI, setComputedBMI] = useState("");
  const [computedTotalRiskScore, setComputedTotalRiskScore] = useState("");
  const [hypoglycemiaSymptomCount, setHypoglycemiaSymptomCount] = useState(0);
  const [severeHypoglycemiaFindingCount, setSevereHypoglycemiaFindingCount] =
    useState(0);

  // Initialize form state
  const [formData, setFormData] = useState({
    medicalGuidelines: {
      officeVisits: "appropriate",
      bloodPressure: "measured",
      eyeExamination: "performed",
      hemoglobinA1c: "measured",
    },
    diabetesRisk: {
      age: "",
      gender: "male",
      weight: "",
      height: "",
      waist: "",
      familyHistory: "no",
      sedentaryLifestyle: "no",
      bmi: "",
      totalRiskScore: "",
      notes: "",
    },
    symptoms: {
      generalComplaints: [] as string[],
      neurologicalFindings: [] as string[],
      behaviorChanges: [] as string[],
      consciousnessChanges: [] as string[],
    },
  });

  // Form errors state
  const [errors, setErrors] = useState({
    diabetesRisk: {
      age: "",
      weight: "",
      height: "",
      waist: "",
    },
  });

  // Update form data handler
  const handleInputChange = (
    section: string,
    field: string,
    value: string | number | boolean
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section as keyof typeof prevData],
        [field]: value,
      },
    }));
  };

  // Handle checkbox arrays
  const handleCheckboxChange = (
    section: string,
    field: string,
    value: string,
    checked: boolean
  ) => {
    const currentValues: string[] = [
      ...(formData.symptoms[
        field as keyof typeof formData.symptoms
      ] as string[]),
    ];

    if (checked) {
      // Add to array if checked and not already there
      if (!currentValues.includes(value)) {
        currentValues.push(value);
      }
    } else {
      // Remove from array if unchecked
      const index = currentValues.indexOf(value);
      if (index !== -1) {
        currentValues.splice(index, 1);
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section as keyof typeof prevData],
        [field]: currentValues,
      },
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {
      diabetesRisk: {
        age: "",
        weight: "",
        height: "",
        waist: "",
      },
    };

    let isValid = true;

    // Age validation
    if (!formData.diabetesRisk.age) {
      newErrors.diabetesRisk.age = "Age is required";
      isValid = false;
    }

    // Weight validation
    if (!formData.diabetesRisk.weight) {
      newErrors.diabetesRisk.weight = "Weight is required";
      isValid = false;
    }

    // Height validation
    if (!formData.diabetesRisk.height) {
      newErrors.diabetesRisk.height = "Height is required";
      isValid = false;
    }

    // Waist validation
    if (!formData.diabetesRisk.waist) {
      newErrors.diabetesRisk.waist = "Waist measurement is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Calculate BMI when weight or height changes
  useEffect(() => {
    const { weight, height } = formData.diabetesRisk;

    if (weight && height) {
      const weightVal = parseFloat(weight);
      const heightVal = parseFloat(height);

      if (weightVal > 0 && heightVal > 0) {
        const bmi = (weightVal / (heightVal * heightVal)).toFixed(1);
        setComputedBMI(bmi);
        handleInputChange("diabetesRisk", "bmi", bmi);
      }
    }
  }, [formData.diabetesRisk.weight, formData.diabetesRisk.height]);

  // Count symptoms of hypoglycemia
  useEffect(() => {
    const {
      generalComplaints,
      neurologicalFindings,
      behaviorChanges,
      consciousnessChanges,
    } = formData.symptoms;

    const allSymptoms = [
      ...generalComplaints,
      ...neurologicalFindings,
      ...behaviorChanges,
      ...consciousnessChanges,
    ];

    // Count all symptoms except "none" options
    const symptomCount = allSymptoms.filter((s) => s !== "none").length;
    setHypoglycemiaSymptomCount(symptomCount);

    // Count severe symptoms
    const severeSymptoms = [
      "seizures",
      "unconscious",
      "disoriented",
      "slurred_speech",
      "unsteady_movements",
    ];
    const severeCount = allSymptoms.filter((s) =>
      severeSymptoms.includes(s)
    ).length;
    setSevereHypoglycemiaFindingCount(severeCount);
  }, [formData.symptoms]);

  // Calculate total risk score
  useEffect(() => {
    try {
      const { age, gender, familyHistory, sedentaryLifestyle } =
        formData.diabetesRisk;
      const bmi = parseFloat(computedBMI || "0");

      // Simplified risk calculation
      let score = 0;

      // Age points
      const ageVal = parseInt(age || "0");
      if (ageVal >= 45 && ageVal < 55) score += 2;
      else if (ageVal >= 55 && ageVal < 65) score += 3;
      else if (ageVal >= 65) score += 4;

      // Gender points
      if (gender === "male") score += 1;

      // BMI points
      if (bmi >= 25 && bmi < 30) score += 1;
      else if (bmi >= 30 && bmi < 35) score += 2;
      else if (bmi >= 35) score += 3;

      // Family history
      if (familyHistory === "yes") score += 3;

      // Sedentary lifestyle
      if (sedentaryLifestyle === "yes") score += 2;

      // Set the total score
      setComputedTotalRiskScore(score.toString());
      handleInputChange("diabetesRisk", "totalRiskScore", score.toString());
    } catch (e) {
      console.error("Error calculating total risk score:", e);
      // Handle calculation errors silently
    }
  }, [formData.diabetesRisk, computedBMI]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      presentToast({
        message: "Please fix the errors in the form",
        duration: 3000,
        position: "bottom",
        color: "danger",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, this would be an API call
      console.log("Health Records data:", formData);

      presentToast({
        message: "Your health records have been successfully saved.",
        duration: 3000,
        position: "bottom",
        color: "success",
      });

      // Navigate back after successful submission
      history.push("/profile?tab=health");
    } catch (error: unknown) {
      presentToast({
        message: "There was an error saving your health records.",
        duration: 3000,
        position: "bottom",
        color: "danger",
      });
      console.error("Error saving health records:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Options for checkboxes
  const generalComplaintOptions = [
    { id: "none", label: "None" },
    { id: "hunger", label: "Hunger" },
    { id: "sweating", label: "Sweating" },
    { id: "heart_palpitations", label: "Heart palpitations" },
  ];

  const neurologicalFindingOptions = [
    { id: "none", label: "None" },
    { id: "headache", label: "Headache" },
    { id: "sleep_disturbances", label: "Sleep disturbances" },
    { id: "seizures", label: "Seizures" },
    { id: "tingling_sensations", label: "Tingling sensations" },
    { id: "restlessness", label: "Restlessness" },
    { id: "blurred_vision", label: "Blurred vision" },
    { id: "tremor", label: "Tremor" },
    { id: "unsteady_movements", label: "Unsteady movements" },
    { id: "slurred_speech", label: "Slurred speech" },
  ];

  const behaviorChangeOptions = [
    { id: "none", label: "None" },
    { id: "irritability", label: "Irritability" },
    { id: "depressed_mood", label: "Depressed mood" },
    { id: "bizarre_behaviour", label: "Bizarre behaviour" },
    { id: "anxiety", label: "Anxiety" },
    { id: "personality_change", label: "Personality change" },
  ];

  const consciousnessChangeOptions = [
    { id: "none", label: "None" },
    { id: "drowsy", label: "Drowsy" },
    { id: "dizzy", label: "Dizzy or lightheaded" },
    { id: "disoriented", label: "Disoriented" },
    { id: "unable_to_concentrate", label: "Unable to concentrate" },
    { id: "unconscious", label: "Unconscious" },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/profile?tab=health" />
          </IonButtons>
          <IonTitle>Health Records</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonText>
          <h1 className="ion-no-margin ion-margin-bottom">Health Records</h1>
          <p className="ion-margin-bottom">
            Complete your comprehensive health assessment
          </p>
        </IonText>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Medical Guidelines */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Medical Guidelines</IonCardTitle>
              <IonCardSubtitle>
                Assessment of medical care frequency and measurements
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem lines="none">
                <IonLabel position="stacked" style={{ fontWeight: "bold" }}>
                  Frequency of office visits
                </IonLabel>
                <IonRadioGroup
                  value={formData.medicalGuidelines.officeVisits}
                  onIonChange={(e) =>
                    handleInputChange(
                      "medicalGuidelines",
                      "officeVisits",
                      e.detail.value
                    )
                  }
                >
                  <IonItem lines="none" className="ion-margin-top">
                    <IonLabel>Insufficient</IonLabel>
                    <IonRadio slot="start" value="insufficient" />
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel>Minimum Number</IonLabel>
                    <IonRadio slot="start" value="minimum" />
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel>Appropriate</IonLabel>
                    <IonRadio slot="start" value="appropriate" />
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel>Too frequent</IonLabel>
                    <IonRadio slot="start" value="too_frequent" />
                  </IonItem>
                </IonRadioGroup>
              </IonItem>

              <IonItem lines="none" className="ion-margin-top">
                <IonLabel position="stacked" style={{ fontWeight: "bold" }}>
                  Blood Pressure Measurement
                </IonLabel>
                <IonRadioGroup
                  value={formData.medicalGuidelines.bloodPressure}
                  onIonChange={(e) =>
                    handleInputChange(
                      "medicalGuidelines",
                      "bloodPressure",
                      e.detail.value
                    )
                  }
                >
                  <IonItem lines="none" className="ion-margin-top">
                    <IonLabel>Not done</IonLabel>
                    <IonRadio slot="start" value="not_done" />
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel>Measured</IonLabel>
                    <IonRadio slot="start" value="measured" />
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel>Measured and used for therapy</IonLabel>
                    <IonRadio slot="start" value="measured_used" />
                  </IonItem>
                </IonRadioGroup>
              </IonItem>

              <IonItem lines="none" className="ion-margin-top">
                <IonLabel position="stacked" style={{ fontWeight: "bold" }}>
                  Eye Examination
                </IonLabel>
                <IonRadioGroup
                  value={formData.medicalGuidelines.eyeExamination}
                  onIonChange={(e) =>
                    handleInputChange(
                      "medicalGuidelines",
                      "eyeExamination",
                      e.detail.value
                    )
                  }
                >
                  <IonItem lines="none" className="ion-margin-top">
                    <IonLabel>Not done</IonLabel>
                    <IonRadio slot="start" value="not_done" />
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel>Performed</IonLabel>
                    <IonRadio slot="start" value="performed" />
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel>Performed and used for therapy</IonLabel>
                    <IonRadio slot="start" value="performed_used" />
                  </IonItem>
                </IonRadioGroup>
              </IonItem>

              <IonItem lines="none" className="ion-margin-top">
                <IonLabel position="stacked" style={{ fontWeight: "bold" }}>
                  Haemoglobin A1c
                </IonLabel>
                <IonRadioGroup
                  value={formData.medicalGuidelines.hemoglobinA1c}
                  onIonChange={(e) =>
                    handleInputChange(
                      "medicalGuidelines",
                      "hemoglobinA1c",
                      e.detail.value
                    )
                  }
                >
                  <IonItem lines="none" className="ion-margin-top">
                    <IonLabel>Not done</IonLabel>
                    <IonRadio slot="start" value="not_done" />
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel>Measured</IonLabel>
                    <IonRadio slot="start" value="measured" />
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel>Measured and used for therapy</IonLabel>
                    <IonRadio slot="start" value="measured_used" />
                  </IonItem>
                </IonRadioGroup>
              </IonItem>
            </IonCardContent>
          </IonCard>

          {/* Section 2: Diabetes Risk Score */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Diabetes Risk Score</IonCardTitle>
              <IonCardSubtitle>
                Assessment of patient risk profile and lifestyle factors
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol size="12" sizeMd="6">
                    <IonItem>
                      <IonLabel position="stacked">Age (years)</IonLabel>
                      <IonInput
                        type="number"
                        min="0"
                        value={formData.diabetesRisk.age}
                        onIonChange={(e) =>
                          handleInputChange(
                            "diabetesRisk",
                            "age",
                            e.detail.value!
                          )
                        }
                      />
                    </IonItem>
                    {errors.diabetesRisk.age && (
                      <IonText color="danger">
                        <small className="ion-padding-start">
                          {errors.diabetesRisk.age}
                        </small>
                      </IonText>
                    )}
                  </IonCol>

                  <IonCol size="12" sizeMd="6">
                    <IonItem>
                      <IonLabel position="stacked">Gender</IonLabel>
                      <IonSelect
                        value={formData.diabetesRisk.gender}
                        onIonChange={(e) =>
                          handleInputChange(
                            "diabetesRisk",
                            "gender",
                            e.detail.value
                          )
                        }
                      >
                        <IonSelectOption value="male">Male</IonSelectOption>
                        <IonSelectOption value="female">Female</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12" sizeMd="6">
                    <IonItem>
                      <IonLabel position="stacked">Weight (kg)</IonLabel>
                      <IonInput
                        type="number"
                        min="0"
                        step="0.1"
                        value={formData.diabetesRisk.weight}
                        onIonChange={(e) =>
                          handleInputChange(
                            "diabetesRisk",
                            "weight",
                            e.detail.value!
                          )
                        }
                      />
                    </IonItem>
                    {errors.diabetesRisk.weight && (
                      <IonText color="danger">
                        <small className="ion-padding-start">
                          {errors.diabetesRisk.weight}
                        </small>
                      </IonText>
                    )}
                  </IonCol>

                  <IonCol size="12" sizeMd="6">
                    <IonItem>
                      <IonLabel position="stacked">Height (m)</IonLabel>
                      <IonInput
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.diabetesRisk.height}
                        onIonChange={(e) =>
                          handleInputChange(
                            "diabetesRisk",
                            "height",
                            e.detail.value!
                          )
                        }
                      />
                    </IonItem>
                    {errors.diabetesRisk.height && (
                      <IonText color="danger">
                        <small className="ion-padding-start">
                          {errors.diabetesRisk.height}
                        </small>
                      </IonText>
                    )}
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12" sizeMd="6">
                    <IonItem>
                      <IonLabel position="stacked">Waist (cm)</IonLabel>
                      <IonInput
                        type="number"
                        min="0"
                        step="0.1"
                        value={formData.diabetesRisk.waist}
                        onIonChange={(e) =>
                          handleInputChange(
                            "diabetesRisk",
                            "waist",
                            e.detail.value!
                          )
                        }
                      />
                    </IonItem>
                    {errors.diabetesRisk.waist && (
                      <IonText color="danger">
                        <small className="ion-padding-start">
                          {errors.diabetesRisk.waist}
                        </small>
                      </IonText>
                    )}
                  </IonCol>

                  <IonCol size="12" sizeMd="6">
                    <IonItem>
                      <IonLabel position="stacked">
                        Family history of diabetes
                      </IonLabel>
                      <IonSelect
                        value={formData.diabetesRisk.familyHistory}
                        onIonChange={(e) =>
                          handleInputChange(
                            "diabetesRisk",
                            "familyHistory",
                            e.detail.value
                          )
                        }
                      >
                        <IonSelectOption value="yes">Yes</IonSelectOption>
                        <IonSelectOption value="no">No</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12" sizeMd="6">
                    <IonItem>
                      <IonLabel position="stacked">
                        Sedentary lifestyle
                      </IonLabel>
                      <IonSelect
                        value={formData.diabetesRisk.sedentaryLifestyle}
                        onIonChange={(e) =>
                          handleInputChange(
                            "diabetesRisk",
                            "sedentaryLifestyle",
                            e.detail.value
                          )
                        }
                      >
                        <IonSelectOption value="yes">Yes</IonSelectOption>
                        <IonSelectOption value="no">No</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  </IonCol>

                  <IonCol size="12" sizeMd="6">
                    <IonItem>
                      <IonLabel position="stacked">BMI (calculated)</IonLabel>
                      <IonInput
                        value={computedBMI}
                        readonly
                        placeholder="Calculated from weight and height"
                      />
                    </IonItem>
                    <IonText color="medium">
                      <small className="ion-padding-start">
                        Automatically calculated from weight and height
                      </small>
                    </IonText>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12" sizeMd="6">
                    <IonItem>
                      <IonLabel position="stacked">Total risk score</IonLabel>
                      <IonInput
                        value={computedTotalRiskScore}
                        readonly
                        placeholder="Calculated risk score"
                      />
                    </IonItem>
                    <IonText color="medium">
                      <small className="ion-padding-start">
                        Score out of 42 (higher means greater risk)
                      </small>
                    </IonText>
                  </IonCol>

                  <IonCol size="12" sizeMd="6">
                    <IonItem>
                      <IonLabel position="stacked">Notes</IonLabel>
                      <IonTextarea
                        value={formData.diabetesRisk.notes}
                        onIonChange={(e) =>
                          handleInputChange(
                            "diabetesRisk",
                            "notes",
                            e.detail.value!
                          )
                        }
                        placeholder="Additional notes about patient's risk factors"
                        rows={3}
                      />
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>

          {/* Section 3: Symptoms */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Symptoms Assessment</IonCardTitle>
              <IonCardSubtitle>
                Check all symptoms that apply to patient
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              {/* General Complaints */}
              <IonText>
                <h3 className="ion-no-margin ion-margin-bottom">
                  General Complaints
                </h3>
              </IonText>
              <IonGrid>
                <IonRow>
                  {generalComplaintOptions.map((option) => (
                    <IonCol key={option.id} size="12" sizeSm="6" sizeMd="4">
                      <IonItem lines="none">
                        <IonCheckbox
                          slot="start"
                          value={option.id}
                          checked={formData.symptoms.generalComplaints.includes(
                            option.id
                          )}
                          onIonChange={(e) =>
                            handleCheckboxChange(
                              "symptoms",
                              "generalComplaints",
                              option.id,
                              e.detail.checked
                            )
                          }
                        />
                        <IonLabel>{option.label}</IonLabel>
                      </IonItem>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>

              <IonItemDivider className="ion-margin-top ion-margin-bottom" />

              {/* Neurological Findings */}
              <IonText>
                <h3 className="ion-no-margin ion-margin-bottom">
                  Neurological Findings
                </h3>
              </IonText>
              <IonGrid>
                <IonRow>
                  {neurologicalFindingOptions.map((option) => (
                    <IonCol key={option.id} size="12" sizeSm="6" sizeMd="4">
                      <IonItem lines="none">
                        <IonCheckbox
                          slot="start"
                          value={option.id}
                          checked={formData.symptoms.neurologicalFindings.includes(
                            option.id
                          )}
                          onIonChange={(e) =>
                            handleCheckboxChange(
                              "symptoms",
                              "neurologicalFindings",
                              option.id,
                              e.detail.checked
                            )
                          }
                        />
                        <IonLabel>{option.label}</IonLabel>
                      </IonItem>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>

              <IonItemDivider className="ion-margin-top ion-margin-bottom" />

              {/* Changes in Behavior */}
              <IonText>
                <h3 className="ion-no-margin ion-margin-bottom">
                  Changes in Behaviour
                </h3>
              </IonText>
              <IonGrid>
                <IonRow>
                  {behaviorChangeOptions.map((option) => (
                    <IonCol key={option.id} size="12" sizeSm="6" sizeMd="4">
                      <IonItem lines="none">
                        <IonCheckbox
                          slot="start"
                          value={option.id}
                          checked={formData.symptoms.behaviorChanges.includes(
                            option.id
                          )}
                          onIonChange={(e) =>
                            handleCheckboxChange(
                              "symptoms",
                              "behaviorChanges",
                              option.id,
                              e.detail.checked
                            )
                          }
                        />
                        <IonLabel>{option.label}</IonLabel>
                      </IonItem>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>

              <IonItemDivider className="ion-margin-top ion-margin-bottom" />

              {/* Changes in Consciousness */}
              <IonText>
                <h3 className="ion-no-margin ion-margin-bottom">
                  Changes in Consciousness
                </h3>
              </IonText>
              <IonGrid>
                <IonRow>
                  {consciousnessChangeOptions.map((option) => (
                    <IonCol key={option.id} size="12" sizeSm="6" sizeMd="4">
                      <IonItem lines="none">
                        <IonCheckbox
                          slot="start"
                          value={option.id}
                          checked={formData.symptoms.consciousnessChanges.includes(
                            option.id
                          )}
                          onIonChange={(e) =>
                            handleCheckboxChange(
                              "symptoms",
                              "consciousnessChanges",
                              option.id,
                              e.detail.checked
                            )
                          }
                        />
                        <IonLabel>{option.label}</IonLabel>
                      </IonItem>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>

              <IonItemDivider className="ion-margin-top ion-margin-bottom" />

              {/* Computed Values */}
              <IonGrid>
                <IonRow>
                  <IonCol size="12" sizeMd="6">
                    <IonCard>
                      <IonCardContent>
                        <IonText>
                          <h3 className="ion-no-margin">
                            Number of Hypoglycemia Symptoms
                          </h3>
                          <p className="ion-no-margin ion-margin-top">
                            <strong style={{ fontSize: "1.5em" }}>
                              {hypoglycemiaSymptomCount}
                            </strong>
                          </p>
                        </IonText>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="12" sizeMd="6">
                    <IonCard>
                      <IonCardContent>
                        <IonText>
                          <h3 className="ion-no-margin">
                            Severe Hypoglycemia Findings
                          </h3>
                          <p className="ion-no-margin ion-margin-top">
                            <strong style={{ fontSize: "1.5em" }}>
                              {severeHypoglycemiaFindingCount}
                            </strong>
                          </p>
                        </IonText>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>

          <div className="ion-padding ion-text-end">
            <IonButton
              fill="outline"
              onClick={() => history.push("/profile?tab=health")}
              disabled={isSubmitting}
              className="ion-margin-end"
            >
              Cancel
            </IonButton>
            <IonButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Medical Record"}
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default HealthRecordsForm;

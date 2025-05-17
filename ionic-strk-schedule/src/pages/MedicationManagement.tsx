import { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonModal,
  IonButtons,
  IonText,
  IonToast,
  IonBackButton,
  IonItemDivider,
} from "@ionic/react";
import {
  medkitOutline,
  timeOutline,
  pencilOutline,
  trashOutline,
  addOutline,
} from "ionicons/icons";

// Sample data for demonstration
const initialMedications = [
  {
    id: "1",
    name: "Metformin",
    dosage: "500mg",
    frequency: "twice",
    timing: ["morning", "evening"],
    startDate: "2023-01-15",
    endDate: "",
    prescribingPhysician: "Dr. Sarah Johnson",
    sideEffects: "Occasional stomach upset",
    refillNumber: "3",
    pharmacy: "HealthPlus Pharmacy, 123 Main St",
    notes: "Take with food to reduce stomach upset",
  },
  {
    id: "2",
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "daily",
    timing: ["morning"],
    startDate: "2023-03-10",
    endDate: "",
    prescribingPhysician: "Dr. Michael Chen",
    sideEffects: "Dry cough",
    refillNumber: "5",
    pharmacy: "MedExpress, 456 Oak Ave",
    notes: "",
  },
];

const MedicationManagement: React.FC = () => {
  const [medications, setMedications] = useState(initialMedications);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    message: "",
    color: "success" as "success" | "danger",
  });

  // Form state
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    dosage: "",
    frequency: "daily",
    timing: ["morning"],
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    prescribingPhysician: "",
    sideEffects: "",
    refillNumber: "",
    pharmacy: "",
    notes: "",
  });

  // Form validation state
  const [formErrors, setFormErrors] = useState({
    name: "",
    dosage: "",
    frequency: "",
    timing: "",
    startDate: "",
    prescribingPhysician: "",
    pharmacy: "",
  });

  // Reset form to defaults or to edit a medication
  const resetForm = (
    medication: (typeof initialMedications)[0] | null = null
  ) => {
    if (medication) {
      setFormData(medication);
    } else {
      setFormData({
        id: "",
        name: "",
        dosage: "",
        frequency: "daily",
        timing: ["morning"],
        startDate: new Date().toISOString().split("T")[0],
        endDate: "",
        prescribingPhysician: "",
        sideEffects: "",
        refillNumber: "",
        pharmacy: "",
        notes: "",
      });
    }
    setFormErrors({
      name: "",
      dosage: "",
      frequency: "",
      timing: "",
      startDate: "",
      prescribingPhysician: "",
      pharmacy: "",
    });
  };

  // Handle form input changes
  const handleInputChange = (
    field: string,
    value: string | number | string[] | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear validation error when field is changed
    if (formErrors[field as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // Handle checkbox changes for timing
  const handleTimingChange = (option: string, checked: boolean) => {
    if (checked) {
      // Add to array if not already there
      if (!formData.timing.includes(option)) {
        setFormData((prev) => ({
          ...prev,
          timing: [...prev.timing, option],
        }));
      }
    } else {
      // Remove from array
      setFormData((prev) => ({
        ...prev,
        timing: prev.timing.filter((item) => item !== option),
      }));
    }

    // Clear timing validation error
    if (formErrors.timing) {
      setFormErrors((prev) => ({
        ...prev,
        timing: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {
      name: "",
      dosage: "",
      frequency: "",
      timing: "",
      startDate: "",
      prescribingPhysician: "",
      pharmacy: "",
    };
    let isValid = true;

    // Validate required fields
    if (!formData.name || formData.name.length < 2) {
      errors.name = "Medication name is required";
      isValid = false;
    }

    if (!formData.dosage) {
      errors.dosage = "Dosage is required";
      isValid = false;
    }

    if (!formData.frequency) {
      errors.frequency = "Frequency is required";
      isValid = false;
    }

    if (formData.timing.length === 0) {
      errors.timing = "Select at least one time of day";
      isValid = false;
    }

    if (!formData.startDate) {
      errors.startDate = "Start date is required";
      isValid = false;
    }

    if (
      !formData.prescribingPhysician ||
      formData.prescribingPhysician.length < 2
    ) {
      errors.prescribingPhysician = "Physician name is required";
      isValid = false;
    }

    if (!formData.pharmacy || formData.pharmacy.length < 2) {
      errors.pharmacy = "Pharmacy details are required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (showEditModal) {
        // Edit existing medication
        const updatedMedications = medications.map((med) =>
          med.id === formData.id ? formData : med
        );
        setMedications(updatedMedications);

        setToastMessage({
          message: `${formData.name} has been updated successfully.`,
          color: "success",
        });
        setShowToast(true);
      } else {
        // Add new medication
        const newMedication = {
          ...formData,
          id: Date.now().toString(),
        };
        setMedications([...medications, newMedication]);

        setToastMessage({
          message: `${formData.name} has been added to your medications.`,
          color: "success",
        });
        setShowToast(true);
      }

      setShowAddModal(false);
      setShowEditModal(false);
      resetForm();
    } catch (error: unknown) {
      setToastMessage({
        message: "There was an error saving your medication.",
        color: "danger",
      });
      console.error("Error saving medication:", error);
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit medication
  const handleEdit = (medication: (typeof initialMedications)[0] | null) => {
    resetForm(medication);
    setShowEditModal(true);
  };

  // Handle delete medication
  const handleDelete = (id: string) => {
    setMedications(medications.filter((med) => med.id !== id));
    setToastMessage({
      message: "The medication has been removed from your list.",
      color: "success",
    });
    setShowToast(true);
  };

  const timingOptions = [
    { id: "morning", label: "Morning" },
    { id: "afternoon", label: "Afternoon" },
    { id: "evening", label: "Evening" },
    { id: "bedtime", label: "Bedtime" },
  ];

  const getFrequencyLabel = (value: string) => {
    switch (value) {
      case "daily":
        return "Once daily";
      case "twice":
        return "Twice daily";
      case "three":
        return "Three times daily";
      case "weekly":
        return "Weekly";
      case "asneeded":
        return "As needed";
      default:
        return value;
    }
  };

  const getTimingLabels = (timings: string[]) => {
    return timings
      .map((t) => timingOptions.find((opt) => opt.id === t)?.label)
      .join(", ");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/profile" />
          </IonButtons>
          <IonTitle>Medication Management</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                resetForm();
                setShowAddModal(true);
              }}
            >
              <IonIcon slot="start" icon={addOutline} />
              Add
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <h1
                className="ion-no-margin"
                style={{ fontSize: "24px", fontWeight: "bold" }}
              >
                Medication Management
              </h1>
              <IonText color="medium">
                <p className="ion-no-margin">
                  Manage your medications, dosages, and schedules
                </p>
              </IonText>
            </IonCol>
          </IonRow>

          {medications.length === 0 ? (
            <IonRow>
              <IonCol className="ion-text-center ion-padding">
                <div
                  style={{
                    padding: "32px",
                    border: "1px dashed var(--ion-color-medium)",
                    borderRadius: "8px",
                    margin: "16px 0",
                  }}
                >
                  <IonIcon
                    icon={medkitOutline}
                    style={{
                      fontSize: "48px",
                      color: "var(--ion-color-medium)",
                      marginBottom: "16px",
                    }}
                  />
                  <h3 style={{ fontWeight: "500", margin: "8px 0" }}>
                    No Medications
                  </h3>
                  <IonText color="medium">
                    <p style={{ marginBottom: "16px" }}>
                      You haven't added any medications yet.
                    </p>
                  </IonText>
                  <IonButton
                    onClick={() => {
                      resetForm();
                      setShowAddModal(true);
                    }}
                  >
                    Add Your First Medication
                  </IonButton>
                </div>
              </IonCol>
            </IonRow>
          ) : (
            <IonRow>
              {medications.map((medication) => (
                <IonCol size="12" sizeMd="6" key={medication.id}>
                  <IonCard>
                    <IonCardHeader>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <IonCardTitle>{medication.name}</IonCardTitle>
                          <IonCardSubtitle>{medication.dosage}</IonCardSubtitle>
                        </div>
                        <div>
                          <IonButton
                            fill="clear"
                            onClick={() => handleEdit(medication)}
                          >
                            <IonIcon slot="icon-only" icon={pencilOutline} />
                          </IonButton>
                          <IonButton
                            fill="clear"
                            onClick={() => handleDelete(medication.id)}
                          >
                            <IonIcon slot="icon-only" icon={trashOutline} />
                          </IonButton>
                        </div>
                      </div>
                    </IonCardHeader>
                    <IonCardContent>
                      <div className="ion-margin-bottom">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "8px",
                          }}
                        >
                          <IonIcon
                            icon={timeOutline}
                            style={{
                              marginRight: "8px",
                              color: "var(--ion-color-medium)",
                            }}
                          />
                          <IonText>
                            {getFrequencyLabel(medication.frequency)} (
                            {getTimingLabels(medication.timing)})
                          </IonText>
                        </div>
                        <div style={{ marginBottom: "8px" }}>
                          <strong>Prescribed by:</strong>{" "}
                          {medication.prescribingPhysician}
                        </div>
                        <div style={{ marginBottom: "8px" }}>
                          <strong>Pharmacy:</strong> {medication.pharmacy}
                        </div>
                        {medication.sideEffects && (
                          <div style={{ marginBottom: "8px" }}>
                            <strong>Side Effects:</strong>{" "}
                            {medication.sideEffects}
                          </div>
                        )}
                      </div>
                      <IonItemDivider
                        style={{
                          minHeight: "1px",
                          background: "var(--ion-color-light)",
                        }}
                      />
                      <div
                        className="ion-padding-top"
                        style={{
                          fontSize: "12px",
                          color: "var(--ion-color-medium)",
                        }}
                      >
                        Started:{" "}
                        {new Date(medication.startDate).toLocaleDateString()}
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          )}
        </IonGrid>

        {/* Add/Edit Medication Modal */}
        <IonModal
          isOpen={showAddModal || showEditModal}
          onDidDismiss={() => {
            setShowAddModal(false);
            setShowEditModal(false);
            resetForm();
          }}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>
                {showEditModal ? "Edit Medication" : "Add New Medication"}
              </IonTitle>
              <IonButtons slot="end">
                <IonButton
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                  }}
                >
                  Cancel
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            <form onSubmit={handleSubmit}>
              <IonText color="medium">
                <p>Enter the details of your medication below.</p>
              </IonText>

              <IonGrid>
                <IonRow>
                  <IonCol size="12" sizeMd="6">
                    <IonItem className={formErrors.name ? "ion-invalid" : ""}>
                      <IonLabel position="stacked">Medication Name</IonLabel>
                      <IonInput
                        value={formData.name}
                        onIonChange={(e) =>
                          handleInputChange("name", e.detail.value!)
                        }
                        placeholder="e.g., Metformin"
                      />
                      {formErrors.name && (
                        <IonText color="danger">
                          <p
                            className="ion-padding-start ion-margin-top"
                            style={{ fontSize: "12px" }}
                          >
                            {formErrors.name}
                          </p>
                        </IonText>
                      )}
                    </IonItem>
                  </IonCol>

                  <IonCol size="12" sizeMd="6">
                    <IonItem className={formErrors.dosage ? "ion-invalid" : ""}>
                      <IonLabel position="stacked">Dosage</IonLabel>
                      <IonInput
                        value={formData.dosage}
                        onIonChange={(e) =>
                          handleInputChange("dosage", e.detail.value!)
                        }
                        placeholder="e.g., 500mg"
                      />
                      {formErrors.dosage && (
                        <IonText color="danger">
                          <p
                            className="ion-padding-start ion-margin-top"
                            style={{ fontSize: "12px" }}
                          >
                            {formErrors.dosage}
                          </p>
                        </IonText>
                      )}
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12" sizeMd="6">
                    <IonItem
                      className={formErrors.frequency ? "ion-invalid" : ""}
                    >
                      <IonLabel position="stacked">Frequency</IonLabel>
                      <IonSelect
                        value={formData.frequency}
                        onIonChange={(e) =>
                          handleInputChange("frequency", e.detail.value)
                        }
                        placeholder="Select frequency"
                      >
                        <IonSelectOption value="daily">
                          Once daily
                        </IonSelectOption>
                        <IonSelectOption value="twice">
                          Twice daily
                        </IonSelectOption>
                        <IonSelectOption value="three">
                          Three times daily
                        </IonSelectOption>
                        <IonSelectOption value="weekly">Weekly</IonSelectOption>
                        <IonSelectOption value="asneeded">
                          As needed
                        </IonSelectOption>
                      </IonSelect>
                      {formErrors.frequency && (
                        <IonText color="danger">
                          <p
                            className="ion-padding-start ion-margin-top"
                            style={{ fontSize: "12px" }}
                          >
                            {formErrors.frequency}
                          </p>
                        </IonText>
                      )}
                    </IonItem>
                  </IonCol>

                  <IonCol size="12" sizeMd="6">
                    <IonLabel className="ion-padding-start">
                      Time of Day
                    </IonLabel>
                    <IonText color="medium" className="ion-padding-start">
                      <p style={{ fontSize: "12px", margin: "4px 0 8px 0" }}>
                        Select when you take this medication
                      </p>
                    </IonText>

                    <div className={formErrors.timing ? "ion-invalid" : ""}>
                      {timingOptions.map((option) => (
                        <IonItem key={option.id} lines="none">
                          <IonCheckbox
                            slot="start"
                            checked={formData.timing.includes(option.id)}
                            onIonChange={(e) =>
                              handleTimingChange(option.id, e.detail.checked)
                            }
                          />
                          <IonLabel>{option.label}</IonLabel>
                        </IonItem>
                      ))}

                      {formErrors.timing && (
                        <IonText color="danger">
                          <p
                            className="ion-padding-start"
                            style={{ fontSize: "12px" }}
                          >
                            {formErrors.timing}
                          </p>
                        </IonText>
                      )}
                    </div>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12" sizeMd="6">
                    <IonItem
                      className={formErrors.startDate ? "ion-invalid" : ""}
                    >
                      <IonLabel position="stacked">Start Date</IonLabel>
                      <IonInput
                        type="date"
                        value={formData.startDate}
                        onIonChange={(e) =>
                          handleInputChange("startDate", e.detail.value!)
                        }
                      />
                      {formErrors.startDate && (
                        <IonText color="danger">
                          <p
                            className="ion-padding-start ion-margin-top"
                            style={{ fontSize: "12px" }}
                          >
                            {formErrors.startDate}
                          </p>
                        </IonText>
                      )}
                    </IonItem>
                  </IonCol>

                  <IonCol size="12" sizeMd="6">
                    <IonItem>
                      <IonLabel position="stacked">
                        End Date (Optional)
                      </IonLabel>
                      <IonInput
                        type="date"
                        value={formData.endDate}
                        onIonChange={(e) =>
                          handleInputChange("endDate", e.detail.value!)
                        }
                      />
                      <IonText color="medium" slot="helper">
                        Leave blank if ongoing
                      </IonText>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12">
                    <IonItem
                      className={
                        formErrors.prescribingPhysician ? "ion-invalid" : ""
                      }
                    >
                      <IonLabel position="stacked">
                        Prescribing Physician
                      </IonLabel>
                      <IonInput
                        value={formData.prescribingPhysician}
                        onIonChange={(e) =>
                          handleInputChange(
                            "prescribingPhysician",
                            e.detail.value!
                          )
                        }
                        placeholder="Dr. John Smith"
                      />
                      {formErrors.prescribingPhysician && (
                        <IonText color="danger">
                          <p
                            className="ion-padding-start ion-margin-top"
                            style={{ fontSize: "12px" }}
                          >
                            {formErrors.prescribingPhysician}
                          </p>
                        </IonText>
                      )}
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12">
                    <IonItem>
                      <IonLabel position="stacked">
                        Side Effects (Optional)
                      </IonLabel>
                      <IonTextarea
                        value={formData.sideEffects}
                        onIonChange={(e) =>
                          handleInputChange("sideEffects", e.detail.value!)
                        }
                        placeholder="List any side effects you've experienced..."
                        rows={3}
                      />
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12" sizeMd="6">
                    <IonItem>
                      <IonLabel position="stacked">
                        Refill Number (Optional)
                      </IonLabel>
                      <IonInput
                        value={formData.refillNumber}
                        onIonChange={(e) =>
                          handleInputChange("refillNumber", e.detail.value!)
                        }
                        placeholder="e.g., 3"
                      />
                    </IonItem>
                  </IonCol>

                  <IonCol size="12" sizeMd="6">
                    <IonItem
                      className={formErrors.pharmacy ? "ion-invalid" : ""}
                    >
                      <IonLabel position="stacked">Pharmacy</IonLabel>
                      <IonInput
                        value={formData.pharmacy}
                        onIonChange={(e) =>
                          handleInputChange("pharmacy", e.detail.value!)
                        }
                        placeholder="Pharmacy name and location"
                      />
                      {formErrors.pharmacy && (
                        <IonText color="danger">
                          <p
                            className="ion-padding-start ion-margin-top"
                            style={{ fontSize: "12px" }}
                          >
                            {formErrors.pharmacy}
                          </p>
                        </IonText>
                      )}
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12">
                    <IonItem>
                      <IonLabel position="stacked">Notes (Optional)</IonLabel>
                      <IonTextarea
                        value={formData.notes}
                        onIonChange={(e) =>
                          handleInputChange("notes", e.detail.value!)
                        }
                        placeholder="Any additional information about this medication..."
                        rows={3}
                      />
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow className="ion-margin-top ion-padding-top">
                  <IonCol className="ion-text-end">
                    <IonButton
                      fill="outline"
                      onClick={() => {
                        setShowAddModal(false);
                        setShowEditModal(false);
                      }}
                      disabled={isSubmitting}
                      className="ion-margin-end"
                    >
                      Cancel
                    </IonButton>
                    <IonButton type="submit" disabled={isSubmitting}>
                      {isSubmitting
                        ? "Saving..."
                        : showEditModal
                        ? "Update Medication"
                        : "Add Medication"}
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </form>
          </IonContent>
        </IonModal>

        {/* Toast */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage.message}
          duration={3000}
          position="bottom"
          color={toastMessage.color}
        />
      </IonContent>
    </IonPage>
  );
};

export default MedicationManagement;

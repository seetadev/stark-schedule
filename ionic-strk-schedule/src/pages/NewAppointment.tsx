import { useState } from "react";
import { format } from "date-fns";
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
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonModal,
  useIonToast,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButtons,
  IonBadge,
  IonSearchbar,
  IonChip,
  useIonAlert,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonRefresher,
  IonRefresherContent,
  IonSkeletonText,
  IonList,
  IonListHeader,
} from "@ionic/react";
import {
  addOutline,
  calendarOutline,
  locationOutline,
  medicalOutline,
  createOutline,
  trashOutline,
  notificationsOutline,
} from "ionicons/icons";

// Sample data for demonstration - in a real app, this would come from an API
const initialAppointments = [
  {
    id: "1",
    doctorName: "Dr. Sarah Johnson",
    speciality: "Endocrinologist",
    appointmentDate: new Date("2025-05-25T10:30:00"),
    location: "Diabetes Care Clinic, 123 Health St.",
    reason: "Quarterly diabetes checkup",
    notes: "Bring recent blood sugar readings",
    status: "upcoming",
  },
  {
    id: "2",
    doctorName: "Dr. Michael Chen",
    speciality: "Cardiologist",
    appointmentDate: new Date("2025-06-10T14:00:00"),
    location: "Heart Center, 456 Medical Ave.",
    reason: "Blood pressure follow-up",
    notes: "",
    status: "upcoming",
  },
  {
    id: "3",
    doctorName: "Dr. Emily Williams",
    speciality: "Ophthalmologist",
    appointmentDate: new Date("2025-05-10T09:15:00"),
    location: "Vision Care, 789 Eye St.",
    reason: "Annual eye examination",
    notes: "Remember to bring glasses",
    status: "completed",
  },
];

const NewAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [searchText, setSearchText] = useState("");
  const [presentToast] = useIonToast();
  const [presentAlert] = useIonAlert();

  // Form state
  const [formData, setFormData] = useState({
    doctorName: "",
    speciality: "",
    appointmentDate: new Date(),
    appointmentTime: "09:00",
    location: "",
    reason: "",
    notes: "",
    reminder: "1day",
  });

  // Form errors state
  const [errors, setErrors] = useState({
    doctorName: "",
    speciality: "",
    appointmentDate: "",
    appointmentTime: "",
    location: "",
    reason: "",
  });

  // Handle form input changes
  const handleInputChange = (field: string, value: string | number | Date) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear the error for this field if it exists
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // Handle date selection
  const handleDateChange = (value: string) => {
    if (value) {
      setFormData((prev) => ({
        ...prev,
        appointmentDate: new Date(value),
      }));

      // Clear date error if it exists
      if (errors.appointmentDate) {
        setErrors((prev) => ({
          ...prev,
          appointmentDate: "",
        }));
      }
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {
      doctorName: "",
      speciality: "",
      appointmentDate: "",
      appointmentTime: "",
      location: "",
      reason: "",
    };
    let isValid = true;

    if (!formData.doctorName || formData.doctorName.length < 2) {
      newErrors.doctorName = "Doctor name is required";
      isValid = false;
    }

    if (!formData.speciality || formData.speciality.length < 2) {
      newErrors.speciality = "Speciality is required";
      isValid = false;
    }

    if (!formData.appointmentDate) {
      newErrors.appointmentDate = "Appointment date is required";
      isValid = false;
    }

    if (!formData.appointmentTime) {
      newErrors.appointmentTime = "Appointment time is required";
      isValid = false;
    }

    if (!formData.location || formData.location.length < 2) {
      newErrors.location = "Location is required";
      isValid = false;
    }

    if (!formData.reason || formData.reason.length < 2) {
      newErrors.reason = "Reason for visit is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      doctorName: "",
      speciality: "",
      appointmentDate: new Date(),
      appointmentTime: "09:00",
      location: "",
      reason: "",
      notes: "",
      reminder: "1day",
    });
    setErrors({
      doctorName: "",
      speciality: "",
      appointmentDate: "",
      appointmentTime: "",
      location: "",
      reason: "",
    });
  };

  // Handle form submission
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create appointment date by combining date and time
      const appointmentDateTime = new Date(formData.appointmentDate);
      const [hours, minutes] = formData.appointmentTime.split(":").map(Number);
      appointmentDateTime.setHours(hours, minutes);

      // Create new appointment object
      const newAppointment = {
        id: Date.now().toString(),
        doctorName: formData.doctorName,
        speciality: formData.speciality,
        appointmentDate: appointmentDateTime,
        location: formData.location,
        reason: formData.reason,
        notes: formData.notes,
        status: "upcoming",
      };

      // Add to appointments list
      setAppointments([newAppointment, ...appointments]);

      presentToast({
        message: `Your appointment with Dr. ${formData.doctorName} on ${format(
          formData.appointmentDate,
          "PPP"
        )} at ${formData.appointmentTime} has been scheduled.`,
        duration: 3000,
        position: "bottom",
        color: "success",
      });

      // Close modal and reset form
      setShowModal(false);
      resetForm();
    } catch (error: unknown) {
      presentToast({
        message: "There was an error scheduling your appointment.",
        duration: 3000,
        position: "bottom",
        color: "danger",
      });
      console.error("Error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle appointment cancellation
  const handleCancelAppointment = (id: string) => {
    presentAlert({
      header: "Cancel Appointment",
      message: "Are you sure you want to cancel this appointment?",
      buttons: [
        {
          text: "No",
          role: "cancel",
        },
        {
          text: "Yes",
          role: "confirm",
          handler: () => {
            setAppointments(appointments.filter((app) => app.id !== id));
            presentToast({
              message: "Appointment has been cancelled successfully.",
              duration: 2000,
              position: "bottom",
              color: "success",
            });
          },
        },
      ],
    });
  };

  // Handle pull-to-refresh
  const handleRefresh = (event: CustomEvent) => {
    setTimeout(() => {
      // In a real app, you would fetch fresh data here
      presentToast({
        message: "Appointments refreshed",
        duration: 1500,
        position: "bottom",
      });
      event.detail.complete();
    }, 1000);
  };

  // Filter appointments based on search and status
  const filteredAppointments = appointments
    .filter((appointment) => {
      // Search filter
      if (searchText) {
        const searchLower = searchText.toLowerCase();
        return (
          appointment.doctorName.toLowerCase().includes(searchLower) ||
          appointment.speciality.toLowerCase().includes(searchLower) ||
          appointment.location.toLowerCase().includes(searchLower) ||
          appointment.reason.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .filter((appointment) => {
      // Status filter
      if (activeTab === "upcoming") {
        return new Date(appointment.appointmentDate) >= new Date();
      } else {
        return new Date(appointment.appointmentDate) < new Date();
      }
    })
    .sort((a, b) => {
      // Sort by date (upcoming: soonest first, past: most recent first)
      if (activeTab === "upcoming") {
        return (
          new Date(a.appointmentDate).getTime() -
          new Date(b.appointmentDate).getTime()
        );
      } else {
        return (
          new Date(b.appointmentDate).getTime() -
          new Date(a.appointmentDate).getTime()
        );
      }
    });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Appointments</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              style={{
                backgroundColor: "var(--ion-color-primary)",
                borderRadius: "50%",
                marginRight: "8px",
              }}
            >
              <IonIcon
                slot="icon-only"
                icon={addOutline}
                style={{ color: "white" }}
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <div className="ion-padding-vertical">
                <h1 style={{ margin: 0, fontSize: "26px", fontWeight: "bold" }}>
                  Appointments
                </h1>
                <IonText color="medium">
                  <p style={{ margin: "4px 0 0 0" }}>
                    Manage your medical appointments
                  </p>
                </IonText>
              </div>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <IonSearchbar
                value={searchText}
                onIonChange={(e) => setSearchText(e.detail.value!)}
                placeholder="Search appointments"
                animated
                debounce={300}
              />
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid var(--ion-color-light)",
                  marginBottom: "16px",
                }}
              >
                <IonButton
                  fill={activeTab === "upcoming" ? "solid" : "clear"}
                  onClick={() => setActiveTab("upcoming")}
                  style={{
                    "--border-radius": "0",
                    "--box-shadow": "none",
                    borderBottom:
                      activeTab === "upcoming"
                        ? "2px solid var(--ion-color-primary)"
                        : "none",
                  }}
                >
                  Upcoming
                  <IonBadge color="primary" style={{ marginLeft: "8px" }}>
                    {
                      appointments.filter(
                        (a) => new Date(a.appointmentDate) >= new Date()
                      ).length
                    }
                  </IonBadge>
                </IonButton>
                <IonButton
                  fill={activeTab === "past" ? "solid" : "clear"}
                  onClick={() => setActiveTab("past")}
                  style={{
                    "--border-radius": "0",
                    "--box-shadow": "none",
                    borderBottom:
                      activeTab === "past"
                        ? "2px solid var(--ion-color-primary)"
                        : "none",
                  }}
                >
                  Past Appointments
                </IonButton>
              </div>
            </IonCol>
          </IonRow>

          {isLoading ? (
            // Loading skeleton
            <IonRow>
              {[...Array(3)].map((_, i) => (
                <IonCol size="12" key={i}>
                  <IonCard>
                    <IonCardHeader>
                      <IonSkeletonText
                        animated
                        style={{ width: "60%", height: "24px" }}
                      />
                      <IonSkeletonText
                        animated
                        style={{ width: "40%", height: "16px" }}
                      />
                    </IonCardHeader>
                    <IonCardContent>
                      <IonSkeletonText
                        animated
                        style={{ width: "90%", height: "16px" }}
                      />
                      <IonSkeletonText
                        animated
                        style={{ width: "80%", height: "16px" }}
                      />
                      <IonSkeletonText
                        animated
                        style={{ width: "60%", height: "16px" }}
                      />
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          ) : filteredAppointments.length === 0 ? (
            // Empty state
            <IonRow>
              <IonCol size="12" className="ion-text-center ion-padding">
                <div
                  style={{
                    padding: "40px 20px",
                    margin: "20px 0",
                    borderRadius: "8px",
                    border: "1px dashed var(--ion-color-medium-shade)",
                    backgroundColor: "var(--ion-color-light)",
                  }}
                >
                  <IonIcon
                    icon={calendarOutline}
                    style={{
                      fontSize: "48px",
                      color: "var(--ion-color-medium)",
                      marginBottom: "16px",
                    }}
                  />
                  <h2>No appointments found</h2>
                  {activeTab === "upcoming" ? (
                    <IonText color="medium">
                      <p>You don't have any upcoming appointments scheduled.</p>
                      <IonButton
                        onClick={() => {
                          resetForm();
                          setShowModal(true);
                        }}
                        style={{ marginTop: "16px" }}
                      >
                        <IonIcon slot="start" icon={addOutline} />
                        Schedule New Appointment
                      </IonButton>
                    </IonText>
                  ) : (
                    <IonText color="medium">
                      <p>
                        No past appointments found with the current filters.
                      </p>
                    </IonText>
                  )}
                </div>
              </IonCol>
            </IonRow>
          ) : (
            // Appointment cards
            <IonList>
              {activeTab === "upcoming" && (
                <IonListHeader>Upcoming Appointments</IonListHeader>
              )}
              {filteredAppointments.map((appointment) => (
                <IonItemSliding key={appointment.id}>
                  <IonItem detail={true} lines="full">
                    <IonGrid style={{ padding: 0 }}>
                      <IonRow>
                        <IonCol size="12">
                          <IonCard
                            style={{
                              margin: "8px 0",
                              boxShadow: "none",
                              border: "1px solid var(--ion-color-light)",
                            }}
                          >
                            <IonCardHeader>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div>
                                  <IonCardTitle>
                                    {appointment.doctorName}
                                  </IonCardTitle>
                                  <IonCardSubtitle>
                                    {appointment.speciality}
                                  </IonCardSubtitle>
                                </div>
                                <IonChip color="primary" outline={true}>
                                  {format(
                                    new Date(appointment.appointmentDate),
                                    "h:mm a"
                                  )}
                                </IonChip>
                              </div>
                            </IonCardHeader>
                            <IonCardContent>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: "8px",
                                }}
                              >
                                <IonIcon
                                  icon={calendarOutline}
                                  style={{
                                    marginRight: "8px",
                                    color: "var(--ion-color-medium)",
                                  }}
                                />
                                <IonText>
                                  {format(
                                    new Date(appointment.appointmentDate),
                                    "EEEE, MMMM d, yyyy"
                                  )}
                                </IonText>
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: "8px",
                                }}
                              >
                                <IonIcon
                                  icon={locationOutline}
                                  style={{
                                    marginRight: "8px",
                                    color: "var(--ion-color-medium)",
                                  }}
                                />
                                <IonText>{appointment.location}</IonText>
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: "8px",
                                }}
                              >
                                <IonIcon
                                  icon={medicalOutline}
                                  style={{
                                    marginRight: "8px",
                                    color: "var(--ion-color-medium)",
                                  }}
                                />
                                <IonText>{appointment.reason}</IonText>
                              </div>

                              {appointment.notes && (
                                <div
                                  style={{
                                    backgroundColor: "var(--ion-color-light)",
                                    padding: "8px 12px",
                                    borderRadius: "8px",
                                    marginTop: "8px",
                                  }}
                                >
                                  <IonText style={{ fontSize: "14px" }}>
                                    <strong>Notes:</strong> {appointment.notes}
                                  </IonText>
                                </div>
                              )}

                              {activeTab === "upcoming" && (
                                <div className="ion-text-end ion-margin-top">
                                  <IonButton fill="clear" size="small">
                                    <IonIcon
                                      slot="start"
                                      icon={createOutline}
                                    />
                                    Edit
                                  </IonButton>
                                  <IonButton
                                    fill="clear"
                                    color="danger"
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCancelAppointment(appointment.id);
                                    }}
                                  >
                                    <IonIcon slot="start" icon={trashOutline} />
                                    Cancel
                                  </IonButton>
                                </div>
                              )}
                            </IonCardContent>
                          </IonCard>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonItem>

                  <IonItemOptions side="end">
                    {activeTab === "upcoming" && (
                      <>
                        <IonItemOption>
                          <IonIcon slot="icon-only" icon={createOutline} />
                        </IonItemOption>
                        <IonItemOption
                          color="danger"
                          onClick={() =>
                            handleCancelAppointment(appointment.id)
                          }
                        >
                          <IonIcon slot="icon-only" icon={trashOutline} />
                        </IonItemOption>
                      </>
                    )}
                  </IonItemOptions>
                </IonItemSliding>
              ))}
            </IonList>
          )}
        </IonGrid>

        {/* Add Appointment Modal */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Schedule New Appointment</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            <form onSubmit={onSubmit}>
              <IonGrid>
                <IonRow>
                  <IonCol size="12">
                    <IonText color="medium">
                      <p>Enter details for your new appointment</p>
                    </IonText>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12" sizeMd="6">
                    <IonItem
                      className={`ion-margin-bottom ${
                        errors.doctorName ? "ion-invalid" : ""
                      }`}
                    >
                      <IonLabel position="floating">Doctor Name</IonLabel>
                      <IonInput
                        className="ion-margin-top"
                        value={formData.doctorName}
                        onIonChange={(e) =>
                          handleInputChange("doctorName", e.detail.value!)
                        }
                        placeholder="Dr. John Smith"
                      />
                      {errors.doctorName && (
                        <IonText color="danger" className="ion-padding-start">
                          <small>{errors.doctorName}</small>
                        </IonText>
                      )}
                    </IonItem>
                  </IonCol>

                  <IonCol size="12" sizeMd="6">
                    <IonItem
                      className={`ion-margin-bottom ${
                        errors.speciality ? "ion-invalid" : ""
                      }`}
                    >
                      <IonLabel position="floating">Speciality</IonLabel>
                      <IonInput
                        className="ion-margin-top"
                        value={formData.speciality}
                        onIonChange={(e) =>
                          handleInputChange("speciality", e.detail.value!)
                        }
                        placeholder="Endocrinologist"
                      />
                      {errors.speciality && (
                        <IonText color="danger" className="ion-padding-start">
                          <small>{errors.speciality}</small>
                        </IonText>
                      )}
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12" sizeMd="6">
                    <IonItem
                      className={`ion-margin-bottom ${
                        errors.appointmentDate ? "ion-invalid" : ""
                      }`}
                    >
                      {/* <IonIcon icon={calendarOutline} slot="start" /> */}

                      <IonLabel position="floating">
                        📅 Appointment Date
                      </IonLabel>
                      <IonDatetime
                        className="ion-margin-top"
                        presentation="date"
                        value={formData.appointmentDate.toISOString()}
                        onIonChange={(e) =>
                          handleDateChange(e.detail.value as string)
                        }
                      />
                      {errors.appointmentDate && (
                        <IonText color="danger" className="ion-padding-start">
                          <small>{errors.appointmentDate}</small>
                        </IonText>
                      )}
                    </IonItem>
                  </IonCol>

                  <IonCol size="12" sizeMd="6">
                    <IonItem
                      className={`ion-margin-bottom ${
                        errors.appointmentTime ? "ion-invalid" : ""
                      }`}
                    >
                      <IonLabel position="floating">
                        ⏰ Appointment Time
                      </IonLabel>
                      <IonInput
                        className="ion-margin-top"
                        type="time"
                        value={formData.appointmentTime}
                        onIonChange={(e) =>
                          handleInputChange("appointmentTime", e.detail.value!)
                        }
                      />
                      {/* <IonIcon icon={timeOutline} slot="start" /> */}
                      {errors.appointmentTime && (
                        <IonText color="danger" className="ion-padding-start">
                          <small>{errors.appointmentTime}</small>
                        </IonText>
                      )}
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12">
                    <IonItem
                      className={`ion-margin-bottom ${
                        errors.location ? "ion-invalid" : ""
                      }`}
                    >
                      <IonLabel position="floating">Location</IonLabel>
                      <IonInput
                        className="ion-margin-top"
                        value={formData.location}
                        onIonChange={(e) =>
                          handleInputChange("location", e.detail.value!)
                        }
                        placeholder="123 Medical Center, Suite 100"
                      />
                      {errors.location && (
                        <IonText color="danger" className="ion-padding-start">
                          <small>{errors.location}</small>
                        </IonText>
                      )}
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12">
                    <IonItem
                      className={`ion-margin-bottom ${
                        errors.reason ? "ion-invalid" : ""
                      }`}
                    >
                      <IonLabel position="floating">Reason for Visit</IonLabel>
                      <IonInput
                        className="ion-margin-top"
                        value={formData.reason}
                        onIonChange={(e) =>
                          handleInputChange("reason", e.detail.value!)
                        }
                        placeholder="Diabetes check-up"
                      />
                      {errors.reason && (
                        <IonText color="danger" className="ion-padding-start">
                          <small>{errors.reason}</small>
                        </IonText>
                      )}
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12">
                    <IonItem className="ion-margin-bottom">
                      <IonLabel position="floating">Additional Notes</IonLabel>
                      <IonTextarea
                        className="ion-margin-top"
                        value={formData.notes}
                        onIonChange={(e) =>
                          handleInputChange("notes", e.detail.value!)
                        }
                        placeholder="Any additional information the doctor should know..."
                        rows={3}
                      />
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12">
                    <IonItem className="ion-margin-bottom">
                      <IonLabel>Set Reminder</IonLabel>
                      <IonSelect
                        value={formData.reminder}
                        onIonChange={(e) =>
                          handleInputChange("reminder", e.detail.value)
                        }
                        interface="popover"
                        placeholder="Select when to be reminded"
                      >
                        <IonSelectOption value="30min">
                          30 minutes before
                        </IonSelectOption>
                        <IonSelectOption value="1hour">
                          1 hour before
                        </IonSelectOption>
                        <IonSelectOption value="1day">
                          1 day before
                        </IonSelectOption>
                        <IonSelectOption value="1week">
                          1 week before
                        </IonSelectOption>
                      </IonSelect>
                      <IonIcon icon={notificationsOutline} slot="start" />
                    </IonItem>
                    <IonText color="medium" className="ion-padding-start">
                      <small>
                        You'll receive a notification before your appointment.
                      </small>
                    </IonText>
                  </IonCol>
                </IonRow>

                <IonRow className="ion-margin-top">
                  <IonCol className="ion-text-end">
                    <IonButton
                      fill="outline"
                      onClick={() => setShowModal(false)}
                      disabled={isSubmitting}
                      className="ion-margin-end"
                      type="button"
                    >
                      Cancel
                    </IonButton>
                    <IonButton type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </form>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default NewAppointments;

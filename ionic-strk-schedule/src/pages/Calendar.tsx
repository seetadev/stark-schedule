import { useState } from "react";
import { format, addDays, startOfDay, isSameDay, parseISO } from "date-fns";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonDatetime,
  // IonPopover,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
  IonList,
  IonModal,
  IonButtons,
} from "@ionic/react";
import {
  calendar as calendarIcon,
  chevronBack,
  chevronForward,
} from "ionicons/icons";
import Header from "@/components/layout/Header";

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [popoverOpen, setPopoverOpen] = useState(false);
  // const popoverRef = useRef<HTMLIonButtonElement>(null);

  // Sample data for events
  const events = [
    {
      id: 1,
      title: "Dr. Smith Appointment",
      type: "appointment",
      date: addDays(startOfDay(new Date()), 1).toISOString(),
      time: "10:00 AM",
      duration: 60,
    },
    {
      id: 2,
      title: "Morning Medication",
      type: "medication",
      date: startOfDay(new Date()).toISOString(),
      time: "8:00 AM",
      duration: 5,
    },
    {
      id: 3,
      title: "Blood Sugar Check",
      type: "reading",
      date: startOfDay(new Date()).toISOString(),
      time: "9:00 AM",
      duration: 10,
    },
    {
      id: 4,
      title: "Lunch",
      type: "meal",
      date: startOfDay(new Date()).toISOString(),
      time: "1:00 PM",
      duration: 45,
    },
    {
      id: 5,
      title: "30min Walk",
      type: "exercise",
      date: startOfDay(new Date()).toISOString(),
      time: "5:30 PM",
      duration: 30,
    },
    {
      id: 6,
      title: "Evening Medication",
      type: "medication",
      date: startOfDay(new Date()).toISOString(),
      time: "8:00 PM",
      duration: 5,
    },
  ];

  const filteredEvents = events.filter((event) =>
    isSameDay(parseISO(event.date), selectedDate)
  );

  const goToNextDay = () => {
    setSelectedDate((prevDate) => addDays(prevDate, 1));
  };

  const goToPreviousDay = () => {
    setSelectedDate((prevDate) => addDays(prevDate, -1));
  };

  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour < 22; hour++) {
      slots.push({
        hour,
        time: `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? "PM" : "AM"}`,
      });
    }
    return slots;
  };

  const getEventPosition = (time: string) => {
    const [hours, minutesPart] = time.split(":");
    const [minutes, period] = minutesPart.split(" ");
    let hour = parseInt(hours);
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
    // console.log(time, hour, minutes);
    // Convert to position in the timeline (starting from 7 AM)
    return ((hour - 7) * 60 + parseInt(minutes)) / 15;
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "appointment":
        return "primary";
      case "medication":
        return "tertiary";
      case "reading":
        return "success";
      case "meal":
        return "secondary";
      case "exercise":
        return "warning";
      default:
        return "medium";
    }
  };
  const getEventBackgroundColor = (type: string) => {
    switch (type) {
      case "appointment":
        return "rgba(56, 128, 255, 0.15)"; // Light blue
      case "medication":
        return "rgba(177, 80, 250, 0.15)"; // Light purple
      case "reading":
        return "rgba(45, 211, 111, 0.15)"; // Light green
      case "meal":
        return "rgba(106, 100, 255, 0.15)"; // Light indigo
      case "exercise":
        return "rgba(255, 196, 9, 0.15)"; // Light yellow
      default:
        return "rgba(142, 142, 147, 0.15)"; // Light gray
    }
  };
  const getEventDuration = (duration: number) => {
    // Convert minutes to timeline units (15 min increments)
    return Math.max(1, Math.floor(duration / 15));
  };

  return (
    <IonPage>
      <Header />

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-between ion-align-items-center ion-margin-bottom">
            <IonCol size="auto">
              <h1
                className="ion-no-margin"
                style={{ fontSize: "24px", fontWeight: "bold" }}
              >
                Calendar
              </h1>
            </IonCol>
            <IonCol size="auto">
              <div className="ion-text-end">
                <IonButton fill="clear" size="small" onClick={goToPreviousDay}>
                  <IonIcon slot="icon-only" icon={chevronBack} />
                </IonButton>

                <IonButton
                  fill="outline"
                  id="date-button"
                  onClick={() => setPopoverOpen(true)}
                  style={{ minWidth: "200px" }}
                >
                  <IonIcon slot="start" icon={calendarIcon} />
                  {format(selectedDate, "EEE, MMM d, yyyy")}
                </IonButton>

                <IonModal
                  isOpen={popoverOpen}
                  onDidDismiss={() => setPopoverOpen(false)}
                  className="calendar-modal"
                >
                  <IonHeader>
                    <IonToolbar>
                      <IonTitle>Select Date</IonTitle>
                      <IonButtons slot="end">
                        <IonButton onClick={() => setPopoverOpen(false)}>
                          Close
                        </IonButton>
                      </IonButtons>
                    </IonToolbar>
                  </IonHeader>
                  <IonContent>
                    <IonDatetime
                      presentation="date"
                      value={selectedDate.toISOString()}
                      onIonChange={(e) => {
                        if (e.detail.value) {
                          setSelectedDate(new Date(e.detail.value.toString()));
                          setPopoverOpen(false);
                        }
                      }}
                      style={{
                        margin: "0 auto",
                        width: "100%",
                        maxWidth: "360px",
                      }}
                    />
                  </IonContent>
                </IonModal>

                <IonButton fill="clear" size="small" onClick={goToNextDay}>
                  <IonIcon slot="icon-only" icon={chevronForward} />
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Day Timeline View */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              {isSameDay(selectedDate, new Date())
                ? "Today's Schedule"
                : "Daily Schedule"}
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <div style={{ position: "relative", minHeight: "600px" }}>
              {getTimeSlots().map((slot, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    height: "64px",
                    borderTop: "1px solid var(--ion-color-light-shade)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "64px",
                      // paddingRight: "16px",
                      // textAlign: "right",
                      fontSize: "14px",
                      color: "var(--ion-color-medium)",
                      // marginTop: "-10px",
                      position: "sticky",
                      left: 0,
                      backgroundColor: "var(--ion-background-color)",
                    }}
                  >
                    {slot.time}
                  </div>
                  <div
                    style={{ flex: 1, position: "relative", height: "100%" }}
                  >
                    {filteredEvents
                      .filter((event) => {
                        const eventHour = parseInt(event.time.split(":")[0]);
                        const eventPeriod = event.time.includes("PM")
                          ? "PM"
                          : "AM";
                        let eventHour24 = eventHour;
                        if (eventPeriod === "PM" && eventHour !== 12)
                          eventHour24 += 12;
                        if (eventPeriod === "AM" && eventHour === 12)
                          eventHour24 = 0;
                        return eventHour24 === slot.hour;
                      })
                      .map((event) => (
                        <div
                          key={event.id}
                          style={{
                            position: "absolute",
                            zIndex: 10,
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "8px",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                            cursor: "pointer",
                            top: `${10}px`,
                            left: 0,
                            right: 0,
                            height: `${
                              getEventDuration(event.duration) * 16
                            }px`,
                            minHeight: "30px",
                            backgroundColor: getEventBackgroundColor(
                              event.type
                            ), // Use new function here
                            borderLeft: `3px solid var(--ion-color-${getEventColor(
                              event.type
                            )})`,
                            color: `var(--ion-color-${getEventColor(
                              event.type
                            )})`,
                          }}
                        >
                          <div
                            style={{
                              fontSize: "14px",
                              marginLeft: "8px",
                              fontWeight: "500",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {event.title} - {event.time}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </IonCardContent>
        </IonCard>

        {/* Event List for Mobile */}
        <div className="ion-hide-md-up ion-margin-top">
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "500",
              marginBottom: "12px",
            }}
          >
            Events
          </h2>

          <IonList>
            {filteredEvents.length > 0 ? (
              filteredEvents
                .sort((a, b) => {
                  return getEventPosition(a.time) - getEventPosition(b.time);
                })
                .map((event) => (
                  <IonItem key={event.id} button detail>
                    <IonBadge
                      slot="start"
                      color={getEventColor(event.type)}
                      style={{ width: "12px", height: "32px", padding: 0 }}
                    ></IonBadge>
                    <IonLabel>
                      <h2>{event.title}</h2>
                      <p>
                        {event.time} ({event.duration} min)
                      </p>
                    </IonLabel>
                  </IonItem>
                ))
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "16px",
                  color: "var(--ion-color-medium)",
                }}
              >
                No events scheduled for this day
              </div>
            )}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CalendarPage;

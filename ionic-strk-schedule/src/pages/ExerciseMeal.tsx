import React, { useState, useEffect } from "react";
import { useIonRouter } from "@ionic/react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonGrid,
  IonRow,
  IonCol,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonModal,
  IonList,
  IonButtons,
  IonChip,
  IonBackButton,
  IonNote,
  IonToast,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import {
  add,
  chevronBack,
  chevronForward,
  calendar,
  save,
  time,
  trash,
  fitness,
  restaurant,
  checkmarkCircle,
} from "ionicons/icons";
import { format, addDays, startOfWeek, eachDayOfInterval } from "date-fns";

// Combined meal and exercise interfaces
interface HealthItem {
  id: string;
  name: string;
  description: string;
  time: string;
  notes?: string;
}

interface Meal extends HealthItem {
  type: "meal";
  carbs: number;
  protein: number;
  fat: number;
  calories: number;
}

interface Exercise extends HealthItem {
  type: "exercise";
  exerciseType: "cardio" | "strength" | "flexibility" | "balance";
  duration: number;
  intensity: "low" | "moderate" | "high";
  sets?: number;
  reps?: number;
  weight?: number;
}

interface DayPlan {
  date: Date;
  items: (Meal | Exercise)[];
  notes: string;
  completed: boolean;
}

const HealthPlanEditor: React.FC = () => {
  const router = useIonRouter();
  const [activeTab, setActiveTab] = useState<"weekly" | "daily">("weekly");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayPlans, setDayPlans] = useState<DayPlan[]>([]);
  const [dayNotes, setDayNotes] = useState("");

  // Modal states
  const [showMealModal, setShowMealModal] = useState(false);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [showItemTypeModal, setShowItemTypeModal] = useState(false);

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Form states
  const [mealForm, setMealForm] = useState({
    name: "",
    description: "",
    carbs: "",
    protein: "",
    fat: "",
    calories: "",
    time: "08:00",
    notes: "",
  });

  const [exerciseForm, setExerciseForm] = useState({
    name: "",
    description: "",
    exerciseType: "cardio" as "cardio" | "strength" | "flexibility" | "balance",
    duration: "",
    intensity: "moderate" as "low" | "moderate" | "high",
    sets: "",
    reps: "",
    weight: "",
    time: "08:00",
    notes: "",
  });

  // Initialize sample data
  useEffect(() => {
    const today = new Date();
    const weekStart = startOfWeek(today);

    const initialPlans: DayPlan[] = eachDayOfInterval({
      start: weekStart,
      end: addDays(weekStart, 6),
    }).map((date) => ({
      date,
      items: [],
      notes: "",
      completed: false,
    }));

    // Add sample data to first day
    initialPlans[0].items = [
      {
        id: "1",
        type: "meal",
        name: "Breakfast",
        description: "Oatmeal with berries and nuts",
        carbs: 40,
        protein: 10,
        fat: 8,
        calories: 320,
        time: "08:00",
        notes: "Use almond milk",
      },
      {
        id: "2",
        type: "exercise",
        name: "Morning Walk",
        description: "Easy pace around neighborhood",
        exerciseType: "cardio",
        duration: 30,
        intensity: "low",
        time: "09:00",
        notes: "Remember to stretch after",
      },
      {
        id: "3",
        type: "meal",
        name: "Lunch",
        description: "Grilled chicken salad",
        carbs: 15,
        protein: 30,
        fat: 15,
        calories: 420,
        time: "12:30",
      },
    ];

    setDayPlans(initialPlans);
  }, []);

  // Get currently selected day's plan
  const selectedDayPlan = dayPlans.find(
    (plan) =>
      format(plan.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
  ) || {
    date: selectedDate,
    items: [],
    notes: "",
    completed: false,
  };

  // Calculate week days
  const weekDays = eachDayOfInterval({
    start: startOfWeek(currentDate),
    end: addDays(startOfWeek(currentDate), 6),
  });

  // Navigation functions
  const navigateToPreviousWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };

  const navigateToNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const dayPlan = dayPlans.find(
      (plan) => format(plan.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
    setDayNotes(dayPlan?.notes || "");
    setActiveTab("daily");
  };

  // Calculate daily totals
  const meals = selectedDayPlan.items.filter(
    (item): item is Meal => item.type === "meal"
  );
  const exercises = selectedDayPlan.items.filter(
    (item): item is Exercise => item.type === "exercise"
  );

  const dailyNutrition = {
    calories: meals.reduce((sum, meal) => sum + meal.calories, 0),
    carbs: meals.reduce((sum, meal) => sum + meal.carbs, 0),
    protein: meals.reduce((sum, meal) => sum + meal.protein, 0),
    fat: meals.reduce((sum, meal) => sum + meal.fat, 0),
  };

  const totalDuration = exercises.reduce(
    (sum, exercise) => sum + exercise.duration,
    0
  );

  // Add new meal
  const handleAddMeal = () => {
    // Validate form
    if (
      !mealForm.name ||
      !mealForm.carbs ||
      !mealForm.protein ||
      !mealForm.fat ||
      !mealForm.calories
    ) {
      setToastMessage("Please fill in all required fields");
      setShowToast(true);
      return;
    }

    const newMeal: Meal = {
      id: Date.now().toString(),
      type: "meal",
      name: mealForm.name,
      description: mealForm.description,
      carbs: parseFloat(mealForm.carbs),
      protein: parseFloat(mealForm.protein),
      fat: parseFloat(mealForm.fat),
      calories: parseFloat(mealForm.calories),
      time: mealForm.time,
      notes: mealForm.notes,
    };

    // Update day plans
    const updatedDayPlans = dayPlans.map((plan) => {
      if (
        format(plan.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
      ) {
        // Sort items by time
        const updatedItems = [...plan.items, newMeal].sort((a, b) => {
          return a.time.localeCompare(b.time);
        });
        return { ...plan, items: updatedItems };
      }
      return plan;
    });

    setDayPlans(updatedDayPlans);
    setShowMealModal(false);
    resetMealForm();

    setToastMessage("Meal added successfully");
    setShowToast(true);
  };

  // Add new exercise
  const handleAddExercise = () => {
    // Validate form
    if (!exerciseForm.name || !exerciseForm.duration) {
      setToastMessage("Please fill in all required fields");
      setShowToast(true);
      return;
    }

    const newExercise: Exercise = {
      id: Date.now().toString(),
      type: "exercise",
      name: exerciseForm.name,
      description: exerciseForm.description,
      exerciseType: exerciseForm.exerciseType,
      duration: parseInt(exerciseForm.duration),
      intensity: exerciseForm.intensity,
      time: exerciseForm.time,
      notes: exerciseForm.notes,
    };

    // Add strength training specific fields if applicable
    if (exerciseForm.exerciseType === "strength") {
      if (exerciseForm.sets) newExercise.sets = parseInt(exerciseForm.sets);
      if (exerciseForm.reps) newExercise.reps = parseInt(exerciseForm.reps);
      if (exerciseForm.weight)
        newExercise.weight = parseFloat(exerciseForm.weight);
    }

    // Update day plans
    const updatedDayPlans = dayPlans.map((plan) => {
      if (
        format(plan.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
      ) {
        // Sort items by time
        const updatedItems = [...plan.items, newExercise].sort((a, b) => {
          return a.time.localeCompare(b.time);
        });
        return { ...plan, items: updatedItems };
      }
      return plan;
    });

    setDayPlans(updatedDayPlans);
    setShowExerciseModal(false);
    resetExerciseForm();

    setToastMessage("Exercise added successfully");
    setShowToast(true);
  };

  // Delete item
  const deleteItem = (itemId: string) => {
    const updatedDayPlans = dayPlans.map((plan) => {
      if (
        format(plan.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
      ) {
        return {
          ...plan,
          items: plan.items.filter((item) => item.id !== itemId),
        };
      }
      return plan;
    });

    setDayPlans(updatedDayPlans);
    setToastMessage("Item removed");
    setShowToast(true);
  };

  // Toggle completion status
  const toggleCompletion = () => {
    const updatedDayPlans = dayPlans.map((plan) => {
      if (
        format(plan.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
      ) {
        return { ...plan, completed: !plan.completed };
      }
      return plan;
    });

    setDayPlans(updatedDayPlans);
    setToastMessage(
      selectedDayPlan.completed
        ? "Day marked as incomplete"
        : "Day marked as complete"
    );
    setShowToast(true);
  };

  // Save notes
  const saveNotes = () => {
    const updatedDayPlans = dayPlans.map((plan) => {
      if (
        format(plan.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
      ) {
        return { ...plan, notes: dayNotes };
      }
      return plan;
    });

    setDayPlans(updatedDayPlans);
    setToastMessage("Notes saved");
    setShowToast(true);
  };

  // Save entire plan
  const savePlan = () => {
    console.log("Health Plans:", dayPlans);
    setToastMessage("Health plan saved successfully");
    setShowToast(true);

    // Navigate back
    setTimeout(() => {
      router.push("/profile", "back");
    }, 1000);
  };

  // Form reset functions
  const resetMealForm = () => {
    setMealForm({
      name: "",
      description: "",
      carbs: "",
      protein: "",
      fat: "",
      calories: "",
      time: "08:00",
      notes: "",
    });
  };

  const resetExerciseForm = () => {
    setExerciseForm({
      name: "",
      description: "",
      exerciseType: "cardio",
      duration: "",
      intensity: "moderate",
      sets: "",
      reps: "",
      weight: "",
      time: "08:00",
      notes: "",
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/profile" />
          </IonButtons>
          <IonTitle>Health Plan</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={savePlan}>
              <IonIcon slot="start" icon={save} />
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonSegment
          value={activeTab}
          onIonChange={(e) =>
            setActiveTab(e.detail.value as "weekly" | "daily")
          }
        >
          <IonSegmentButton value="weekly">
            <IonLabel>Weekly View</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="daily">
            <IonLabel>Daily Details</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* Weekly View */}
        {activeTab === "weekly" && (
          <IonCard>
            <IonCardHeader>
              <IonToolbar>
                <IonTitle size="small">
                  Week of {format(weekDays[0], "MMM d")}
                </IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={navigateToPreviousWeek}>
                    <IonIcon icon={chevronBack} />
                  </IonButton>
                  <IonButton onClick={navigateToNextWeek}>
                    <IonIcon icon={chevronForward} />
                  </IonButton>
                </IonButtons>
              </IonToolbar>
              <IonCardSubtitle>
                Select a day to view or edit details
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  {weekDays.map((day) => {
                    const isSelected =
                      format(day, "yyyy-MM-dd") ===
                      format(selectedDate, "yyyy-MM-dd");
                    const dayPlan = dayPlans.find(
                      (plan) =>
                        format(plan.date, "yyyy-MM-dd") ===
                        format(day, "yyyy-MM-dd")
                    );
                    const itemCount = dayPlan?.items.length || 0;

                    return (
                      <IonCol
                        key={format(day, "yyyy-MM-dd")}
                        size="12"
                        sizeSm="6"
                        sizeMd="3"
                        sizeLg="1.7"
                      >
                        <IonCard
                          button
                          onClick={() => handleDateSelect(day)}
                          color={
                            isSelected
                              ? "primary"
                              : dayPlan?.completed
                              ? "success"
                              : undefined
                          }
                          className="ion-text-center"
                        >
                          <IonCardContent>
                            <h3>{format(day, "EEE")}</h3>
                            <h2>{format(day, "d")}</h2>
                            {itemCount > 0 && (
                              <IonChip>
                                {itemCount} item{itemCount !== 1 ? "s" : ""}
                              </IonChip>
                            )}
                            {dayPlan?.completed && (
                              <IonIcon icon={checkmarkCircle} color="light" />
                            )}
                          </IonCardContent>
                        </IonCard>
                      </IonCol>
                    );
                  })}
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        )}

        {/* Daily View */}
        {activeTab === "daily" && (
          <div className="ion-padding">
            <IonCard>
              <IonCardHeader>
                <IonToolbar>
                  <IonTitle size="small">
                    {format(selectedDate, "EEEE, MMMM d")}
                    {selectedDayPlan.completed && (
                      <IonChip color="success">Completed</IonChip>
                    )}
                  </IonTitle>
                  <IonButtons slot="end">
                    <IonButton
                      color={selectedDayPlan.completed ? "medium" : "success"}
                      onClick={toggleCompletion}
                    >
                      {selectedDayPlan.completed
                        ? "Mark Incomplete"
                        : "Mark Complete"}
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonCardHeader>

              <IonCardContent>
                {/* Summary Cards */}
                <IonGrid>
                  <IonRow>
                    <IonCol size="12" sizeMd="6">
                      <IonCard>
                        <IonCardHeader>
                          <IonCardTitle>Nutrition Summary</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                          <IonGrid>
                            <IonRow>
                              <IonCol>
                                <div className="ion-text-center">
                                  <h2>{dailyNutrition.calories}</h2>
                                  <IonLabel>Calories</IonLabel>
                                </div>
                              </IonCol>
                              <IonCol>
                                <div className="ion-text-center">
                                  <h2>{dailyNutrition.carbs}g</h2>
                                  <IonLabel>Carbs</IonLabel>
                                </div>
                              </IonCol>
                              <IonCol>
                                <div className="ion-text-center">
                                  <h2>{dailyNutrition.protein}g</h2>
                                  <IonLabel>Protein</IonLabel>
                                </div>
                              </IonCol>
                              <IonCol>
                                <div className="ion-text-center">
                                  <h2>{dailyNutrition.fat}g</h2>
                                  <IonLabel>Fat</IonLabel>
                                </div>
                              </IonCol>
                            </IonRow>
                          </IonGrid>
                        </IonCardContent>
                      </IonCard>
                    </IonCol>

                    <IonCol size="12" sizeMd="6">
                      <IonCard>
                        <IonCardHeader>
                          <IonCardTitle>Exercise Summary</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                          <IonGrid>
                            <IonRow>
                              <IonCol size="6">
                                <div className="ion-text-center">
                                  <h2>{totalDuration}</h2>
                                  <IonLabel>Minutes</IonLabel>
                                </div>
                              </IonCol>
                              <IonCol size="6">
                                <div className="ion-text-center">
                                  <h2>{exercises.length}</h2>
                                  <IonLabel>Activities</IonLabel>
                                </div>
                              </IonCol>
                            </IonRow>
                          </IonGrid>
                        </IonCardContent>
                      </IonCard>
                    </IonCol>
                  </IonRow>
                </IonGrid>

                {/* Schedule Items */}
                {selectedDayPlan.items.length === 0 ? (
                  <div className="ion-text-center ion-padding">
                    <IonIcon icon={calendar} size="large" color="medium" />
                    <h4>No Items Planned</h4>
                    <p>
                      Add your first meal or exercise to start planning your
                      day.
                    </p>
                    <IonButton onClick={() => setShowItemTypeModal(true)}>
                      <IonIcon slot="start" icon={add} />
                      Add Item
                    </IonButton>
                  </div>
                ) : (
                  <IonList>
                    {selectedDayPlan.items
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map((item) => (
                        <IonItem key={item.id}>
                          <IonIcon
                            slot="start"
                            icon={item.type === "meal" ? restaurant : fitness}
                            color={item.type === "meal" ? "primary" : "success"}
                          />
                          <IonLabel>
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>

                            {/* Time display */}
                            <IonChip>
                              <IonIcon icon={time} />
                              <IonLabel>{item.time}</IonLabel>
                            </IonChip>

                            {/* Meal specific display */}
                            {item.type === "meal" && (
                              <div className="ion-padding-top">
                                <IonGrid>
                                  <IonRow>
                                    <IonCol size="3">
                                      <IonLabel>
                                        Calories: {(item as Meal).calories}
                                      </IonLabel>
                                    </IonCol>
                                    <IonCol size="3">
                                      <IonLabel>
                                        Carbs: {(item as Meal).carbs}g
                                      </IonLabel>
                                    </IonCol>
                                    <IonCol size="3">
                                      <IonLabel>
                                        Protein: {(item as Meal).protein}g
                                      </IonLabel>
                                    </IonCol>
                                    <IonCol size="3">
                                      <IonLabel>
                                        Fat: {(item as Meal).fat}g
                                      </IonLabel>
                                    </IonCol>
                                  </IonRow>
                                </IonGrid>
                              </div>
                            )}

                            {/* Exercise specific display */}
                            {item.type === "exercise" && (
                              <div className="ion-padding-top">
                                <IonGrid>
                                  <IonRow>
                                    <IonCol size="4">
                                      <IonChip color="tertiary">
                                        {(item as Exercise).exerciseType}
                                      </IonChip>
                                    </IonCol>
                                    <IonCol size="4">
                                      <IonChip
                                        color={
                                          (item as Exercise).intensity === "low"
                                            ? "success"
                                            : (item as Exercise).intensity ===
                                              "moderate"
                                            ? "warning"
                                            : "danger"
                                        }
                                      >
                                        {(item as Exercise).intensity} intensity
                                      </IonChip>
                                    </IonCol>
                                    <IonCol size="4">
                                      <IonLabel>
                                        {(item as Exercise).duration} min
                                      </IonLabel>
                                    </IonCol>
                                  </IonRow>

                                  {/* Strength training details */}
                                  {(item as Exercise).exerciseType ===
                                    "strength" && (
                                    <IonRow>
                                      {(item as Exercise).sets && (
                                        <IonCol>
                                          <IonLabel>
                                            {(item as Exercise).sets} sets
                                          </IonLabel>
                                        </IonCol>
                                      )}
                                      {(item as Exercise).reps && (
                                        <IonCol>
                                          <IonLabel>
                                            {(item as Exercise).reps} reps
                                          </IonLabel>
                                        </IonCol>
                                      )}
                                      {(item as Exercise).weight && (
                                        <IonCol>
                                          <IonLabel>
                                            {(item as Exercise).weight} kg
                                          </IonLabel>
                                        </IonCol>
                                      )}
                                    </IonRow>
                                  )}
                                </IonGrid>
                              </div>
                            )}

                            {/* Notes if available */}
                            {item.notes && <IonNote>{item.notes}</IonNote>}
                          </IonLabel>
                          <IonButton
                            slot="end"
                            fill="clear"
                            color="danger"
                            onClick={() => deleteItem(item.id)}
                          >
                            <IonIcon icon={trash} />
                          </IonButton>
                        </IonItem>
                      ))}
                  </IonList>
                )}

                {/* Day Notes */}
                <div className="ion-margin-top">
                  <IonItem lines="none">
                    <IonLabel position="stacked">Day Notes</IonLabel>
                    <IonTextarea
                      value={dayNotes}
                      onIonChange={(e) => setDayNotes(e.detail.value || "")}
                      placeholder="Add notes for this day..."
                      rows={4}
                    />
                  </IonItem>
                  <div className="ion-text-end ion-padding">
                    <IonButton onClick={saveNotes}>Save Notes</IonButton>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        )}

        {/* FAB for adding items */}
        {activeTab === "daily" && (
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={() => setShowItemTypeModal(true)}>
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
        )}

        {/* Item Type Selection Modal */}
        <IonModal
          isOpen={showItemTypeModal}
          onDidDismiss={() => setShowItemTypeModal(false)}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Add to Your Day</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowItemTypeModal(false)}>
                  Cancel
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton
                    expand="block"
                    onClick={() => {
                      setShowItemTypeModal(false);
                      setShowMealModal(true);
                    }}
                  >
                    <IonIcon slot="start" icon={restaurant} />
                    Add Meal
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton
                    expand="block"
                    color="success"
                    onClick={() => {
                      setShowItemTypeModal(false);
                      setShowExerciseModal(true);
                    }}
                  >
                    <IonIcon slot="start" icon={fitness} />
                    Add Exercise
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>

        {/* Add Meal Modal */}
        <IonModal
          isOpen={showMealModal}
          onDidDismiss={() => setShowMealModal(false)}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Add Meal</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowMealModal(false)}>
                  Cancel
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddMeal();
              }}
            >
              <IonItem>
                <IonLabel position="stacked">Meal Name*</IonLabel>
                <IonInput
                  value={mealForm.name}
                  onIonChange={(e) =>
                    setMealForm({ ...mealForm, name: e.detail.value || "" })
                  }
                  placeholder="e.g., Breakfast, Lunch, Snack"
                  required
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Description</IonLabel>
                <IonInput
                  value={mealForm.description}
                  onIonChange={(e) =>
                    setMealForm({
                      ...mealForm,
                      description: e.detail.value || "",
                    })
                  }
                  placeholder="What you will eat..."
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Time*</IonLabel>
                <IonInput
                  type="time"
                  value={mealForm.time}
                  onIonChange={(e) =>
                    setMealForm({
                      ...mealForm,
                      time: e.detail.value || "08:00",
                    })
                  }
                  required
                />
              </IonItem>

              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">Calories*</IonLabel>
                      <IonInput
                        type="number"
                        value={mealForm.calories}
                        onIonChange={(e) =>
                          setMealForm({
                            ...mealForm,
                            calories: e.detail.value || "",
                          })
                        }
                        placeholder="kcal"
                        required
                      />
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">Carbs (g)*</IonLabel>
                      <IonInput
                        type="number"
                        value={mealForm.carbs}
                        onIonChange={(e) =>
                          setMealForm({
                            ...mealForm,
                            carbs: e.detail.value || "",
                          })
                        }
                        step="0.1"
                        required
                      />
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">Protein (g)*</IonLabel>
                      <IonInput
                        type="number"
                        value={mealForm.protein}
                        onIonChange={(e) =>
                          setMealForm({
                            ...mealForm,
                            protein: e.detail.value || "",
                          })
                        }
                        step="0.1"
                        required
                      />
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">Fat (g)*</IonLabel>
                      <IonInput
                        type="number"
                        value={mealForm.fat}
                        onIonChange={(e) =>
                          setMealForm({
                            ...mealForm,
                            fat: e.detail.value || "",
                          })
                        }
                        step="0.1"
                        required
                      />
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>

              <IonItem>
                <IonLabel position="stacked">Notes</IonLabel>
                <IonTextarea
                  value={mealForm.notes}
                  onIonChange={(e) =>
                    setMealForm({ ...mealForm, notes: e.detail.value || "" })
                  }
                  placeholder="Additional information..."
                  rows={3}
                />
              </IonItem>

              <div className="ion-padding ion-text-end">
                <IonButton type="submit">Add Meal</IonButton>
              </div>
            </form>
          </IonContent>
        </IonModal>

        {/* Add Exercise Modal */}
        <IonModal
          isOpen={showExerciseModal}
          onDidDismiss={() => setShowExerciseModal(false)}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Add Exercise</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowExerciseModal(false)}>
                  Cancel
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddExercise();
              }}
            >
              <IonItem>
                <IonLabel position="stacked">Exercise Name*</IonLabel>
                <IonInput
                  value={exerciseForm.name}
                  onIonChange={(e) =>
                    setExerciseForm({
                      ...exerciseForm,
                      name: e.detail.value || "",
                    })
                  }
                  placeholder="e.g., Walking, Push-ups, Yoga"
                  required
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Description</IonLabel>
                <IonInput
                  value={exerciseForm.description}
                  onIonChange={(e) =>
                    setExerciseForm({
                      ...exerciseForm,
                      description: e.detail.value || "",
                    })
                  }
                  placeholder="How you will do it..."
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Time*</IonLabel>
                <IonInput
                  type="time"
                  value={exerciseForm.time}
                  onIonChange={(e) =>
                    setExerciseForm({
                      ...exerciseForm,
                      time: e.detail.value || "08:00",
                    })
                  }
                  required
                />
              </IonItem>

              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">Type*</IonLabel>
                      <IonSelect
                        value={exerciseForm.exerciseType}
                        onIonChange={(e) =>
                          setExerciseForm({
                            ...exerciseForm,
                            exerciseType: e.detail.value,
                          })
                        }
                      >
                        <IonSelectOption value="cardio">Cardio</IonSelectOption>
                        <IonSelectOption value="strength">
                          Strength
                        </IonSelectOption>
                        <IonSelectOption value="flexibility">
                          Flexibility
                        </IonSelectOption>
                        <IonSelectOption value="balance">
                          Balance
                        </IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">Intensity</IonLabel>
                      <IonSelect
                        value={exerciseForm.intensity}
                        onIonChange={(e) =>
                          setExerciseForm({
                            ...exerciseForm,
                            intensity: e.detail.value,
                          })
                        }
                      >
                        <IonSelectOption value="low">Low</IonSelectOption>
                        <IonSelectOption value="moderate">
                          Moderate
                        </IonSelectOption>
                        <IonSelectOption value="high">High</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">
                        Duration (minutes)*
                      </IonLabel>
                      <IonInput
                        type="number"
                        value={exerciseForm.duration}
                        onIonChange={(e) =>
                          setExerciseForm({
                            ...exerciseForm,
                            duration: e.detail.value || "",
                          })
                        }
                        min="1"
                        required
                      />
                    </IonItem>
                  </IonCol>
                </IonRow>

                {/* Show strength training fields conditionally */}
                {exerciseForm.exerciseType === "strength" && (
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="stacked">Sets</IonLabel>
                        <IonInput
                          type="number"
                          value={exerciseForm.sets}
                          onIonChange={(e) =>
                            setExerciseForm({
                              ...exerciseForm,
                              sets: e.detail.value || "",
                            })
                          }
                          min="1"
                        />
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="stacked">Reps</IonLabel>
                        <IonInput
                          type="number"
                          value={exerciseForm.reps}
                          onIonChange={(e) =>
                            setExerciseForm({
                              ...exerciseForm,
                              reps: e.detail.value || "",
                            })
                          }
                          min="1"
                        />
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="stacked">Weight (kg)</IonLabel>
                        <IonInput
                          type="number"
                          value={exerciseForm.weight}
                          onIonChange={(e) =>
                            setExerciseForm({
                              ...exerciseForm,
                              weight: e.detail.value || "",
                            })
                          }
                          min="0"
                          step="0.5"
                        />
                      </IonItem>
                    </IonCol>
                  </IonRow>
                )}
              </IonGrid>

              <IonItem>
                <IonLabel position="stacked">Notes</IonLabel>
                <IonTextarea
                  value={exerciseForm.notes}
                  onIonChange={(e) =>
                    setExerciseForm({
                      ...exerciseForm,
                      notes: e.detail.value || "",
                    })
                  }
                  placeholder="Additional information..."
                  rows={3}
                />
              </IonItem>

              <div className="ion-padding ion-text-end">
                <IonButton type="submit" color="success">
                  Add Exercise
                </IonButton>
              </div>
            </form>
          </IonContent>
        </IonModal>

        {/* Toast */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          position="bottom"
        />
      </IonContent>
    </IonPage>
  );
};

export default HealthPlanEditor;

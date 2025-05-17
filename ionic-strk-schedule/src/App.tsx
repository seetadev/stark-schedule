import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact,
  useIonRouter,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  person,
  calendar,
  people,
  add,
  home,
  analytics,
  medkit,
  documentText,
  barbellOutline,
} from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import Landing from "./pages/Landing";
import { useEffect, useRef, useState } from "react";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CalendarPage from "./pages/Calendar";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import HealthRecordsForm from "./pages/HealthRecordsForm";
import BloodSugarTracking from "./pages/BloodSugarTracking";
import MedicationManagement from "./pages/MedicationManagement";
import NewAppointment from "./pages/NewAppointment";
import { Providers } from "./components/layout/Providers";
// import WalletBar from "./components/layout/WalletBar";
import React from "react";
import { AuthProvider } from "./auth/AuthContext";
import { useAuthContext } from "./auth/useAuthContext";
import HealthPlanEditor from "./pages/ExerciseMeal";
// ...other imports

// const WalletBar = lazy(() => import("./components/layout/WalletBar"));

setupIonicReact();

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuthContext();
  // const [isAuthenticated, setIsAuthenticated] = useState(true); // Replace with actual authentication logic
  const [showDrawer, setShowDrawer] = useState(false);
  const modalRef = useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    console.log("autehndsf", isAuthenticated);
  }, [isAuthenticated]);

  interface QuickActionItemProps {
    path: string;
    icon: string;
    label: string;
    color: string;
  }

  const QuickActionItem = ({
    path,
    icon,
    label,
    color,
  }: QuickActionItemProps) => {
    const router = useIonRouter();

    const handleClick = () => {
      router.push(path, "forward", "push");
      setShowDrawer(false);
    };

    return (
      <IonItem button detail={true} onClick={handleClick}>
        <IonIcon icon={icon} slot="start" color={color} />
        <IonLabel>{label}</IonLabel>
      </IonItem>
    );
  };

  return (
    <IonApp>
      <IonReactRouter>
        {/* {!isAuthenticated && ( */}

        {!isAuthenticated ? (
          <IonRouterOutlet>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route>
              <Redirect to="/" />
            </Route>
          </IonRouterOutlet>
        ) : (
          <>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/home" component={Dashboard} />
                <Route exact path="/schedule" component={CalendarPage} />
                <Route exact path="/dao" component={Community} />
                <Route exact path="/profile" component={Profile} />
                <Route
                  exact
                  path="/medical-form"
                  component={HealthRecordsForm}
                />
                <Route exact path="/readings" component={BloodSugarTracking} />
                <Route
                  exact
                  path="/medication"
                  component={MedicationManagement}
                />
                <Route exact path="/daily-health-plan">
                  <HealthPlanEditor />
                </Route>
                <Route exact path="/appointments">
                  <NewAppointment />
                </Route>
                <Route exact path="/register" component={Dashboard} />
                <Route>
                  <Redirect to="/home" />
                </Route>
              </IonRouterOutlet>
              <IonTabBar
                slot="bottom"
                style={{
                  position: "relative",
                  overflow: "visible",
                  zIndex: "1",
                }}
              >
                <IonTabButton tab="home" href="/home">
                  <IonIcon aria-hidden="true" icon={home} />
                  <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="schedule" href="/schedule">
                  <IonIcon aria-hidden="true" icon={calendar} />
                  <IonLabel>Schedule</IonLabel>
                </IonTabButton>

                {/* Add button opens drawer instead of navigating */}
                <IonTabButton
                  tab="add"
                  onClick={() => setShowDrawer(true)}
                  style={{
                    height: "100%",
                    position: "relative",
                    background: "transparent",
                    overflow: "visible",
                    // Add these properties:
                    contain: "none",
                    marginTop: "-30px", // Pull the entire button up a bit
                  }}
                  className="add-tab-button"
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0px", // Reduce this value from -25px
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      backgroundColor: "var(--ion-color-primary)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                      zIndex: "100", // Make this a string to satisfy TypeScript
                    }}
                  >
                    <IonIcon
                      aria-hidden="true"
                      icon={add}
                      style={{
                        fontSize: "32px",
                        color: "white",
                      }}
                    />
                  </div>
                </IonTabButton>
                <IonTabButton tab="dao" href="/dao">
                  <IonIcon aria-hidden="true" icon={people} />
                  <IonLabel>Community</IonLabel>
                </IonTabButton>
                <IonTabButton tab="profile" href="/profile">
                  <IonIcon aria-hidden="true" icon={person} />
                  <IonLabel>Profile</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
            <IonModal
              ref={modalRef}
              isOpen={showDrawer}
              initialBreakpoint={0.4}
              breakpoints={[0, 0.4, 0.75]}
              onDidDismiss={() => setShowDrawer(false)}
              className="bottom-drawer"
            >
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Quick Actions</IonTitle>
                  <IonButton
                    slot="end"
                    fill="clear"
                    onClick={() => setShowDrawer(false)}
                  >
                    Close
                  </IonButton>
                </IonToolbar>
              </IonHeader>
              <IonContent>
                <IonList>
                  <QuickActionItem
                    path="/appointments"
                    icon={calendar}
                    label="New Appointment"
                    color="primary"
                  />
                  <QuickActionItem
                    path="/medication"
                    icon={medkit}
                    label="New Medication"
                    color="tertiary"
                  />
                  <QuickActionItem
                    path="/daily-health-plan"
                    icon={barbellOutline}
                    label="Meal & Exercise Plan"
                    color="success"
                  />

                  <QuickActionItem
                    path="/readings"
                    icon={analytics}
                    label="Blood Sugar Reading"
                    color="warning"
                  />
                </IonList>
              </IonContent>
            </IonModal>
          </>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

const App: React.FC = () => {
  return (
    <Providers>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Providers>
  );
};

export default App;

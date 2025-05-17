// import WalletBar from "@/components/layout/WalletBar";
import {
  IonPage,
  IonContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  // useIonRouter,
} from "@ionic/react";
import React, { lazy, Suspense, useEffect } from "react";
// import { useIsUserRegistered } from "@/hooks/contractRead";
// import { useAccount } from "@starknet-react/core";
// import { useEffect } from "react";
// ...other imports

const WalletBar = lazy(() => import("../components/layout/WalletBar"));

const Landing = () => {
  // const router = useIonRouter();
  // const { address, status } = useAccount();

  // // Call your hook to check if user is registered
  // const { isRegistered, isLoading, isError } = useIsUserRegistered({
  //   accountAddress: address,
  // });

  // // Handle navigation based on registration status
  // useEffect(() => {
  //   // Only proceed if wallet is connected and data is loaded
  //   if (status === "connected" && !isLoading && !isError) {
  //     // If we have a result and the user is registered
  //     if (isRegistered === true) {
  //       // Navigate to home
  //       router.push("/home", "forward", "push");
  //     } else if (isRegistered === false) {
  //       // If user is not registered, navigate to register page
  //       router.push("/register", "forward", "push");
  //     }
  //     // If isRegistered is undefined, we're still waiting for data or no wallet connected
  //   }
  // }, [isRegistered, isLoading, status, router, isError]);

  useEffect(() => {
    console.log("Landing component rendered");
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Hero Section */}
        <section
          style={{
            background: "linear-gradient(to bottom, #00b894, #00cec9)",
            color: "white",
            padding: "4rem 1rem",
          }}
        >
          <IonGrid style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <IonRow class="ion-align-items-center">
              <IonCol sizeMd="6" size="12">
                <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
                  Manage Diabetes with Web3 Technology
                </h1>
                <IonText>
                  <p style={{ fontSize: "1.1rem", margin: "1rem 0" }}>
                    STRK Schedule helps you track blood sugar, medication, and
                    activities while earning rewards on Starknet blockchain.
                  </p>
                </IonText>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    maxWidth: "300px",
                  }}
                >
                  <IonButton expand="block" color="light" href="/register">
                    Get Started
                  </IonButton>
                  {/* <IonButton
                    expand="block"
                    fill="outline"
                    color="light"
                    onClick={goToRegister}
                  >
                    Connect
                  </IonButton> */}
                  <Suspense fallback={<div>Loading wallet...</div>}>
                    <WalletBar />
                  </Suspense>
                </div>
              </IonCol>
              <IonCol sizeMd="6" size="12" class="ion-hide-sm-down">
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    padding: "1rem",
                    borderRadius: "1rem",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1576169210859-6796c4b93c32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Patient using STRK Schedule app"
                    style={{ width: "100%", borderRadius: "0.75rem" }}
                  />
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </section>

        {/* Features Section */}
        <section style={{ padding: "4rem 1rem" }}>
          <IonGrid>
            <h2
              style={{
                textAlign: "center",
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "2rem",
              }}
            >
              How STRK Schedule Works
            </h2>
            <IonRow>
              {features.map((feature, index) => (
                <IonCol size="12" sizeMd="4" key={index}>
                  <FeatureCard {...feature} />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </section>

        {/* CTA Section */}
        <section
          style={{
            padding: "4rem 1rem",
            textAlign: "center",
          }}
        >
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <h2
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                  }}
                >
                  Ready to Take Control of Your Health?
                </h2>
                <p
                  style={{
                    fontSize: "1.1rem",
                    color: "#636e72",
                    marginBottom: "2rem",
                  }}
                >
                  Join thousands of users who are managing their diabetes more
                  effectively with Web3 technology.
                </p>
                <IonButton color="success" href="/register">
                  Get Started Now
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </section>

        {/* Footer Section */}
        <footer
          style={{
            backgroundColor: "#2d3436",
            color: "white",
            padding: "2rem 1rem",
          }}
        >
          <IonGrid>
            <IonRow class="ion-justify-content-between ion-align-items-center">
              <IonCol size="12" sizeMd="6">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      backgroundColor: "#00b894",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "0.5rem",
                      fontWeight: "bold",
                      fontSize: "1.25rem",
                    }}
                  >
                    S
                  </div>
                  <span style={{ fontSize: "1.25rem", fontWeight: "500" }}>
                    STRK Schedule
                  </span>
                </div>
              </IonCol>
              <IonCol size="12" sizeMd="6">
                <div
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    justifyContent: "center",
                    marginTop: "1rem",
                  }}
                >
                  <a href="#" style={{ color: "#dfe6e9" }}>
                    Terms
                  </a>
                  <a href="#" style={{ color: "#dfe6e9" }}>
                    Privacy
                  </a>
                  <a href="#" style={{ color: "#dfe6e9" }}>
                    Contact
                  </a>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <p
                  style={{
                    marginTop: "1rem",
                    fontSize: "0.875rem",
                    color: "#b2bec3",
                    textAlign: "center",
                  }}
                >
                  &copy; {new Date().getFullYear()} STRK Schedule. All rights
                  reserved.
                </p>
              </IonCol>
            </IonRow>
          </IonGrid>
        </footer>
      </IonContent>
    </IonPage>
  );
};

const features = [
  {
    icon: "🔍",
    title: "Track Health Metrics",
    description:
      "Monitor blood sugar, HbA1c, weight, and other health indicators in one place.",
  },
  {
    icon: "💊",
    title: "Medication Management",
    description:
      "Never miss a dose with reminders and inventory tracking for your medicines.",
  },
  {
    icon: "📆",
    title: "Smart Scheduling",
    description:
      "Manage appointments, meals, and exercise routines with our intelligent calendar.",
  },
  {
    icon: "💎",
    title: "Earn STRK Rewards",
    description:
      "Receive STRK tokens for maintaining healthy habits and achieving goals.",
  },
  {
    icon: "🔐",
    title: "Web3 Data Security",
    description:
      "Your health data is secured and verified on the Starknet blockchain.",
  },
  {
    icon: "👥",
    title: "Community Governance",
    description:
      "Join our DAO to participate in decisions and earn additional rewards.",
  },
];

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => (
  <IonCard style={{ height: "100%", borderRadius: "1rem" }}>
    <IonCardHeader>
      <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{icon}</div>
      <IonCardTitle>{title}</IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      <p>{description}</p>
    </IonCardContent>
  </IonCard>
);

export default Landing;

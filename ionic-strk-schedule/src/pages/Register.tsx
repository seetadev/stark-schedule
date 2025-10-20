import { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonInput,
  IonLabel,
  IonItem,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol,
  // IonRouterLink,
  useIonLoading,
  // useIonRouter,
  IonToast,
} from "@ionic/react";
import { motion, AnimatePresence } from "framer-motion";
import {} from "@ionic/react";
import { useRegisterUser } from "../hooks/contractWrite"; // Import the hook
import { useAccount } from "@starknet-react/core"; // Import to get account
import React, { lazy, Suspense } from "react";
import { useAuthContext } from "@/auth/useAuthContext";
import { uploadProfileToPinata } from "@/utils/ipfsStorage";
import { useIsUserRegistered } from "@/hooks/contractRead";

// import { useIsUserRegistered } from "@/hooks/contractRead";
// import { useAccount } from "@starknet-react/core";
// import { useEffect } from "react";
// ...other imports

const WalletBar = lazy(() => import("../components/layout/WalletBar"));
const animations = {
  card: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  },
  stepBar: (active: boolean) => ({
    initial: { backgroundColor: "#e0e0e0" },
    animate: {
      backgroundColor: active ? "var(--ion-color-primary)" : "#e0e0e0",
      transition: { duration: 0.3 },
    },
  }),
};

const Register: React.FC = () => {
  const { address, status } = useAccount(); // Get StarkNet account
  const [present, dismiss] = useIonLoading(); // For loading indicator
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("success");
  const { login } = useAuthContext();
  const { isRegistered } = useIsUserRegistered({ accountAddress: address });
  // Get register function from our custom hook
  const { registerUser } = useRegisterUser();

  // Update skipRegisteration to require wallet connection
  // const skipRegisteration = () => {
  //   if (status !== "connected") {
  //     setToastMessage("Please connect your wallet first");
  //     setToastColor("warning");
  //     setShowToast(true);
  //     return;
  //   }

  //   if (step == 1) {
  //     setStep(2);
  //   } else {
  //     login();
  //     // window.location.href = "/home";
  //   }
  // };
  useEffect(() => {
    if (isRegistered) {
      console.log("User is registered", isRegistered);
      login();
    }
  }, [isRegistered, login]);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "user",
    email: "abc@gmail.com",
    phone: "9343243253",
    password: "abcsdfsd",
    street: "144 new street",
    city: "abc",
    state: "hp",
    country: "abc",
    postalCode: "342432",
    age: "21",
    gender: "male",
    height: "6",
    weight: "74",
    weightUnit: "kg",
  });

  const handleChange = (name: string, value: string | null) => {
    setFormData((prev) => ({ ...prev, [name]: value || "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    if (status !== "connected") {
      setToastMessage("Please connect your wallet first");
      setToastColor("warning");
      setShowToast(true);
      return;
    }

    console.log("address: ", address);
    // Check if wallet is connected
    if (status !== "connected") {
      setToastMessage("Please connect your wallet first");
      setToastColor("warning");
      setShowToast(true);
      return;
    }

    try {
      // Show loading indicator
      await present({
        message: "Registering your profile on StarkNet...",
        spinner: "circular",
        duration: 0,
      });

      const sensitiveData = {
        email: formData.email,
        phone: formData.phone,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        postalCode: formData.postalCode,
      };

      const ipfsHash = await uploadProfileToPinata(sensitiveData);
      const hashMiddle = Math.floor(ipfsHash.length / 2);

      // Split the hash into two parts
      const ipfsHashFirstHalf = ipfsHash.substring(0, hashMiddle);
      const ipfsHashSecondHalf = ipfsHash.substring(hashMiddle);

      await registerUser(
        formData.name,
        formData.age,
        formData.gender || "Not specified",
        formData.phone,
        ipfsHashFirstHalf,
        ipfsHashSecondHalf
      );

      // Handle success
      dismiss();
      setToastMessage("Registration successful!");
      setToastColor("success");
      setShowToast(true);
      login();
    } catch (err: unknown) {
      dismiss();
      console.error("Error during registration:", err);
      if (err instanceof Error) {
        // Handle error
        setToastMessage(`Registration failed: ${err.message}`);
      } else {
        setToastMessage("Registration failed: An unknown error occurred");
        setToastColor("danger");
        setShowToast(true);
        console.error(err);
      }
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding ion-flex ion-justify-content-center ion-align-items-center">
        <Suspense fallback={<div>Loading wallet...</div>}>
          <WalletBar />
        </Suspense>
        <IonGrid fixed>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`step-${step}`}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={animations.card}
                >
                  <IonCard>
                    <IonCardHeader className="ion-text-center">
                      <div className="ion-padding-bottom">
                        <div className="bg-primary text-white rounded-xl w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto">
                          S
                        </div>
                      </div>
                      <IonCardTitle>Complete Your Profile</IonCardTitle>
                      <IonCardSubtitle>
                        {step === 1
                          ? "Enter your basic information to get started"
                          : "Add your contact details to complete registration"}
                      </IonCardSubtitle>
                    </IonCardHeader>

                    <form onSubmit={handleSubmit}>
                      <IonCardContent>
                        {step === 1 ? (
                          <>
                            <IonItem>
                              <IonLabel position="floating">Full Name</IonLabel>
                              <IonInput
                                className="ion-margin-top"
                                required
                                value={formData.name}
                                onIonChange={(e) =>
                                  handleChange("name", e.detail.value ?? "")
                                }
                                placeholder="Enter Your Name"
                              />
                            </IonItem>
                            <IonItem>
                              <IonLabel position="floating">Email</IonLabel>
                              <IonInput
                                className="ion-margin-top"
                                type="email"
                                required
                                value={formData.email}
                                onIonChange={(e) =>
                                  handleChange("email", e.detail.value ?? "")
                                }
                                placeholder="name@example.com"
                              />
                            </IonItem>
                            <IonItem>
                              <IonLabel position="floating">
                                Phone Number
                              </IonLabel>
                              <IonInput
                                className="ion-margin-top"
                                required
                                value={formData.phone}
                                onIonChange={(e) =>
                                  handleChange("phone", e.detail.value ?? "")
                                }
                                placeholder="Enter Your Phone Number"
                              />
                            </IonItem>
                            {/* <IonItem> */}
                            {/* <IonLabel position="floating">Password</IonLabel>
                              <IonInput
                                className="ion-margin-top"
                                type="password"
                                required
                                value={formData.password}
                                onIonChange={(e) =>
                                  handleChange("password", e.detail.value ?? "")
                                }
                                placeholder="Enter your password"
                              /> */}
                            {/* </IonItem> */}
                          </>
                        ) : (
                          <>
                            <IonItem>
                              <IonLabel position="floating">
                                Street Address
                              </IonLabel>
                              <IonInput
                                className="ion-margin-top"
                                required
                                value={formData.street}
                                onIonChange={(e) =>
                                  handleChange("street", e.detail.value ?? "")
                                }
                                placeholder="Your Street Address"
                              />
                            </IonItem>
                            <IonRow>
                              <IonCol size="6">
                                <IonItem>
                                  <IonLabel position="floating">City</IonLabel>
                                  <IonInput
                                    className="ion-margin-top"
                                    required
                                    value={formData.city}
                                    onIonChange={(e) =>
                                      handleChange("city", e.detail.value ?? "")
                                    }
                                    placeholder="Your City"
                                  />
                                </IonItem>
                              </IonCol>
                              <IonCol size="6">
                                <IonItem>
                                  <IonLabel position="floating">State</IonLabel>
                                  <IonInput
                                    className="ion-margin-top"
                                    required
                                    value={formData.state}
                                    onIonChange={(e) =>
                                      handleChange(
                                        "state",
                                        e.detail.value ?? ""
                                      )
                                    }
                                    placeholder="Your State"
                                  />
                                </IonItem>
                              </IonCol>
                            </IonRow>
                            <IonRow>
                              <IonCol size="6">
                                <IonItem>
                                  <IonLabel position="floating">
                                    Country
                                  </IonLabel>
                                  <IonInput
                                    className="ion-margin-top"
                                    required
                                    value={formData.country}
                                    onIonChange={(e) =>
                                      handleChange(
                                        "country",
                                        e.detail.value ?? ""
                                      )
                                    }
                                    placeholder="Your Country"
                                  />
                                </IonItem>
                              </IonCol>
                              <IonCol size="6">
                                <IonItem>
                                  <IonLabel position="floating">
                                    Postal Code
                                  </IonLabel>
                                  <IonInput
                                    className="ion-margin-top"
                                    required
                                    value={formData.postalCode}
                                    onIonChange={(e) =>
                                      handleChange(
                                        "postalCode",
                                        e.detail.value ?? ""
                                      )
                                    }
                                    placeholder="10001"
                                  />
                                </IonItem>
                              </IonCol>
                            </IonRow>
                          </>
                        )}

                        <div className="ion-text-center ion-padding-top">
                          <div className="flex justify-center gap-2">
                            {[1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="rounded-full h-2 w-8"
                                variants={animations.stepBar(i === step)}
                                initial="initial"
                                animate="animate"
                              />
                            ))}
                          </div>
                        </div>

                        <div className="ion-padding-top">
                          <IonButton expand="block" type="submit">
                            {step === 1 ? "Continue" : "Create Account"}
                          </IonButton>
                          {/* <IonButton
                            expand="block"
                            fill="outline"
                            className="ion-margin-top"
                            onClick={skipRegisteration}
                          >
                            Skip for now
                          </IonButton> */}
                          {step !== 1 && (
                            <IonButton
                              expand="block"
                              fill="clear"
                              className="ion-margin-top"
                              onClick={() => setStep(1)}
                            >
                              Back
                            </IonButton>
                          )}
                        </div>
                      </IonCardContent>
                    </form>
                  </IonCard>
                </motion.div>
              </AnimatePresence>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={5000}
          color={toastColor}
        />
      </IonContent>
    </IonPage>
  );
};

export default Register;

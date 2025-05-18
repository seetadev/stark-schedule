import { useEffect, useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonSkeletonText,
  IonSpinner,
  IonToast,
  useIonLoading,
} from "@ionic/react";
import { profileData } from "@/contants/profile";
import { useGetProfile } from "@/hooks/contractRead";
import { shortString } from "starknet";
import { alertCircleOutline, checkmarkCircleOutline } from "ionicons/icons";
import { useAccount } from "@starknet-react/core";
import { useUpdateProfile } from "@/hooks/contractWrite";
import {
  retrieveProfileFromIpfs,
  uploadProfileToPinata,
} from "@/utils/ipfsStorage";
// import { profileData as defaultProfileData } from "@/contants/profile";

interface ProfileInfoProps {
  isEditing: boolean; // Make it optional with ? or required without
  setEditing?: () => void; // Optional save handler
}

const ProfileInfoTab: React.FC<ProfileInfoProps> = ({
  isEditing,
  setEditing = () => {}, // Default to a no-op function
}) => {
  // Use state with initial values from the JSON data
  const [profile, setProfile] = useState(profileData);
  const [date, setDate] = useState<string>(profile.dateOfBirth);
  const { address } = useAccount();

  // Fetch profile data from contract
  const {
    profile: userProfileData,
    isLoading: profileLoading,
    isError: profileError,
  } = useGetProfile({ accountAddress: address });

  // Fetch weight unit from contract
  // const { unit, isLoading: unitLoading } = useGetWeightUnit({
  //   accountAddress: address,
  // });

  // // Fetch weight from contract
  // const { weight, isLoading: weightLoading } = useGetWeight({
  //   accountAddress: address,
  // });
  // Local state for form data
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("success");

  // Update local state when contract data is fetched
  useEffect(() => {
    const updateProfile = async () => {
      console.log("profileData", userProfileData);
      if (userProfileData && !profileLoading) {
        try {
          // Decode felt252 strings from contract
          const name = shortString.decodeShortString(
            userProfileData.name?.toString()
          );
          const gender = shortString.decodeShortString(
            userProfileData.gender?.toString()
          );
          const phoneNumber = shortString.decodeShortString(
            userProfileData.phone?.toString()
          );
          const ipfsHash1 = shortString.decodeShortString(
            userProfileData.ipfs_hash1?.toString()
          );
          const ipfsHash2 = shortString.decodeShortString(
            userProfileData.ipfs_hash2?.toString()
          );
          const combinedIpfsHash = ipfsHash1 + ipfsHash2;
          const ipfsData = await retrieveProfileFromIpfs(combinedIpfsHash);
          const nameParts = name.split(" ");
          const firstName = nameParts[0] || "";
          const lastName = nameParts.slice(1).join(" ") || "";
          console.log("ipfsData", ipfsData);
          // Update profile state with contract data
          setDate(ipfsData?.dateOfBirth || profile.dateOfBirth);
          setProfile((prev) => ({
            ...prev,
            firstName,
            lastName,
            phoneNumber,
            gender,
            age: userProfileData.age?.toString() || prev.age,
            email: ipfsData?.email || prev.email,
            dateOfBirth: ipfsData?.dateOfBirth || prev.dateOfBirth,
            address: {
              ...prev.address,
              street: ipfsData?.street || prev.address.street,
              city: ipfsData?.city || prev.address.city,
              state: ipfsData?.state || prev.address.state,
              country: ipfsData?.country || prev.address.country,
              postalCode: ipfsData?.postalCode || prev.address.postalCode,
            },
          }));
        } catch (error) {
          console.error("Error parsing contract data:", error);
          setToastMessage("Error parsing profile data from contract");
          setToastColor("danger");
          setShowToast(true);
        }
      }
    };
    updateProfile();
  }, [userProfileData, profileLoading, profile.dateOfBirth]);

  // Update handler for form inputs
  const handleChange = (field: string, value: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setProfile({
        ...profile,
        [parent]: {
          ...(profile[parent as keyof typeof profile] as Record<
            string,
            string
          >),
          [child]: value,
        },
      });
    } else {
      setProfile({
        ...profile,
        [field]: value,
      });
    }
  };
  // Add these to your existing hooks
  const [present, dismiss] = useIonLoading();
  const { updateProfile } = useUpdateProfile();
  const { status } = useAccount();

  // ...existing code...

  const handleSave = async () => {
    // Check wallet connection
    if (status !== "connected") {
      setToastMessage("Please connect your wallet first");
      setToastColor("warning");
      setShowToast(true);
      return;
    }

    try {
      // Show loading indicator
      await present({
        message: "Updating your profile on StarkNet...",
        spinner: "circular",
        duration: 0,
      });

      // Prepare sensitive data for IPFS storage
      const sensitiveData = {
        email: profile.email,
        phone: profile.phoneNumber,
        street: profile.address.street,
        city: profile.address.city,
        state: profile.address.state,
        country: profile.address.country,
        postalCode: profile.address.postalCode,
        dateOfBirth: date,
      };
      // Upload to IPFS
      const ipfsHash = await uploadProfileToPinata(sensitiveData);
      console.log("IPFS data stored with hash:", ipfsHash);

      const hashMiddle = Math.floor(ipfsHash.length / 2);

      // Split the hash into two parts
      const ipfsHashFirstHalf = ipfsHash.substring(0, hashMiddle);
      const ipfsHashSecondHalf = ipfsHash.substring(hashMiddle);

      // Format name for contract (combine first and last name)
      const fullName = `${profile.firstName} ${profile.lastName}`.trim();

      // Call contract update function
      console.log("Updating profile on blockchain");
      await updateProfile(
        fullName,
        profile.age || "0", // Default age if not provided
        profile.gender || "Not specified",
        profile.phoneNumber || "Not specified",
        ipfsHashFirstHalf,
        ipfsHashSecondHalf
      );

      // Handle success
      dismiss();
      setToastMessage("Profile updated successfully!");
      setToastColor("success");
      setShowToast(true);
      setEditing(); // Exit edit mode
    } catch (err: unknown) {
      // Dismiss loading indicator
      dismiss();

      // Handle error
      console.error("Error updating profile:", err);
      if (err instanceof Error) {
        setToastMessage(`Update failed: ${err.message}`);
      } else {
        setToastMessage("Update failed: An unknown error occurred");
      }
      setToastColor("danger");
      setShowToast(true);
    }
  };

  // Show loading state while fetching data
  if (profileLoading) {
    return (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>
            <IonSkeletonText animated style={{ width: "50%" }} />
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent className="ion-text-center ion-padding">
          <IonSpinner name="crescent" />
          <p>Loading profile data...</p>
        </IonCardContent>
      </IonCard>
    );
  }

  // Show error state
  if (profileError) {
    return (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle color="danger">Error Loading Profile</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p>
            There was an error loading your profile data from the blockchain.
          </p>
          <IonButton color="primary" onClick={() => window.location.reload()}>
            Retry
          </IonButton>
        </IonCardContent>
      </IonCard>
    );
  }

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Profile Information</IonCardTitle>
          <IonCardSubtitle>
            Manage your personal details and contact information
          </IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          <form>
            <IonGrid>
              <IonRow>
                <IonCol size="12" sizeMd="6">
                  <IonItem>
                    <IonLabel position="floating">First Name</IonLabel>
                    <IonInput
                      className="ion-margin-top"
                      value={profile.firstName}
                      disabled={!isEditing}
                      onIonChange={(e) =>
                        handleChange("firstName", e.detail.value!)
                      }
                    />
                  </IonItem>
                </IonCol>
                <IonCol size="12" sizeMd="6">
                  <IonItem>
                    <IonLabel position="floating">Last Name</IonLabel>
                    <IonInput
                      className="ion-margin-top"
                      value={profile.lastName}
                      disabled={!isEditing}
                      onIonChange={(e) =>
                        handleChange("lastName", e.detail.value!)
                      }
                    />
                  </IonItem>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12" sizeMd="6">
                  <IonItem>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput
                      className="ion-margin-top"
                      type="email"
                      value={profile.email}
                      disabled={!isEditing}
                      onIonChange={(e) =>
                        handleChange("email", e.detail.value!)
                      }
                    />
                  </IonItem>
                </IonCol>
                <IonCol size="12" sizeMd="6">
                  <IonItem>
                    <IonLabel position="floating">Phone Number</IonLabel>
                    <IonInput
                      className="ion-margin-top"
                      value={profile.phoneNumber}
                      disabled={!isEditing}
                      onIonChange={(e) =>
                        handleChange("phoneNumber", e.detail.value!)
                      }
                    />
                  </IonItem>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12" sizeMd="6">
                  <IonItem>
                    <IonLabel position="floating">Date of Birth</IonLabel>
                    <IonInput
                      className="ion-margin-top"
                      value={
                        date
                          ? new Date(date).toLocaleDateString()
                          : "Date of Birth Not Added"
                      }
                      disabled={!isEditing}
                      readonly={true}
                      id="birth-date-input"
                    />
                  </IonItem>
                  {/* The date picker modal */}

                  {isEditing && (
                    <IonDatetime
                      id="datetime"
                      value={date}
                      presentation="date"
                      onIonChange={(e) => {
                        const newValue = e.detail.value as string;
                        setDate(newValue);
                        handleChange("dateOfBirth", newValue);
                      }}
                    />
                  )}
                </IonCol>
                <IonCol size="12" sizeMd="6">
                  <IonItem>
                    <IonLabel position="floating">Age</IonLabel>
                    <IonInput
                      className="ion-margin-top"
                      value={profile.age}
                      disabled={!isEditing}
                      onIonChange={(e) => handleChange("age", e.detail.value!)}
                    />
                  </IonItem>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonLabel position="floating">Gender</IonLabel>
                    <IonSelect
                      className="ion-margin-top"
                      value={profile.gender}
                      onIonChange={(e) =>
                        handleChange("gender", e.detail.value)
                      }
                      disabled={!isEditing}
                    >
                      <IonSelectOption value="male">Male</IonSelectOption>
                      <IonSelectOption value="female">Female</IonSelectOption>
                      <IonSelectOption value="nonbinary">
                        Non-binary
                      </IonSelectOption>
                      <IonSelectOption value="other">Other</IonSelectOption>
                      <IonSelectOption value="prefer-not">
                        Prefer not to say
                      </IonSelectOption>
                    </IonSelect>
                  </IonItem>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonLabel position="floating">Street Address</IonLabel>
                    <IonInput
                      className="ion-margin-top"
                      value={profile.address.street}
                      disabled={!isEditing}
                      onIonChange={(e) =>
                        handleChange("address.street", e.detail.value!)
                      }
                    />
                  </IonItem>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12" sizeMd="6">
                  <IonItem>
                    <IonLabel position="floating">City</IonLabel>
                    <IonInput
                      className="ion-margin-top"
                      value={profile.address.city}
                      onIonChange={(e) =>
                        handleChange("address.city", e.detail.value!)
                      }
                      disabled={!isEditing}
                    />
                  </IonItem>
                </IonCol>
                <IonCol size="12" sizeMd="6">
                  <IonItem>
                    <IonLabel position="floating">State</IonLabel>
                    <IonInput
                      className="ion-margin-top"
                      value={profile.address.state}
                      onIonChange={(e) =>
                        handleChange("address.state", e.detail.value!)
                      }
                      disabled={!isEditing}
                    />
                  </IonItem>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12" sizeMd="6">
                  <IonItem>
                    <IonLabel position="floating">Country</IonLabel>
                    <IonInput
                      className="ion-margin-top"
                      value={profile.address.country}
                      onIonChange={(e) =>
                        handleChange("address.country", e.detail.value!)
                      }
                      disabled={!isEditing}
                    />
                  </IonItem>
                </IonCol>
                <IonCol size="12" sizeMd="6">
                  <IonItem>
                    <IonLabel position="floating">Postal Code</IonLabel>
                    <IonInput
                      className="ion-margin-top"
                      value={profile.address.postalCode}
                      onIonChange={(e) =>
                        handleChange("address.postalCode", e.detail.value!)
                      }
                      disabled={!isEditing}
                    />
                  </IonItem>
                </IonCol>
              </IonRow>

              <IonRow className="ion-padding-top ion-justify-content-end">
                <IonCol size="12" className="ion-text-end">
                  <IonButton
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSave();
                    }}
                    disabled={!isEditing}
                  >
                    Save Changes
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </form>
        </IonCardContent>
      </IonCard>
      {/* Toast notification */}
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        position="bottom"
        duration={3000}
        color={toastColor}
        icon={
          toastColor === "success" ? checkmarkCircleOutline : alertCircleOutline
        }
      />
    </>
  );
};

export default ProfileInfoTab;

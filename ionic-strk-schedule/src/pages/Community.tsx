import { useState } from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonIcon,
  IonBadge,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonSegment,
  IonSegmentButton,
  IonProgressBar,
  IonList,
  IonAvatar,
  IonSearchbar,
  IonText,
} from "@ionic/react";
import {
  personOutline,
  ribbonOutline,
  bookOutline,
  heartOutline,
  checkmarkOutline,
  closeOutline,
  documentTextOutline,
} from "ionicons/icons";
import Header from "@/components/layout/Header";

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <IonPage>
      <Header />

      <IonContent className="ion-padding">
        <h1
          style={{ fontSize: "24px", fontWeight: "bold", margin: "0 0 8px 0" }}
        >
          Diabetes Care DAO
        </h1>
        <IonText
          color="medium"
          style={{ display: "block", marginBottom: "24px" }}
        >
          Join our decentralized community to improve diabetes care
        </IonText>

        <IonSegment
          value={activeTab}
          onIonChange={(e) => setActiveTab(e.detail.value as string)}
        >
          <IonSegmentButton value="overview">
            <IonLabel>Overview</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="proposals">
            <IonLabel>Proposals</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="rewards">
            <IonLabel>Rewards</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="members">
            <IonLabel>Members</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="ion-margin-top">
            <IonGrid>
              <IonRow>
                <IonCol size="12" sizeMd="6">
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>DAO Summary</IonCardTitle>
                      <IonCardSubtitle>
                        Community statistics and metrics
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonList lines="none">
                        <IonItem>
                          <IonLabel color="medium">Total Members</IonLabel>
                          <IonText style={{ fontWeight: 500 }}>2,345</IonText>
                        </IonItem>
                        <IonItem>
                          <IonLabel color="medium">Active Proposals</IonLabel>
                          <IonText style={{ fontWeight: 500 }}>8</IonText>
                        </IonItem>
                        <IonItem>
                          <IonLabel color="medium">Governance Token</IonLabel>
                          <IonText style={{ fontWeight: 500 }}>STRK</IonText>
                        </IonItem>
                        <IonItem>
                          <IonLabel color="medium">Treasury</IonLabel>
                          <IonText style={{ fontWeight: 500 }}>
                            45,000 STRK
                          </IonText>
                        </IonItem>
                        <IonItem>
                          <IonLabel color="medium">Your Voting Power</IonLabel>
                          <IonText style={{ fontWeight: 500 }}>
                            250 STRK (0.18%)
                          </IonText>
                        </IonItem>
                      </IonList>
                    </IonCardContent>
                  </IonCard>
                </IonCol>

                <IonCol size="12" sizeMd="6">
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>Your Status</IonCardTitle>
                      <IonCardSubtitle>
                        Membership details and rewards
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "16px",
                        }}
                      >
                        <IonBadge color="primary">Silver Member</IonBadge>
                        <IonText color="medium" style={{ fontSize: "14px" }}>
                          Since May 2024
                        </IonText>
                      </div>

                      <div style={{ marginBottom: "16px" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "4px",
                          }}
                        >
                          <IonText style={{ fontSize: "14px" }}>
                            Progress to Gold Status
                          </IonText>
                          <IonText style={{ fontSize: "14px" }}>65%</IonText>
                        </div>
                        <IonProgressBar
                          value={0.65}
                          style={{ height: "8px", borderRadius: "4px" }}
                        />
                      </div>

                      <div style={{ marginTop: "16px" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "8px",
                          }}
                        >
                          <IonText color="medium" style={{ fontSize: "14px" }}>
                            Your Rewards
                          </IonText>
                          <IonText color="primary" style={{ fontWeight: 500 }}>
                            +15 STRK this week
                          </IonText>
                        </div>
                        <IonButton expand="block" color="primary">
                          Claim Rewards
                        </IonButton>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>

                <IonCol size="12">
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>Community Benefits</IonCardTitle>
                      <IonCardSubtitle>
                        How the DAO helps our members
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonGrid>
                        <IonRow>
                          <IonCol size="12" sizeMd="4">
                            <BenefitCard
                              icon={documentTextOutline}
                              title="Governance"
                              description="Vote on proposals to improve diabetes care standards and services"
                            />
                          </IonCol>
                          <IonCol size="12" sizeMd="4">
                            <BenefitCard
                              icon={ribbonOutline}
                              title="Rewards"
                              description="Earn STRK tokens for maintaining healthy habits and contributing"
                            />
                          </IonCol>
                          <IonCol size="12" sizeMd="4">
                            <BenefitCard
                              icon={heartOutline}
                              title="Support"
                              description="Access to a community of people sharing similar health journeys"
                            />
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        )}

        {/* Proposals Tab */}
        {activeTab === "proposals" && (
          <div className="ion-margin-top">
            <IonCard>
              <IonCardContent>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <h2 style={{ fontSize: "18px", fontWeight: 500, margin: 0 }}>
                    Active Proposals
                  </h2>
                  <IonButton color="primary">New Proposal</IonButton>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <ProposalCard
                    title="Add Weekly Diabetes Education Sessions"
                    description="Allocate 1,000 STRK to fund weekly educational sessions on managing diabetes with certified educators."
                    author="diabetes_educator.eth"
                    votes={{ for: 67, against: 13, abstain: 20 }}
                    endTime="2 days"
                    status="active"
                  />

                  <ProposalCard
                    title="Community Exercise Challenge"
                    description="Create a monthly exercise challenge with STRK rewards for participants who meet their goals."
                    author="health_coach.eth"
                    votes={{ for: 82, against: 5, abstain: 13 }}
                    endTime="4 days"
                    status="active"
                  />

                  <ProposalCard
                    title="Partner with Nutrition Tracking App"
                    description="Form partnership with NutriTrack app to provide discounted subscriptions for DAO members."
                    author="tech_innovator.eth"
                    votes={{ for: 45, against: 42, abstain: 13 }}
                    endTime="1 day"
                    status="active"
                  />
                </div>

                <div style={{ marginTop: "24px" }}>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                      marginBottom: "16px",
                    }}
                  >
                    Past Proposals
                  </h3>
                  <div>
                    <ProposalCard
                      title="Lower Threshold for Reward Distribution"
                      description="Reduce the minimum threshold for receiving health maintenance rewards from 75% to 65% compliance."
                      author="patient_advocate.eth"
                      votes={{ for: 72, against: 23, abstain: 5 }}
                      endTime="Ended 5 days ago"
                      status="passed"
                    />

                    <ProposalCard
                      title="Fund Research on Continuous Glucose Monitoring"
                      description="Allocate 5,000 STRK to research the effectiveness of CGM devices for type 2 diabetes patients."
                      author="research_lead.eth"
                      votes={{ for: 35, against: 59, abstain: 6 }}
                      endTime="Ended 2 weeks ago"
                      status="rejected"
                    />
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        )}

        {/* Rewards Tab */}
        {activeTab === "rewards" && (
          <div className="ion-margin-top">
            <IonGrid>
              <IonRow>
                <IonCol size="12" sizeMd="6">
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>Earning Opportunities</IonCardTitle>
                      <IonCardSubtitle>
                        Ways to earn STRK tokens
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "16px",
                        }}
                      >
                        <RewardItem
                          title="Daily Blood Sugar Logs"
                          description="Log your blood sugar readings consistently"
                          reward="5 STRK/week"
                          completion={80}
                        />
                        <RewardItem
                          title="Medication Adherence"
                          description="Take medications as prescribed"
                          reward="10 STRK/week"
                          completion={100}
                        />
                        <RewardItem
                          title="Exercise Goals"
                          description="Meet your weekly exercise targets"
                          reward="15 STRK/week"
                          completion={40}
                        />
                        <RewardItem
                          title="Proposal Voting"
                          description="Participate in DAO governance"
                          reward="5 STRK/proposal"
                          completion={75}
                        />
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>

                <IonCol size="12" sizeMd="6">
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>Reward History</IonCardTitle>
                      <IonCardSubtitle>
                        Your recent STRK earnings
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonList>
                        <IonItem
                          lines="full"
                          style={{ "--background": "var(--ion-color-light)" }}
                        >
                          <div style={{ padding: "8px 0" }}>
                            <h3
                              style={{ margin: "0 0 4px 0", fontWeight: 500 }}
                            >
                              Weekly Health Goals
                            </h3>
                            <IonText
                              color="medium"
                              style={{ fontSize: "14px" }}
                            >
                              May 8, 2024
                            </IonText>
                          </div>
                          <IonText
                            slot="end"
                            color="primary"
                            style={{ fontWeight: 500 }}
                          >
                            +15 STRK
                          </IonText>
                        </IonItem>

                        <IonItem
                          lines="full"
                          style={{ "--background": "var(--ion-color-light)" }}
                        >
                          <div style={{ padding: "8px 0" }}>
                            <h3
                              style={{ margin: "0 0 4px 0", fontWeight: 500 }}
                            >
                              Proposal Participation
                            </h3>
                            <IonText
                              color="medium"
                              style={{ fontSize: "14px" }}
                            >
                              May 5, 2024
                            </IonText>
                          </div>
                          <IonText
                            slot="end"
                            color="primary"
                            style={{ fontWeight: 500 }}
                          >
                            +5 STRK
                          </IonText>
                        </IonItem>

                        <IonItem
                          lines="full"
                          style={{ "--background": "var(--ion-color-light)" }}
                        >
                          <div style={{ padding: "8px 0" }}>
                            <h3
                              style={{ margin: "0 0 4px 0", fontWeight: 500 }}
                            >
                              Weekly Health Goals
                            </h3>
                            <IonText
                              color="medium"
                              style={{ fontSize: "14px" }}
                            >
                              May 1, 2024
                            </IonText>
                          </div>
                          <IonText
                            slot="end"
                            color="primary"
                            style={{ fontWeight: 500 }}
                          >
                            +20 STRK
                          </IonText>
                        </IonItem>

                        <IonItem
                          lines="full"
                          style={{ "--background": "var(--ion-color-light)" }}
                        >
                          <div style={{ padding: "8px 0" }}>
                            <h3
                              style={{ margin: "0 0 4px 0", fontWeight: 500 }}
                            >
                              HbA1c Improvement
                            </h3>
                            <IonText
                              color="medium"
                              style={{ fontSize: "14px" }}
                            >
                              April 28, 2024
                            </IonText>
                          </div>
                          <IonText
                            slot="end"
                            color="primary"
                            style={{ fontWeight: 500 }}
                          >
                            +50 STRK
                          </IonText>
                        </IonItem>
                      </IonList>
                    </IonCardContent>
                  </IonCard>
                </IonCol>

                <IonCol size="12">
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>Token Utility</IonCardTitle>
                      <IonCardSubtitle>
                        Ways to use your STRK tokens
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonGrid>
                        <IonRow>
                          <IonCol size="12" sizeMd="4">
                            <div
                              style={{
                                padding: "16px",
                                background: "var(--ion-color-light)",
                                borderRadius: "8px",
                              }}
                            >
                              <IonIcon
                                icon={bookOutline}
                                color="primary"
                                style={{
                                  fontSize: "24px",
                                  marginBottom: "8px",
                                }}
                              />
                              <h3
                                style={{ fontWeight: 500, margin: "0 0 4px 0" }}
                              >
                                Educational Resources
                              </h3>
                              <IonText
                                color="medium"
                                style={{ fontSize: "14px" }}
                              >
                                Unlock premium educational content and courses
                              </IonText>
                            </div>
                          </IonCol>

                          <IonCol size="12" sizeMd="4">
                            <div
                              style={{
                                padding: "16px",
                                background: "var(--ion-color-light)",
                                borderRadius: "8px",
                              }}
                            >
                              <IonIcon
                                icon={documentTextOutline}
                                color="primary"
                                style={{
                                  fontSize: "24px",
                                  marginBottom: "8px",
                                }}
                              />
                              <h3
                                style={{ fontWeight: 500, margin: "0 0 4px 0" }}
                              >
                                Governance Weight
                              </h3>
                              <IonText
                                color="medium"
                                style={{ fontSize: "14px" }}
                              >
                                More tokens = more voting power in DAO decisions
                              </IonText>
                            </div>
                          </IonCol>

                          <IonCol size="12" sizeMd="4">
                            <div
                              style={{
                                padding: "16px",
                                background: "var(--ion-color-light)",
                                borderRadius: "8px",
                              }}
                            >
                              <IonIcon
                                icon={ribbonOutline}
                                color="primary"
                                style={{
                                  fontSize: "24px",
                                  marginBottom: "8px",
                                }}
                              />
                              <h3
                                style={{ fontWeight: 500, margin: "0 0 4px 0" }}
                              >
                                Premium Features
                              </h3>
                              <IonText
                                color="medium"
                                style={{ fontSize: "14px" }}
                              >
                                Access to advanced health tracking and AI
                                insights
                              </IonText>
                            </div>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        )}

        {/* Members Tab */}
        {activeTab === "members" && (
          <div className="ion-margin-top">
            <IonCard>
              <IonCardContent>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <h2 style={{ fontSize: "18px", fontWeight: 500, margin: 0 }}>
                    Community Members
                  </h2>
                  <IonSearchbar
                    placeholder="Search members..."
                    style={{ maxWidth: "300px" }}
                  ></IonSearchbar>
                </div>

                <IonList>
                  <MemberCard
                    name="Sarah Johnson"
                    address="health_advocate.eth"
                    level="Gold Member"
                    joinDate="Dec 2023"
                    contribution="Active Contributor"
                    avatar="/placeholder.svg"
                  />

                  <MemberCard
                    name="Michael Chen"
                    address="fitness_expert.eth"
                    level="Platinum Member"
                    joinDate="Jan 2024"
                    contribution="Proposal Author"
                    avatar="/placeholder.svg"
                  />

                  <MemberCard
                    name="Aisha Patel"
                    address="wellness_coach.eth"
                    level="Silver Member"
                    joinDate="Mar 2024"
                    contribution="New Member"
                    avatar="/placeholder.svg"
                  />

                  <MemberCard
                    name="John Smith"
                    address="tech_health.eth"
                    level="Silver Member"
                    joinDate="Apr 2024"
                    contribution="Voter"
                    avatar="/placeholder.svg"
                  />

                  <MemberCard
                    name="Emma Rodriguez"
                    address="nutritionist.eth"
                    level="Gold Member"
                    joinDate="Feb 2024"
                    contribution="Educational Content"
                    avatar="/placeholder.svg"
                  />
                </IonList>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "24px",
                  }}
                >
                  <IonButton fill="outline">Load More Members</IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "16px",
        background: "var(--ion-color-light)",
        borderRadius: "8px",
      }}
    >
      <IonIcon
        icon={icon}
        color="primary"
        style={{ fontSize: "24px", marginBottom: "12px" }}
      />
      <h3 style={{ fontWeight: 500, margin: "0 0 4px 0" }}>{title}</h3>
      <IonText color="medium" style={{ fontSize: "14px" }}>
        {description}
      </IonText>
    </div>
  );
};

interface ProposalCardProps {
  title: string;
  description: string;
  author: string;
  votes: {
    for: number;
    against: number;
    abstain: number;
  };
  endTime: string;
  status: "active" | "passed" | "rejected";
}

const ProposalCard: React.FC<ProposalCardProps> = ({
  title,
  description,
  author,
  votes,
  endTime,
  status,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "active":
        return "primary";
      case "passed":
        return "success";
      case "rejected":
        return "danger";
      default:
        return "medium";
    }
  };

  return (
    <IonCard style={{ margin: "12px 0" }}>
      <IonCardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "8px",
          }}
        >
          <h3 style={{ fontWeight: 500, margin: 0 }}>{title}</h3>
          <IonBadge color={getStatusColor()}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </IonBadge>
        </div>

        <IonText
          color="medium"
          style={{ fontSize: "14px", display: "block", marginBottom: "12px" }}
        >
          {description}
        </IonText>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "12px",
            color: "var(--ion-color-medium)",
            marginBottom: "12px",
          }}
        >
          <IonIcon icon={personOutline} style={{ marginRight: "4px" }} />
          <span>{author}</span>
          <span style={{ margin: "0 8px" }}>•</span>
          <span>{endTime}</span>
        </div>

        {status === "active" && (
          <div style={{ marginBottom: "12px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                marginBottom: "4px",
              }}
            >
              <span>For: {votes.for}%</span>
              <span>Against: {votes.against}%</span>
              <span>Abstain: {votes.abstain}%</span>
            </div>
            <div
              style={{
                display: "flex",
                height: "8px",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: "var(--ion-color-success)",
                  width: `${votes.for}%`,
                }}
              ></div>
              <div
                style={{
                  background: "var(--ion-color-danger)",
                  width: `${votes.against}%`,
                }}
              ></div>
              <div
                style={{
                  background: "var(--ion-color-medium-tint)",
                  width: `${votes.abstain}%`,
                }}
              ></div>
            </div>
          </div>
        )}

        {status === "active" ? (
          <div style={{ display: "flex", gap: "8px" }}>
            <IonButton expand="block" color="success">
              <IonIcon slot="start" icon={checkmarkOutline} />
              Vote For
            </IonButton>
            <IonButton expand="block" fill="outline" color="danger">
              <IonIcon slot="start" icon={closeOutline} />
              Vote Against
            </IonButton>
          </div>
        ) : (
          <IonButton expand="block" fill="outline">
            View Details
          </IonButton>
        )}
      </IonCardContent>
    </IonCard>
  );
};

interface RewardItemProps {
  title: string;
  description: string;
  reward: string;
  completion: number;
}

const RewardItem: React.FC<RewardItemProps> = ({
  title,
  description,
  reward,
  completion,
}) => {
  return (
    <div
      style={{
        padding: "12px",
        background: "var(--ion-color-light)",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <div>
          <h3 style={{ fontWeight: 500, margin: "0 0 4px 0" }}>{title}</h3>
          <IonText color="medium" style={{ fontSize: "14px" }}>
            {description}
          </IonText>
        </div>
        <IonText color="primary" style={{ fontWeight: 500 }}>
          {reward}
        </IonText>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            marginBottom: "4px",
          }}
        >
          <span>Progress</span>
          <span>{completion}%</span>
        </div>
        <IonProgressBar
          value={completion / 100}
          style={{ height: "6px", borderRadius: "3px" }}
        />
      </div>
    </div>
  );
};

interface MemberCardProps {
  name: string;
  address: string;
  level: string;
  joinDate: string;
  contribution: string;
  avatar: string;
}

const MemberCard: React.FC<MemberCardProps> = ({
  name,
  address,
  level,
  joinDate,
  contribution,
  avatar,
}) => {
  const getLevelColor = () => {
    if (level.includes("Platinum")) return "tertiary";
    if (level.includes("Gold")) return "warning";
    if (level.includes("Silver")) return "medium";
    return "primary";
  };

  return (
    <IonItem lines="full">
      <IonAvatar slot="start">
        <img src={avatar} alt={name} />
      </IonAvatar>

      <IonLabel>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "4px",
          }}
        >
          <h2 style={{ margin: 0, fontWeight: 500 }}>{name}</h2>
          <IonBadge color={getLevelColor()}>{level}</IonBadge>
        </div>
        <IonText color="medium" style={{ fontSize: "14px" }}>
          {address}
        </IonText>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "4px",
            fontSize: "12px",
            color: "var(--ion-color-medium)",
          }}
        >
          <span>Joined: {joinDate}</span>
          <span>•</span>
          <span>{contribution}</span>
        </div>
      </IonLabel>

      <IonButton slot="end" fill="outline" size="small">
        View
      </IonButton>
    </IonItem>
  );
};

export default Community;

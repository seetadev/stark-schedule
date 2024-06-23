import React from "react";
import {
  DynamicEmbeddedWidget,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import ExtraContent from "./ExtraContent.tsx";

const WidgetContainer = () => {
  const { sdkHasLoaded, isVerificationInProgress, isAuthenticated } =
    useDynamicContext();

  return (
    <div className="widget-container">
      {sdkHasLoaded && !isVerificationInProgress && isAuthenticated && (
        <ExtraContent />
      )}
      <DynamicEmbeddedWidget />
    </div>
  );
};

export default WidgetContainer;

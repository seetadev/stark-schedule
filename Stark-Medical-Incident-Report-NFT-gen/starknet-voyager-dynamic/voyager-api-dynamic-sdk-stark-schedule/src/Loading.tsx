import React from "react";
import "./loading.css"; // Import the CSS file for styling

const Loading = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-container">
      <div className="loading-circle"></div>
    </div>
  );
};

export default Loading;

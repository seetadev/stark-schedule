import React, { useState, useEffect } from "react";

const Typewriter = ({ text, typingSpeed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    let currentDisplayedText = "";

    if (text) {
      const timer = setInterval(() => {
        if (index < text.length) {
          currentDisplayedText += text.charAt(index);
          setDisplayedText(currentDisplayedText);
          index++;
        }

        if (index >= text.length) {
          clearInterval(timer);
        }
      }, typingSpeed);

      // Clear the interval on component unmount or text change.
      return () => clearInterval(timer);
    }
  }, [text, typingSpeed]);

  return <div className="typewriter">{displayedText}</div>;
};

export default Typewriter;

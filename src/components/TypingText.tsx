import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypingTextProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  fontSize?: string; // CSS size, e.g., 'clamp(18px,5vw,28px)'
  align?: "left" | "center" | "right";
}

const TypingText: React.FC<TypingTextProps> = ({
  texts,
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 1500,
  fontSize = "clamp(18px,5.5vw,28px)",
  align = "left",
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: number;

    if (!isDeleting && displayedText.length < texts[textIndex].length) {
      timeout = setTimeout(() => {
        setDisplayedText(texts[textIndex].slice(0, displayedText.length + 1));
      }, speed);
    } else if (!isDeleting && displayedText.length === texts[textIndex].length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(texts[textIndex].slice(0, displayedText.length - 1));
      }, deleteSpeed);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, textIndex, texts, speed, deleteSpeed, pauseTime]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        fontSize,
        fontWeight: 800,
        whiteSpace: "nowrap",
        paddingRight: "4px",
        display: "block",
        minWidth: 0,
        height: "1.3em",
        lineHeight: "1em",
        textAlign: align,
      }}
    >
      {displayedText}
    </motion.div>
  );
};

export default TypingText;

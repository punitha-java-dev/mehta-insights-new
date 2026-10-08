"use client";

import { useEffect, useState, type MouseEvent, type KeyboardEvent } from "react";
import {
  BookOpen,
  Brain,
  ClipboardCheck,
  LineChart,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/app/components/reveal";

const learningCards = [
  {
    icon: BookOpen,
    title: "Market Fundamentals",
    description: "Understand market terminology, instruments and trading basics.",
  },
  {
    icon: LineChart,
    title: "Technical Analysis",
    description: "Explore charts, price action, trends and technical indicators.",
  },
  {
    icon: ClipboardCheck,
    title: "Trade Planning",
    description: "Understand how traders assess entries, exits and potential risk.",
  },
  {
    icon: ShieldCheck,
    title: "Risk Management",
    description: "Learn why position sizing, stop-loss planning and capital protection matter.",
  },
  {
    icon: Brain,
    title: "Trading Psychology",
    description: "Recognise emotional biases and the importance of consistency.",
  },
  {
    icon: ScanSearch,
    title: "Market Analysis",
    description: "Develop a framework for interpreting market information before making decisions.",
  },
];

export function LearningCards() {
  const reduceMotion = useReducedMotion();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [supportsHover, setSupportsHover] = useState(false);

  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateHoverSupport = () => setSupportsHover(hoverQuery.matches);
    updateHoverSupport();
    hoverQuery.addEventListener("change", updateHoverSupport);

    return () => hoverQuery.removeEventListener("change", updateHoverSupport);
  }, []);

  function handleClick(event: MouseEvent<HTMLElement>, index: number) {
    if (!supportsHover || event.detail === 0) {
      setActiveCard((current) => current === index ? null : index);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>, index: number) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveCard((current) => current === index ? null : index);
    }
  }

  return (
    <>
      {learningCards.map(({ icon: Icon, title, description }, index) => {
        const isActive = activeCard === index;
        const canScale = isActive && !reduceMotion;

        return (
          <Reveal
            className={`learn-card-reveal${isActive ? " is-active" : ""}`}
            delay={(index % 3) * 0.06}
            key={title}
          >
            <motion.article
              animate={{
                scale: canScale ? 1.06 : 1,
                y: canScale ? -2 : 0,
              }}
              aria-pressed={isActive}
              className={`learn-card${isActive ? " is-interactive-active" : ""}`}
              onClick={(event) => handleClick(event, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setActiveCard(index);
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === "mouse") {
                  setActiveCard((current) => current === index ? null : current);
                }
              }}
              role="button"
              tabIndex={0}
              transition={
                reduceMotion
                  ? { duration: 0.01 }
                  : { type: "spring", stiffness: 360, damping: 28 }
              }
            >
              <motion.span
                animate={{ scale: canScale ? 1.12 : 1 }}
                className="learn-icon"
                transition={
                  reduceMotion
                    ? { duration: 0.01 }
                    : { type: "spring", stiffness: 360, damping: 24 }
                }
              >
                <Icon aria-hidden="true" size={21} strokeWidth={1.9} />
              </motion.span>
              <h3>{title}</h3>
              <p>{description}</p>
            </motion.article>
          </Reveal>
        );
      })}
    </>
  );
}

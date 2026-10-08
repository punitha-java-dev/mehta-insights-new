"use client";

import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";

const questions = [
  {
    question: "Who can join the program?",
    answer:
      "The program is intended to help aspiring and developing traders build a structured understanding of the markets. Confirm the final eligibility criteria with the program team.",
  },
  {
    question: "Is this a live-mentored program?",
    answer:
      "The program is described as a 16-week live-mentored trading program. Contact the team to confirm session frequency, format and mentor access.",
  },
  {
    question: "Will I learn risk management?",
    answer:
      "Risk management is a recommended core learning area. Confirm the exact topics covered in the final curriculum.",
  },
  {
    question: "Does the program guarantee trading profits?",
    answer:
      "No profit or return should be expected or guaranteed. Trading involves market risk, and learning does not eliminate the possibility of losses.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [supportsHover, setSupportsHover] = useState(false);

  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateHoverSupport = () => setSupportsHover(hoverQuery.matches);
    updateHoverSupport();
    hoverQuery.addEventListener("change", updateHoverSupport);

    return () => hoverQuery.removeEventListener("change", updateHoverSupport);
  }, []);

  return (
    <div className="faq-list">
      {questions.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-answer-${index}`;
        const triggerId = `faq-question-${index}`;
        return (
          <div
            className={`faq-item${isOpen ? " is-open" : ""}`}
            key={item.question}
            onMouseEnter={() => {
              if (supportsHover) setOpenIndex(index);
            }}
            onMouseLeave={() => {
              if (supportsHover) setOpenIndex(null);
            }}
          >
            <h3>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className="faq-trigger"
                id={triggerId}
                onClick={(event) => {
                  if (!supportsHover || event.detail === 0) {
                    setOpenIndex(isOpen ? null : index);
                  }
                }}
                type="button"
              >
                {item.question}
                <span aria-hidden="true" className="faq-chevron">
                  {isOpen ? <Minus size={19} /> : <Plus size={19} />}
                </span>
              </button>
            </h3>
            <div
              aria-hidden={!isOpen}
              aria-labelledby={triggerId}
              className={`faq-panel${isOpen ? " is-open" : ""}`}
              id={panelId}
              inert={!isOpen}
              role="region"
            >
              <div className="faq-panel-inner">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

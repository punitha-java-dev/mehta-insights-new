"use client";

import { BarChart3, CalendarCheck, ShieldAlert, Video } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const details = [
  { icon: CalendarCheck, label: "PROGRAM DURATION", value: "16 Weeks" },
  { icon: Video, label: "LEARNING FORMAT", value: "Live-mentored" },
  { icon: BarChart3, label: "PROGRAM FOCUS", value: "Trading education" },
  { icon: ShieldAlert, label: "RISK AWARENESS", value: "Risk first" },
];

export function ProgramDetailCards() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="program-detail-grid">
      {details.map(({ icon: Icon, label, value }, index) => (
        <motion.div
          className="program-detail"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          key={label}
          transition={{
            delay: reduceMotion ? 0 : index * 0.07,
            duration: reduceMotion ? 0 : 0.24,
            ease: "easeOut",
          }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={reduceMotion ? undefined : { y: -3 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="program-detail-icon"><Icon aria-hidden="true" size={20} /></span>
          <span className="program-detail-label">{label}</span>
          <strong>
            {value === "16 Weeks" || value === "Live-mentored"
              ? <span className="gold-keyword-light">{value}</span>
              : value}
          </strong>
        </motion.div>
      ))}
    </div>
  );
}

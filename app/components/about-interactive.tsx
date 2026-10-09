"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Eye,
  FileSearch,
  Layers,
  Pointer,
  ShieldCheck,
  Users,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";

const benefits = [
  {
    icon: ShieldCheck,
    text: "Taught by a SEBI-registered analyst with a verifiable regulatory identity",
  },
  { icon: Users, text: "Live mentoring, so your questions never go unanswered" },
  {
    icon: Layers,
    text: "Fundamentals and technicals taught together, not in isolation",
  },
  {
    icon: Eye,
    text: "Complete transparency on methods, fees and risks, with no hidden fine print",
  },
  {
    icon: FileSearch,
    text: "Independent by design: we never manage your money or execute trades for you",
  },
];

const revealTransition = {
  duration: 0.42,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function AboutInteractive() {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [imageActive, setImageActive] = useState(false);
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);
  const [sequenceIndex, setSequenceIndex] = useState<number | null>(null);
  const touchStarted = useRef(false);
  const activeBenefit = hoveredBenefit ?? sequenceIndex;
  function setApplyCue(active: boolean) {
    window.dispatchEvent(new CustomEvent("about-application-cue", { detail: active }));
  }

  function activateImage() {
    setImageActive(true);
    setApplyCue(true);
  }

  function clearImageCue() {
    setImageActive(false);
    setApplyCue(false);
  }

  function scrollToApplication() {
    clearImageCue();
    document.getElementById("application")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }
  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const updateMobile = () => setIsMobile(media.matches);
    updateMobile();
    media.addEventListener("change", updateMobile);
    return () => media.removeEventListener("change", updateMobile);
  }, []);
  const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: reduceMotion ? 0.2 : isMobile ? 0.4 : 0.5, ease: "easeOut" },
    },
  };
  const imageVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion || isMobile ? 0 : 16, scale: reduceMotion || isMobile ? 1 : 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: reduceMotion
        ? { duration: 0.2 }
        : { type: "spring", stiffness: 110, damping: 22, duration: isMobile ? 0.55 : 0.7 },
    },
  };
  const headingVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion || isMobile ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion ? { duration: 0.2 } : { ...revealTransition, delay: 0.2 },
    },
  };
  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion || isMobile ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion ? { duration: 0.2 } : { ...revealTransition, delay: 0.3 },
    },
  };
  const descriptionVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion || isMobile ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion ? { duration: 0.2 } : { ...revealTransition, delay: 0.48 },
    },
  };
  const benefitsVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: reduceMotion ? 0.1 : isMobile ? 0.5 : 0.58,
        staggerChildren: reduceMotion ? 0.02 : isMobile ? 0.09 : 0.12,
      },
    },
  };
  const benefitVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion || isMobile ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion ? { duration: 0.15 } : { duration: isMobile ? 0.2 : 0.24, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const closingParagraphVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion || isMobile ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0.2 }
        : { ...revealTransition, duration: isMobile ? 0.2 : 0.24, delay: isMobile ? 1.1 : 1.32 },
    },
  };
  const ctaVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0.2 }
        : { ...revealTransition, duration: isMobile ? 0.2 : 0.24, delay: isMobile ? 1.22 : 1.5 },
    },
  };
  const arrowVariants: Variants = {
    hidden: { opacity: reduceMotion ? 0 : 0.7, x: reduceMotion || isMobile ? 0 : -4 },
    visible: {
      opacity: 1,
      x: 0,
      transition: reduceMotion ? { duration: 0.15 } : { duration: isMobile ? 0.18 : 0.2, delay: isMobile ? 0.06 : 0.08 },
    },
  };

  useEffect(() => {
    if (!imageActive || hoveredBenefit !== null) return;
    setSequenceIndex(0);
    let nextIndex = 0;
    const timer = window.setInterval(() => {
      nextIndex += 1;
      if (nextIndex >= benefits.length) {
        window.clearInterval(timer);
        return;
      }
      setSequenceIndex(nextIndex);
    }, 430);
    return () => window.clearInterval(timer);
  }, [imageActive, hoveredBenefit]);

  return (
    <motion.section
      className="section section-about"
      id="about"
      initial="hidden"
      variants={sectionVariants}
      viewport={{ once: true, amount: 0.25 }}
      whileInView="visible"
    >
      <div className="container">
        <div className="about-content">
          <div className="about-visual">
            <div className="analyst-profile-card">
              <div className="analyst-name-label">
                <strong>Ankit Mehta</strong>
                <span>CMT, CFTe, QPFP</span>
              </div>
              <motion.div
              aria-label="Ankit Mehta portrait; activate to apply for the program"
              aria-pressed={imageActive}
              className={`analyst-photo-card${imageActive ? " is-image-active" : ""}`}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) clearImageCue();
              }}
              onClick={() => {
                const isTouch = touchStarted.current || window.matchMedia("(hover: none)").matches;
                if (isTouch && !imageActive) {
                  activateImage();
                } else {
                  scrollToApplication();
                }
                touchStarted.current = false;
              }}
              onFocus={() => {
                if (!touchStarted.current) activateImage();
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  scrollToApplication();
                }
              }}
              onPointerDown={(event) => {
                touchStarted.current = event.pointerType === "touch";
              }}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") activateImage();
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === "mouse") clearImageCue();
              }}
              role="button"
              tabIndex={0}
              variants={imageVariants}
            >
              <Image
                alt="Ankit Mehta"
                className="analyst-photo"
                height={1303}
                src="/images/mehta-trading-office.png"
                width={1303}
                sizes="(max-width: 520px) 100vw, (max-width: 760px) 40vw, 42vw"
              />
              <AnimatePresence>
                {imageActive && (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    aria-hidden="true"
                    className={`about-image-apply-cue${reduceMotion ? " is-reduced-motion" : ""}`}
                    exit={{ opacity: 0, y: 4 }}
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 5 }}
                    transition={{ duration: reduceMotion ? 0 : 0.3 }}
                  >
                    <span className="about-image-apply-message">
                      <strong>Ready to start?</strong>
                      <span>Apply for the 16-Week Program <ArrowRight size={12} /></span>
                    </span>
                    <motion.span
                      animate={reduceMotion ? undefined : { x: [0, 5, 1, 5, 1, 0], y: [0, -2, 0, -2, 0, 0] }}
                      className="about-image-pointer"
                      transition={reduceMotion ? { duration: 0 } : { duration: 1.5, times: [0, 0.22, 0.4, 0.62, 0.8, 1], ease: "easeInOut" }}
                    >
                      <Pointer aria-hidden="true" size={24} strokeWidth={1.8} />
                    </motion.span>
                    <motion.svg
                      animate={reduceMotion ? undefined : { opacity: [0.35, 0.8, 0.35] }}
                      className="about-image-apply-arrow"
                      fill="none"
                      transition={reduceMotion ? { duration: 0 } : { duration: 1.4, repeat: 2, ease: "easeInOut" }}
                      viewBox="0 0 74 34"
                    >
                      <path d="M2 3C23 7 38 14 60 27" stroke="currentColor" strokeDasharray="3 4" strokeWidth="1.5" />
                      <path d="m53 26 8 3-2-8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </motion.svg>
                  </motion.div>
                )}
              </AnimatePresence>
              </motion.div>
            </div>
            <div className="about-credentials">
              <span className="about-credentials-icon">
                <ShieldCheck aria-hidden="true" size={19} strokeWidth={1.9} />
              </span>
              <span>
                <strong>SEBI Registered Research Analyst</strong>
                <span>INH000025577</span>
                <span>BSE Enlistment 7060</span>
              </span>
            </div>
          </div>

          <div className="about-copy">
            <motion.div variants={headingVariants}>
              <p className="eyebrow">WHY MEHTA INSIGHTS?</p>
              <motion.h2 className="about-title" variants={subtitleVariants}>
                Learn with a <span className="about-title-highlight">Research-Driven</span> Perspective
                <span aria-hidden="true" className="about-title-underline" />
              </motion.h2>
            </motion.div>
            <motion.p className="about-description" variants={descriptionVariants}>
              Ankit Mehta, CMT, CFTe, QPFP, is a SEBI Registered Research Analyst (INH000025577, BSE Enlistment 7060).Focuses on independent equity research informed by fundamental and technical analysis, with an emphasis on transparency, documented reasoning and informed decisions.
            </motion.p>
            <motion.h3 variants={descriptionVariants}>
              Why traders choose MehtaInsights over another online course:
            </motion.h3>
            <motion.ul variants={benefitsVariants}>
              {benefits.map(({ icon: Icon, text }, index) => {
                const isActive = activeBenefit === index;
                return (
                  <motion.li
                    animate={{ x: isActive && !reduceMotion ? 3 : 0 }}
                    key={text}
                    onMouseEnter={() => setHoveredBenefit(index)}
                    onMouseLeave={() => setHoveredBenefit(null)}
                    onFocus={() => setHoveredBenefit(index)}
                    onBlur={() => setHoveredBenefit(null)}
                    tabIndex={0}
                    variants={benefitVariants}
                  >
                    <motion.span
                      animate={{ scale: isActive && !reduceMotion ? 1.12 : 1 }}
                      className={isActive ? "is-active" : ""}
                      transition={reduceMotion ? { duration: 0.15 } : { type: "spring", stiffness: 380, damping: 26 }}
                    >
                      <Icon aria-hidden="true" size={15} strokeWidth={1.9} />
                    </motion.span>
                    {text}
                  </motion.li>
                );
              })}
            </motion.ul>
            <motion.p variants={closingParagraphVariants}>
              The program explains why more information doesn&apos;t automatically lead to better decisions. It then walks you through a structured process for reading, planning and reviewing trades. There&apos;s no pressure. If the approach makes sense to you.
            </motion.p>
            <motion.a
              className="button button-blue about-cta"
              href="#application"
              variants={ctaVariants}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileFocus={reduceMotion ? undefined : { y: -2 }}
            >
              Know More About Mehta Insights
              {" "}
              <motion.span aria-hidden="true" className="about-cta-arrow" variants={arrowVariants}>
                <ArrowRight size={17} />
              </motion.span>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

"use client";

import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/app/components/reveal";

export function InteractiveHero() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="hero-grid">
      <Reveal className="hero-copy">
        <p className="eyebrow hero-eyebrow">
          <span className="eyebrow-rule" /> 16-WEEK LIVE-MENTORED TRADING PROGRAM
        </p>
        <h1>Master Trading with 16-Week <span className="gold-on-dark">Live-Mentored</span> Program</h1>
        <p className="hero-description">
          Build your understanding of the markets through a 16-week
          live-mentored trading program designed to help you develop
          analytical skills, trading discipline and a more structured
          approach to market decisions.
        </p>
        <div className="hero-actions">
          <a className="button button-blue" href="#program">
            Explore the Program <ArrowRight aria-hidden="true" size={17} />
          </a>
          <a className="button button-outline" href="#application">
            Talk to a Mentor <MessageCircle aria-hidden="true" size={16} />
          </a>
        </div>
        <div className="hero-trust">
          <div className="trust-mark"><ShieldCheck aria-hidden="true" size={18} /></div>
          <p>
            <strong>Led by Ankit Mehta, CMT, CFTe, QPFP</strong>
            <span>SEBI Registered Research Analyst (INH000025577)</span>
          </p>
        </div>
      </Reveal>
      <div className="hero-art">
        <motion.div
          className="hero-portrait-stage"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            reduceMotion
              ? { duration: 0.2 }
              : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
          }
        >
          <span aria-hidden="true" className="hero-portrait-glow" />
          <Image
            alt="Ankit Mehta"
            className="hero-portrait"
            height={768}
            loading="eager"
            src="/images/hero-mehta-insights.png.png"
            width={798}
            sizes="(max-width: 760px) 90vw, (max-width: 1000px) 48vw, 45vw"
          />
        </motion.div>
      </div>
    </div>
  );
}

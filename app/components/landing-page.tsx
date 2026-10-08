import {
  BarChart3,
  ArrowRight,
  AlertTriangle,
  CalendarCheck,
  Check,
  Clock,
  FileEdit,
  Layers,
  MessageCircle,
  Search,
  ShieldAlert,
  ShieldCheck,
  Shuffle,
  Target,
  UserCheck,
  Video,
} from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { ApplicationForm } from "@/app/components/application-form";
import { AboutInteractive } from "@/app/components/about-interactive";
import { Faq } from "@/app/components/faq";
import { InteractiveHero } from "@/app/components/interactive-hero";
import { LearningCards } from "@/app/components/learning-cards";
import { Reveal } from "@/app/components/reveal";
import { SiteHeader } from "@/app/components/site-header";

const problems = [
  { icon: Shuffle, text: "Constant strategy hopping." },
  { icon: Clock, text: "Poor timing." },
  { icon: AlertTriangle, text: "Revenge trading." },
  { icon: Layers, text: "Information overload." },
  { icon: MessageCircle, text: "No feedback." },
];

const solutions = [
  { icon: Target, text: "One clear framework." },
  { icon: CalendarCheck, text: "Weekly practice." },
  { icon: ShieldCheck, text: "Risk first." },
  { icon: Video, text: "Live weekly sessions." },
  { icon: UserCheck, text: "Direct mentor feedback." },
];

const applicationSteps = [
  {
    icon: FileEdit,
    number: "01",
    title: "Apply for the program",
    description: "Complete the form to express your interest in the program.",
  },
  {
    icon: Search,
    number: "02",
    title: "Application review",
    description: "Our team will review your application.",
  },
  {
    icon: MessageCircle,
    number: "03",
    title: "Hear from our team",
    description: "Our team will contact you if the program is a suitable fit.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-heading${align === "center" ? " centered" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

export function LandingPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">
        <section className="hero-section" id="home">
          <InteractiveHero />
          <div className="hero-bottom">
            <span>MEHTA INSIGHTS <i>·</i> CHART TO TRADE</span>
            <span>SEBI Registered Research Analyst (INH000025577)</span>
          </div>
        </section>

        <section aria-label="Program credentials" className="trust-bar">
          <div className="trust-item">
            <CalendarCheck aria-hidden="true" size={21} />
            <span className="trust-item-copy"><strong>16 Weeks</strong><span>Live-Mentored Program</span></span>
          </div>
          <div className="trust-item">
            <Video aria-hidden="true" size={21} />
            <span className="trust-item-copy"><strong>Live Sessions</strong><span>Interactive Learning</span></span>
          </div>
          <div className="trust-item">
            <UserCheck aria-hidden="true" size={21} />
            <span className="trust-item-copy"><strong>Direct Mentor</strong><span>Guidance &amp; Feedback</span></span>
          </div>
          <div className="trust-item">
            <ShieldCheck aria-hidden="true" size={21} />
            <span className="trust-item-copy"><strong>Risk First</strong><span>Structured Approach</span></span>
          </div>
        </section>

        <section className="section section-problem" id="problem">
          <div className="container">
            <Reveal>
              <SectionHeading
                description="Random tips, conflicting opinions and emotional decisions can make trading difficult to navigate. A structured learning approach can help you understand the reasoning behind market decisions."
                eyebrow="THE PROBLEM"
                title={<>Stop Guessing. Start Understanding the Markets.</>}
              />
            </Reveal>
            <div className="comparison-grid">
              <Reveal className="comparison-card comparison-problem">
                <h3><span aria-hidden="true">×</span> What&apos;s Going Wrong</h3>
                <ol>
                  {problems.map(({ icon: Icon, text }) => (
                    <li key={text}>
                      <Icon aria-hidden="true" className="comparison-item-icon" size={18} strokeWidth={1.9} />
                      {text}
                    </li>
                  ))}
                </ol>
              </Reveal>
              <Reveal className="comparison-card comparison-solution" delay={0.08}>
                <h3><span aria-hidden="true"><Check size={19} /></span> How the Program Fixes It</h3>
                <ol>
                  {solutions.map(({ icon: Icon, text }) => (
                    <li key={text}>
                      <Icon aria-hidden="true" className="comparison-item-icon" size={18} strokeWidth={1.9} />
                      {text}
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
            <div className="section-cta-row">
              <a className="button button-blue" href="#application">
                Register for the 16 week Program <ArrowRight aria-hidden="true" size={17} />
              </a>
            </div>
          </div>
        </section>

        <section className="section section-learn" id="program">
          <div className="container">
            <Reveal>
              <SectionHeading
                align="center"
                description="Explore the concepts and analytical approaches that support a more structured understanding of the financial markets."
                eyebrow="WHAT YOU WILL LEARN"
                title={<>Build the Skills Behind Better Trading Decisions</>}
              />
            </Reveal>
            <div className="learn-grid">
              <LearningCards />
            </div>
            <div className="section-cta-row">
              <a className="button button-blue" href="#application">
                Get the Program Curriculum <ArrowRight aria-hidden="true" size={17} />
              </a>
            </div>
          </div>
        </section>

        <AboutInteractive />

        <section className="section section-who">
          <div className="container who-program-grid">
            <Reveal className="who-program-column">
              <SectionHeading
                eyebrow="WHO THIS PROGRAM IS FOR"
                title={<>Aspiring and developing traders</>}
                description="The program is intended to help aspiring and developing traders build a structured understanding of the markets."
              />
              <p className="eligibility-note">Confirm the final eligibility criteria with the program team.</p>
            </Reveal>
            <Reveal className="program-summary" delay={0.08}>
              <p className="eyebrow">PROGRAM DETAILS</p>
              <h2>16 Weeks of Live Mentorship</h2>
              <div className="program-detail-grid">
                <div className="program-detail">
                  <span className="program-detail-icon"><CalendarCheck aria-hidden="true" size={19} /></span>
                  <span className="program-detail-label">PROGRAM DURATION</span>
                  <strong>16 Weeks</strong>
                </div>
                <div className="program-detail">
                  <span className="program-detail-icon"><Video aria-hidden="true" size={19} /></span>
                  <span className="program-detail-label">LEARNING FORMAT</span>
                  <strong>Live-mentored</strong>
                </div>
                <div className="program-detail">
                  <span className="program-detail-icon"><BarChart3 aria-hidden="true" size={19} /></span>
                  <span className="program-detail-label">PROGRAM FOCUS</span>
                  <strong>Trading education</strong>
                </div>
                <div className="program-detail">
                  <span className="program-detail-icon"><ShieldAlert aria-hidden="true" size={19} /></span>
                  <span className="program-detail-label">RISK AWARENESS</span>
                  <strong>Risk first</strong>
                </div>
              </div>
              <p className="program-details-note">
                Confirm session frequency, format and mentor access with the program team.
              </p>
              <a className="button button-blue" href="#application">
                Apply for the Program <ArrowRight aria-hidden="true" size={17} />
              </a>
            </Reveal>
          </div>
        </section>

        <section className="section section-process">
          <div className="container">
            <Reveal>
              <SectionHeading
                align="center"
                description="Complete the form below to express your interest in the Mehta Insights 16-Week Live-Mentored Trading Program."
                eyebrow="GETTING STARTED"
                title={<>From application to conversation</>}
              />
            </Reveal>
            <div className="steps-grid">
              {applicationSteps.map(({ icon: Icon, number, title, description }, index) => (
                <Reveal className="step-card" delay={index * 0.07} key={number}>
                  <span className="step-icon"><Icon aria-hidden="true" size={20} /></span>
                  <span className="step-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="application-section" id="application">
          <div className="container application-layout">
            <Reveal className="application-copy">
              <p className="eyebrow"><span className="eyebrow-rule" /> APPLY FOR THE PROGRAM</p>
              <h2>Apply for the<br />16-Week Program</h2>
              <p className="application-intro">
                Complete the form below to express your interest in the Mehta
                Insights 16-Week Live-Mentored Trading Program.
              </p>
              <div className="application-aside">
                <span className="aside-icon"><ShieldCheck aria-hidden="true" size={19} /></span>
                <p>
                  <strong>Educational program.</strong><br />
                  No returns or profits are guaranteed. Trading/investing involves market risk.
                </p>
              </div>
            </Reveal>
            <Reveal className="application-form-wrap" delay={0.1}>
              <div className="form-heading">
                <span className="form-step">MEHTA INSIGHTS <i>·</i> APPLICATION</span>
                <h3>Program application</h3>
                <p>All fields are required.</p>
              </div>
              <ApplicationForm />
            </Reveal>
          </div>
        </section>

        <section className="section section-faq" id="faqs">
          <div className="container faq-container">
            <Reveal className="faq-heading">
              <SectionHeading
                description="Information about the program and what to confirm with the program team."
                align="center"
                eyebrow="FREQUENTLY ASKED QUESTIONS"
                title={<>Your Questions, Answered</>}
              />
            </Reveal>
            <Reveal className="faq-content">
              <Faq />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand-block">
              <a aria-label="Mehta Insights home" className="brand brand-footer" href="#home">
                <Image
                  alt="Mehta Insights — Chart to Trade"
                  className="brand-logo brand-logo-footer"
                  height={667}
                  src="/images/mehta-insights-logo.png"
                  style={{ width: "clamp(170px, 17vw, 220px)", height: "auto" }}
                  width={2000}
                  sizes="(max-width: 760px) 180px, 210px"
                />
              </a>
              <p>MEHTA INSIGHTS <i>|</i> Chart to Trade</p>
            </div>
            <div className="footer-regulatory">
              <span>REGULATORY INFORMATION</span>
              <p>SEBI Reg. No. INH000025577</p>
              <p>BSE Enlistment 7060</p>
            </div>
            <a aria-label="Back to top" className="back-to-top" href="#home"><ArrowRight aria-hidden="true" size={17} /></a>
          </div>
          <div className="footer-disclaimer">
            <p>
              Educational program. No promise or guarantee of returns. Market
              investments involve risk. Investments in the securities market
              are subject to market risks. Read all related documents carefully
              before investing.
            </p>
          </div>
          <div className="footer-bottom">
            <span>© Mehta Insights. All rights reserved.</span>
            <span>CHART TO TRADE</span>
          </div>
        </div>
      </footer>
    </>
  );
}

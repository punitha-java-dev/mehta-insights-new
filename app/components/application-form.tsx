"use client";

import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  LoaderCircle,
  Lightbulb,
  Star,
  Target,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { submitApplication, type ApplicationPayload } from "@/app/lib/application";

type FieldName = keyof Omit<ApplicationPayload, "riskAcknowledged">;
type FieldErrors = Partial<Record<FieldName | "riskAcknowledged", string>>;

const inputOptions = {
  experience: [
    "I'm completely new to trading",
    "Less than 1 year",
    "1–3 years",
    "3+ years",
  ],
  approach: [
    "I'm just learning",
    "I follow tips/signals",
    "I use technical analysis",
    "I use fundamental analysis",
    "I use a combination of approaches",
    "I have a defined strategy",
  ],
  consultationMode: ["Zoom Call", "Phone Call"],
  referralSource: ["Instagram", "Facebook", "Google", "YouTube", "Referral", "Other"],
};

type FieldProps = {
  id: string;
  label: string;
  children: ReactNode;
  error?: string;
  complete?: boolean;
};

function Field({ id, label, children, error, complete }: FieldProps) {
  return (
    <div className="form-field">
      <label className="field-label" htmlFor={id}>
        {label}
        {complete && <Check aria-hidden="true" className="field-complete-mark" size={13} />}
      </label>
      {children}
      {error && <span className="field-error" id={`${id}-error`}>{error}</span>}
    </div>
  );
}

function SelectField({
  id,
  label,
  options,
  error,
  complete,
}: {
  id: FieldName;
  label: string;
  options: string[];
  error?: string;
  complete?: boolean;
}) {
  return (
    <Field complete={complete} error={error} id={id} label={label}>
      <select
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={Boolean(error)}
        className="form-control"
        defaultValue=""
        id={id}
        name={id}
        required
      >
        <option disabled value="">Select an option</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </Field>
  );
}

function validateApplication(application: ApplicationPayload): FieldErrors {
  const errors: FieldErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneDigits = application.phone.replace(/\D/g, "");
  const phonePattern = /^\+?[0-9\s().-]+$/;

  if (!application.fullName) errors.fullName = "Please enter your full name.";
  if (!application.email) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(application.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!application.phone) {
    errors.phone = "Please enter your phone number.";
  } else if (!phonePattern.test(application.phone) || phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (!application.city) errors.city = "Please enter your current city.";
  if (!application.experience) errors.experience = "Please select your trading experience.";
  if (!application.approach) errors.approach = "Please select your current trading approach.";
  if (!application.improvement) errors.improvement = "Please tell us what you would most like to improve.";
  if (!application.consultationMode) errors.consultationMode = "Please select a consultation mode.";
  if (!application.referralSource) errors.referralSource = "Please select how you heard about Mehta Insights.";
  if (!application.riskAcknowledged) {
    errors.riskAcknowledged = "Please confirm that you understand the educational and market-risk disclaimer.";
  }

  return errors;
}

function readApplication(data: FormData): ApplicationPayload {
  return {
    fullName: String(data.get("fullName") ?? "").trim(),
    email: String(data.get("email") ?? "").trim(),
    phone: String(data.get("phone") ?? "").trim(),
    city: String(data.get("city") ?? "").trim(),
    experience: String(data.get("experience") ?? ""),
    approach: String(data.get("approach") ?? ""),
    improvement: String(data.get("improvement") ?? "").trim(),
    consultationMode: String(data.get("consultationMode") ?? ""),
    referralSource: String(data.get("referralSource") ?? ""),
    riskAcknowledged: data.get("riskAcknowledged") === "on",
  };
}

const requiredFieldNames: FieldName[] = [
  "fullName",
  "email",
  "phone",
  "city",
  "experience",
  "approach",
  "improvement",
  "consultationMode",
  "referralSource",
];

type CelebrationParticle = {
  Icon: LucideIcon;
  left: string;
  delay: number;
  color: "blue" | "gold" | "green";
  top?: string;
  rotate?: number;
};

const starterParticles: CelebrationParticle[] = [
  { Icon: TrendingUp, left: "8%", top: "70%", delay: 0, color: "blue" },
  { Icon: Check, left: "23%", top: "91%", delay: 0.08, color: "green" },
  { Icon: Star, left: "45%", top: "80%", delay: 0.15, color: "gold" },
  { Icon: Lightbulb, left: "69%", top: "91%", delay: 0.04, color: "blue" },
  { Icon: Target, left: "89%", top: "72%", delay: 0.12, color: "gold" },
  { Icon: Check, left: "97%", top: "50%", delay: 0.2, color: "green" },
];

const confettiParticles: CelebrationParticle[] = [
  { Icon: Star, left: "5%", delay: 0.02, color: "gold", rotate: -24 },
  { Icon: TrendingUp, left: "12%", delay: 0.18, color: "blue", rotate: 12 },
  { Icon: Check, left: "20%", delay: 0.09, color: "green", rotate: -8 },
  { Icon: Star, left: "28%", delay: 0.25, color: "blue", rotate: 18 },
  { Icon: Lightbulb, left: "36%", delay: 0.04, color: "gold", rotate: -15 },
  { Icon: Check, left: "44%", delay: 0.22, color: "blue", rotate: 9 },
  { Icon: Star, left: "52%", delay: 0.1, color: "green", rotate: -20 },
  { Icon: TrendingUp, left: "60%", delay: 0.29, color: "gold", rotate: 14 },
  { Icon: Check, left: "68%", delay: 0.06, color: "blue", rotate: -5 },
  { Icon: Star, left: "76%", delay: 0.2, color: "gold", rotate: 20 },
  { Icon: Target, left: "84%", delay: 0.13, color: "green", rotate: -12 },
  { Icon: Check, left: "93%", delay: 0.27, color: "blue", rotate: 7 },
  { Icon: Star, left: "9%", delay: 0.34, color: "blue", rotate: 16 },
  { Icon: Check, left: "31%", delay: 0.39, color: "gold", rotate: -17 },
  { Icon: TrendingUp, left: "49%", delay: 0.33, color: "green", rotate: 11 },
  { Icon: Star, left: "72%", delay: 0.37, color: "blue", rotate: -10 },
  { Icon: Check, left: "89%", delay: 0.32, color: "gold", rotate: 19 },
  { Icon: Target, left: "97%", delay: 0.41, color: "green", rotate: -13 },
];

function CelebrationLayer({
  kind,
  celebrationKey,
  reducedMotion,
}: {
  kind: "started" | "ready" | "submitted";
  celebrationKey: number;
  reducedMotion: boolean;
}) {
  const isConfetti = kind === "ready" || kind === "submitted";
  const particles = isConfetti ? confettiParticles : starterParticles;
  const statusText = kind === "ready"
    ? "Application Ready ✓"
    : kind === "submitted"
      ? "Application Submitted ✓"
      : "";

  return (
    <>
      {!reducedMotion && (
        <div aria-hidden="true" className={`form-celebration form-celebration-${kind}`} key={celebrationKey}>
          {particles.map(({ Icon, left, delay, color, ...position }, index) => (
            <motion.span
              animate={
                isConfetti
                  ? { opacity: [0, 1, 0.9, 0], y: [0, 115 + (index % 4) * 24], rotate: [(position.rotate ?? 0), (position.rotate ?? 0) + 95] }
                  : { opacity: [0, 1, 0], y: [12, -32 - (index % 3) * 8], x: index % 2 === 0 ? [0, -12] : [0, 12], rotate: [0, index % 2 === 0 ? -22 : 22] }
              }
              className={`form-particle form-particle-${color}`}
              initial={reducedMotion ? false : { opacity: 0, y: 0 }}
              key={`${celebrationKey}-${index}`}
              style={{ left, top: isConfetti ? "-8px" : position.top }}
              transition={{
                delay: isConfetti ? delay : delay * 0.4,
                duration: isConfetti ? 1.65 : 1.05,
                ease: "easeOut",
              }}
            >
              <Icon aria-hidden="true" size={isConfetti ? 13 : 14} strokeWidth={2} />
            </motion.span>
          ))}
          {isConfetti && ["9%", "35%", "64%", "91%"].map((left, index) => (
            <motion.i
              animate={{
                opacity: [0, 0.95, 0.8, 0],
                y: [0, 125 + (index % 2) * 34],
                rotate: [index % 2 ? -20 : 20, index % 2 ? 110 : -100],
              }}
              className={`form-confetti-paper form-confetti-paper-${index % 3}`}
              initial={{ opacity: 0, y: 0 }}
              key={`${celebrationKey}-paper-${index}`}
              style={{ left, top: "-8px" }}
              transition={{ delay: 0.08 + index * 0.1, duration: 1.7, ease: "easeOut" }}
            />
          ))}
        </div>
      )}
      {statusText && (
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className={`form-celebration-status${reducedMotion ? " is-reduced-motion" : ""}`}
          initial={reducedMotion ? false : { opacity: 0, y: 5 }}
          key={`${celebrationKey}-status`}
          role="status"
          transition={{ duration: reducedMotion ? 0 : 0.24 }}
        >
          <CheckCircle2 aria-hidden="true" size={15} />
          {statusText}
        </motion.p>
      )}
    </>
  );
}

export function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submissionError, setSubmissionError] = useState("");
  const [validFields, setValidFields] = useState<
    Partial<Record<FieldName | "riskAcknowledged", boolean>>
  >({});
  const [celebration, setCelebration] = useState<"started" | "ready" | "submitted" | null>(null);
  const [celebrationKey, setCelebrationKey] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const hasStarted = useRef(false);
  const wasComplete = useRef(false);
  const celebrationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => () => {
    if (celebrationTimer.current) clearTimeout(celebrationTimer.current);
  }, []);

  function triggerCelebration(kind: "started" | "ready" | "submitted", duration: number) {
    if (celebrationTimer.current) clearTimeout(celebrationTimer.current);
    setCelebration(kind);
    setCelebrationKey((current) => current + 1);
    celebrationTimer.current = setTimeout(() => setCelebration(null), duration);
  }

  function updateProgress(form: HTMLFormElement) {
    const validation = validateApplication(readApplication(new FormData(form)));
    const nextValidFields = Object.fromEntries([
      ...requiredFieldNames.map((name) => [name, !validation[name]]),
      ["riskAcknowledged", !validation.riskAcknowledged],
    ]) as Partial<Record<FieldName | "riskAcknowledged", boolean>>;
    setValidFields(nextValidFields);

    const complete = Object.keys(validation).length === 0;
    setIsComplete(complete);
    if (complete && !wasComplete.current) {
      triggerCelebration("ready", 2200);
    } else if (!complete && celebration === "ready") {
      if (celebrationTimer.current) clearTimeout(celebrationTimer.current);
      setCelebration(null);
    }
    wasComplete.current = complete;
  }

  function handleFirstFieldFocus(event: FocusEvent<HTMLFormElement>) {
    const target = event.target;
    if (
      !hasStarted.current &&
      target instanceof HTMLElement &&
      target.matches("input:not([type='checkbox']), select, textarea")
    ) {
      hasStarted.current = true;
      triggerCelebration("started", 1400);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionError("");
    const form = event.currentTarget;
    const application = readApplication(new FormData(form));
    const validationErrors = validateApplication(application);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      const firstInvalidField = Object.keys(validationErrors)[0];
      form.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      await submitApplication(application);
      setIsSubmitted(true);
      triggerCelebration("submitted", 2200);
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "We couldn't submit your application. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className={`application-form-stage${celebration === "submitted" ? " is-celebrating" : ""}`}>
        {celebration && (
          <CelebrationLayer
            celebrationKey={celebrationKey}
            kind={celebration}
            reducedMotion={Boolean(reduceMotion)}
          />
        )}
        <div className="form-success" role="status">
          <span className="success-icon"><CheckCircle2 aria-hidden="true" size={27} /></span>
          <p className="eyebrow">Application Received</p>
          <h3>Application Received</h3>
          <p>
            Thank you for your interest in the Mehta Insights 16-Week Live-Mentored
            Trading Program. Our team will review your application and contact you
            if the program is a suitable fit.
          </p>
        </div>
      </div>
    );
  }

  const controlAttributes = (name: FieldName) => ({
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    "aria-invalid": Boolean(errors[name]),
  });

  function clearFieldError(name: string) {
    if (!Object.hasOwn(errors, name)) return;
    setErrors((current) => {
      const next = { ...current };
      delete next[name as keyof FieldErrors];
      return next;
    });
  }

  return (
    <div className={`application-form-stage${celebration ? " is-celebrating" : ""}`}>
      {celebration && (
        <CelebrationLayer
          celebrationKey={celebrationKey}
          kind={celebration}
          reducedMotion={Boolean(reduceMotion)}
        />
      )}
      <AnimatePresence>
        {isComplete && !celebration && (
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="form-ready-settled"
            exit={{ opacity: 0, y: -4 }}
            initial={{ opacity: 0, y: 4 }}
            role="status"
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <CheckCircle2 aria-hidden="true" size={14} />
            Application Ready ✓
          </motion.p>
        )}
      </AnimatePresence>
      <form
        className="application-form"
        onChange={(event) => {
          updateProgress(event.currentTarget);
          const target = event.target;
          if (
            target instanceof HTMLInputElement ||
            target instanceof HTMLSelectElement ||
            target instanceof HTMLTextAreaElement
          ) {
            clearFieldError(target.name);
          }
        }}
        onFocusCapture={handleFirstFieldFocus}
        onSubmit={handleSubmit}
        noValidate
      >
      <div className="form-grid">
        <Field complete={validFields.fullName} error={errors.fullName} id="fullName" label="Full Name">
          <input {...controlAttributes("fullName")} autoComplete="name" className="form-control" id="fullName" maxLength={100} name="fullName" placeholder="Your name" required />
        </Field>
        <Field complete={validFields.email} error={errors.email} id="email" label="Email Address">
          <input {...controlAttributes("email")} autoComplete="email" className="form-control" id="email" maxLength={254} name="email" placeholder="you@example.com" required type="email" />
        </Field>
        <Field complete={validFields.phone} error={errors.phone} id="phone" label="Phone Number">
          <input
            {...controlAttributes("phone")}
            autoComplete="tel"
            className="form-control"
            id="phone"
            maxLength={20}
            name="phone"
            placeholder="+91 98765 43210"
            required
            type="tel"
          />
        </Field>
        <Field complete={validFields.city} error={errors.city} id="city" label="Current City">
          <input {...controlAttributes("city")} autoComplete="address-level2" className="form-control" id="city" maxLength={100} name="city" placeholder="Where are you based?" required />
        </Field>
        <SelectField complete={validFields.experience} error={errors.experience} id="experience" label="Trading Experience" options={inputOptions.experience} />
        <SelectField complete={validFields.approach} error={errors.approach} id="approach" label="Current Trading Approach" options={inputOptions.approach} />
        <Field complete={validFields.improvement} error={errors.improvement} id="improvement" label="What would you most like to improve?">
          <textarea
            {...controlAttributes("improvement")}
            className="form-control form-textarea"
            id="improvement"
            maxLength={1000}
            name="improvement"
            placeholder="Tell us what you would most like to improve…"
            required
            rows={4}
          />
        </Field>
        <SelectField complete={validFields.consultationMode} error={errors.consultationMode} id="consultationMode" label="Preferred Consultation Mode" options={inputOptions.consultationMode} />
        <SelectField complete={validFields.referralSource} error={errors.referralSource} id="referralSource" label="How did you hear about Mehta Insights?" options={inputOptions.referralSource} />
      </div>

      <div className="risk-field">
        <label className="risk-confirmation">
          <input
            aria-describedby={errors.riskAcknowledged ? "riskAcknowledged-error" : undefined}
            aria-invalid={Boolean(errors.riskAcknowledged)}
            name="riskAcknowledged"
            required
            type="checkbox"
          />
          <span>
            I understand that this is an educational program and that
            trading/investing involves market risk. No returns or profits are
            guaranteed.
          </span>
          {validFields.riskAcknowledged && <Check aria-hidden="true" className="field-complete-mark risk-complete-mark" size={13} />}
        </label>
        {errors.riskAcknowledged && <span className="field-error" id="riskAcknowledged-error">{errors.riskAcknowledged}</span>}
      </div>

      {submissionError && <p className="form-error" role="alert">{submissionError}</p>}

      <div className="form-submit-row">
        <button className="button button-blue form-submit" disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <>Submitting <LoaderCircle aria-hidden="true" className="spin" size={17} /></>
          ) : (
            <>Submit Application <ArrowRight aria-hidden="true" size={17} /></>
          )}
        </button>
        <p>Your application will be reviewed by the program team.</p>
      </div>
      </form>
    </div>
  );
}

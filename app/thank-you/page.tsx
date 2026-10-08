"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function ThankYouPage() {
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = window.setTimeout(() => {
      router.push("/#application");
    }, 5000);

    return () => window.clearTimeout(redirectTimer);
  }, [router]);

  return (
    <main className="application-section thank-you-page">
      <div className="container">
        <section aria-labelledby="thank-you-title" className="application-form-wrap thank-you-card">
          <div className="form-success">
            <span className="success-icon">
              <CheckCircle2 aria-hidden="true" size={27} />
            </span>
            <p className="eyebrow">Thank You for Applying</p>
            <h1 id="thank-you-title">Thank You for Applying</h1>
            <p className="thank-you-message">
              Thank you for your interest in the Mehta Insights 16-Week
              Live-Mentored Trading Program. Our team will review your
              application and contact you if the program is a suitable fit.
            </p>
            <button
              className="button button-blue"
              onClick={() => router.push("/#application")}
              type="button"
            >
              Continue
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

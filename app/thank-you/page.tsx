import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function ThankYouPage() {
  return (
    <main className="application-section thank-you-page">
      <div className="container">
        <section aria-labelledby="thank-you-title" className="application-form-wrap thank-you-card">
          <div className="form-success">
            <span className="success-icon">
              <CheckCircle2 aria-hidden="true" size={27} />
            </span>
            <p className="eyebrow">Application Received</p>
            <h1 id="thank-you-title">Application Received</h1>
            <p className="thank-you-message">
              Thank you for your interest in the Mehta Insights 16-Week
              Live-Mentored Trading Program. Our team will review your
              application and contact you if the program is a suitable fit.
            </p>
            <Link className="button button-blue" href="/">
              Return to Mehta Insights
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
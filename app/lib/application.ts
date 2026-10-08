export type ApplicationPayload = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  experience: string;
  approach: string;
  improvement: string;
  consultationMode: string;
  referralSource: string;
  riskAcknowledged: boolean;
};

export async function submitApplication(
  application: ApplicationPayload,
): Promise<void> {
  if (!application.riskAcknowledged) {
    throw new Error("Risk disclaimer confirmation is required.");
  }

  // Replace this simulated handoff with a CRM, automation, or API integration.
  await new Promise<void>((resolve) => {
    window.setTimeout(resolve, 850);
  });
}

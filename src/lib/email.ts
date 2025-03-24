import * as SibApiV3Sdk from "@sendinblue/client";

// Initialize Brevo API client
const initBrevoClient = () => {
  const client = new SibApiV3Sdk.TransactionalEmailsApi();

  // Set API key for authentication
  client.setApiKey(
    SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY || ""
  );

  return client;
};

// Interface for email data
interface SendEmailProps {
  to: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  templateId?: number; // Optional if using Brevo templates
  params?: Record<string, any>; // Optional template parameters
}

/**
 * Sends an email using Brevo API
 * @param emailData - Object containing email details
 * @returns Promise with the email response
 */
export async function sendEmail({
  to,
  subject,
  htmlContent,
  textContent,
  templateId,
  params,
}: SendEmailProps) {
  try {
    const client = initBrevoClient();

    const sendSmtpEmail = {
      to: [{ email: to }],
      sender: {
        email: "info@offertu.nu",
        name: "Offertu",
      },
      subject: subject,
      htmlContent: htmlContent,
      textContent: textContent,
      templateId: templateId,
      params: params,
    };

    const response = await client.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent successfully:", response);
    return { success: true, data: response };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error };
  }
} 
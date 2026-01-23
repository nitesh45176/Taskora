import { Resend } from "resend"

let resend = null

const getResendClient = () => {
  if (!resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not defined in environment variables')
    }
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

//removed resend email for sometime
export const sendEmail = async ({ to, subject, text }) => {
  if (process.env.ENABLE_EMAIL_VERIFICATION !== "true") {
    console.log("📧 EMAIL BYPASSED (DEV MODE)");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("Text:", text);
    return;
  }

  const client = getResendClient();

  await client.emails.send({
    from: process.env.MAIL_FROM,
    to,
    subject,
    text,
  });
};

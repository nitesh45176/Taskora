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

export const sendEmail = async ({ to, subject, text }) => {
  const client = getResendClient()
  
  await client.emails.send({
    from: process.env.MAIL_FROM,
    to,
    subject,
    text
  })
}
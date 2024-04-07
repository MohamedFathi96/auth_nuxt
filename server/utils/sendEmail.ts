import { transporter } from "~/server/config/nodemailer";
interface EmailData {
  email: string;
  body: string;
  subject: string;
}
async function sendEmail({
  body,
  email,
  subject,
}: EmailData): Promise<boolean> {
  try {
    await transporter.sendMail({
      to: email,
      subject,
      html: body,
    });
    return true;
  } catch (error) {
    return false;
  }
}

export default sendEmail;

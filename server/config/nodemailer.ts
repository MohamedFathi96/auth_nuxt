import nodemailer from "nodemailer";

const { gmailEmail, gmailPassword } = useRuntimeConfig();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
  defaultFrom: gmailEmail,
});

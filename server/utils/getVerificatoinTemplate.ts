type EmailTemplateProps = {
  username: string;
  verificationCode: string;
  appName: string;
};

function getVerificatoinTemplate({
  appName,
  username,
  verificationCode,
}: EmailTemplateProps) {
  const subject = `Welcome to ${appName} - Email Verification`;
  const body = `
    <p>Welcome ${username},</p>
    <p>Thank you for registering with ${appName}! Please use the following verification code to verify your email address:</p>
    <p style="font-size: 24px; font-weight: bold;">${verificationCode}</p>
    <p>If you did not sign up for an account with ${appName}, please ignore this email.</p>
    <p>Best regards,<br/>${appName} Team</p>
  `;

  return { subject, body };
}

export default getVerificatoinTemplate;

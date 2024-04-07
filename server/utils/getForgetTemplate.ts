type EmailTemplateProps = {
  appName: string;
  username: string;
  resetLink: string;
};

function getForgetTemplate({
  appName,
  username,
  resetLink,
}: EmailTemplateProps) {
  const subject = `Reset Your ${appName} Password`;
  const body = `
    <p>Dear ${username},</p>
    <p>We received a request to reset your password for ${appName}. Please click the link below to reset your password:</p>
    <p style="font-size: 26px;"><a href="${resetLink}" style="font-weight: bold; color: blue;">Reset Password</a></p>
    <p>If you did not request a password reset, you can safely ignore this email.</p>
    <p>Best regards,<br/>${appName} Team</p>
  `;

  return { subject, body };
}

export default getForgetTemplate;

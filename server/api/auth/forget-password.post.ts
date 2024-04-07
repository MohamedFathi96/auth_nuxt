import { getUser, updateUser } from "~/server/models/user.model";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{ email: string } | null>(event);
    if (!body) {
      return createError({ statusCode: 400, statusMessage: "Bad request." });
    }
    const user = await getUser("EMAIL", body.email);
    if (!user) {
      return createError({
        statusCode: 404,
        statusMessage: "Email not found.",
      });
    }
    if (!user.verified) {
      return createError({
        statusCode: 401,
        statusMessage: "User not found...",
      });
    }
    const id = generateID(6);
    const resetPassword = await hashString(id);
    const resetPasswordExpAt = new Date(Date.now() + 10 * 60 * 1000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ")
      .replace("Z", ""); // 10 minutes

    await updateUser({ id: user.id, resetPassword, resetPasswordExpAt });

    const emailTemplate = getForgetTemplate({
      appName: "Top Websites",
      username: user.name,
      resetLink: `${
        useRuntimeConfig().appUrl
      }/auth/reset-password/?id=${id}&uuid=${user.id}`,
    });

    const emailIsSend = await sendEmail({
      email: user.email,
      ...emailTemplate,
    });
    if (!emailIsSend) {
      return createError({
        statusCode: 500,
        statusMessage:
          "Apologies, an internal server error is hindering the verification email sending. Please contact our development team.",
      });
    }

    return 200;
  } catch (error) {
    console.log(error);
    return createError({
      statusCode: 500,
      statusMessage: "Something went wrong.",
    });
  }
});

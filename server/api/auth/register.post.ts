import { UserModel, createUser } from "~/server/models/user.model";

export default defineEventHandler(async (event) => {
  try {
    const body = (await readBody(event)) as UserModel;
    if (!body) {
      return createError({
        statusCode: 400,
        statusMessage: "Bad request.",
      });
    }
    const verificationCode = generateID(6);
    const user: UserModel = {
      id: generateID(8),
      name: body.name,
      email: body.email,
      password: await hashString(body.password),
      verificationCode: await hashString(verificationCode),
      verificationCodeExpAt: new Date(Date.now() + 30 * 60 * 1000), // 10 minutes
    };

    await createUser(user);

    const emailTemplate = getVerificatoinTemplate({
      appName: "Nuxt Auth",
      username: user.name,
      verificationCode,
    });
    const sendAnEmail = await sendEmail({
      ...emailTemplate,
      email: user.email,
    });
    if (!sendAnEmail) {
      return createError({
        statusCode: 500,
        statusMessage:
          "Apologies, an internal server error is hindering the verification email sending. Please contact our development team.",
      });
    }
    return user.id;
  } catch (error: any) {
    console.log(error);
    return createError({
      statusCode: 500,
      statusMessage: "Something went wrong!!!",
    });
  }
});

import { getUser, updateUser } from "~/server/model/user.model";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{ id: string; code: string } | null>(event);
    if (!body) {
      return createError({ statusCode: 400, statusMessage: "Bad request." });
    }
    const user = await getUser("ID", body.id);
    if (!user || Date.now() > new Date(user.verificationCodeExpAt!).getTime()) {
      return createError({
        statusCode: 404,
        statusMessage:
          "Possible issues: Invalid user, expired verification code, or user already verified.",
      });
    }
    const isVerificationCodeCorrect = await bcrypt.compare(
      body.code as unknown as string,
      user.verificationCode!
    );
    if (!isVerificationCodeCorrect) {
      return createError({
        statusCode: 400,
        statusMessage: "Invalid verification code.",
      });
    }
    await updateUser({
      id: body.id,
      verified: 1,
    });

    return 200;
  } catch (error) {
    console.log(error);
    return createError({
      statusCode: 500,
      statusMessage: "Something went wrong.",
    });
  }
});

import { getUser, updateUser } from "~/server/model/user.model";
import bcrypt from "bcrypt";

interface Query {
  uuid: string; // User Id
  id: string; // New Password
}
export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event) as unknown as Query | null;
    const body = await readBody<{ password: string } | null>(event);
    if (!query || !query.id || !query.uuid || !body) {
      return createError({ statusCode: 400, statusMessage: "Bad request." });
    }

    const user = await getUser("ID", query.uuid);

    // || Date.now() > new Date(user.resetPasswordExpAt!).getTime()
    if (!user) {
      return createError({
        statusCode: 404,
        statusMessage: "User not found or verification code has expired.",
      });
    }
    const isResetPasswordIDCorrect = await bcrypt.compare(
      query.id,
      user.resetPassword!
    );
    if (!isResetPasswordIDCorrect) {
      return createError({ statusCode: 400, statusMessage: "Invalid link ID" });
    }
    await updateUser({
      id: user.id,
      password: await hashString(body.password),
    });

    return 200;
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: "Something went wrong.",
    });
  }
});

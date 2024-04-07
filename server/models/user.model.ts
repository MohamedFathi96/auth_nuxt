import { executeQuery } from "../config/dbConnection";

export type UserModel = {
  id: string;
  name: string;
  email: string;
  password: string;
  role?: "ADMIN" | "USER";
  verified?: 1 | 0;
  verificationCode: string | null;
  verificationCodeExpAt: Date | null;
  resetPassword?: string | undefined;
  resetPasswordExpAt?: Date | undefined;
};

export const getUser = async (key: "NAME" | "ID" | "EMAIL", value: string) => {
  const [user] = await executeQuery({
    query: `SELECT * FROM \`my_top_websites\`.users where ${key.toLowerCase()} = '${value}';`,
  });

  return user as UserModel;
};

export const updateUser = async (updatedUser: Partial<UserModel>) => {
  const { id, ...updates } = updatedUser;
  const updateFields = Object.keys(updates)
    .map((key) => `${key} = '${updates[key]}'`)
    .join(", ");

  const result = await executeQuery({
    query: `UPDATE my_top_websites.users SET ${updateFields} WHERE id = '${id}';`,
  });

  return result;
};

export const createUser = async (userInfo: UserModel) => {
  const result = await executeQuery({
    query: `INSERT INTO \`my_top_websites\`.users (id, name, email, password, verificationCode, verificationCodeExpAt) VALUES (?, ?, ?, ?, ?, ?);
`,
    values: Object.values(userInfo),
  });

  return result;
};

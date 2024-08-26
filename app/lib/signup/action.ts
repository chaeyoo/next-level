"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";
import { auth } from "@/auth";

const UserSchema = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  passwordConfirm: z.string().min(6),
  nickname: z.string(),
});

const CreateUserSchema = UserSchema.omit({ id: true }).refine(
  (data) => data.password === data.passwordConfirm,
  {
    message: "Passwords do not match.",
    path: ["passwordConfirm"],
  }
);
// const UpdateUser = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    email?: string[];
    password?: string[];
    passwordConfirm?: string[];
    nickname?: string[];
  };
  message: string | null;
};

export async function createUser(
  prevState: State,
  formData: FormData
): Promise<State> {
  const session = await auth();
  const id = session?.user.id || "0";
  console.log(id, "로그인한 유저의 아이디");
  const validatedFields = CreateUserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("password-confirm"),
    nickname: formData.get("nickname"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create User.",
    };
  }
  const { email, password, nickname } = validatedFields.data;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  try {
    await sql`
      INSERT INTO users (email, password, name)
      VALUES (${email}, ${hash}, ${nickname})
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create User.",
    };
  }
  revalidatePath("/");
  redirect("/");
}

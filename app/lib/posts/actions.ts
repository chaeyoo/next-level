"use server";

import { auth } from "@/auth";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  id: z.string(),
  categoryId: z.string(),
  title: z.string(),
  content: z.string(),
});

const CreatePost = FormSchema.omit({ id: true });
const UpdatePost = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    categoryId?: string[];
    title?: string[];
    content?: string[];
  };
  message?: string | null;
};

export async function createPost(prevState: State, formData: FormData) {
  const validatedFields = CreatePost.safeParse({
    categoryId: formData.get("categoryId"),
    title: formData.get("title"),
    content: formData.get("content"),
  });

  console.log(formData, "formData");
  const session = await auth();
  const id = session?.user.id || "0";
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
  const { categoryId, title, content } = validatedFields.data;

  try {
    await sql`
          INSERT INTO posts (category_id, title, content, user_id)
          VALUES (${categoryId}, ${title}, ${content}, ${id})
        `;
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }
  revalidatePath("/posts");
  redirect("/posts");
}

export async function updatePost(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdatePost.safeParse({
    categoryId: formData.get("categoryId"),
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Posts.",
    };
  }

  const { categoryId, title, content } = validatedFields.data;

  try {
    await sql`
            UPDATE posts
            SET category_id = ${categoryId}, title = ${title}, content = ${content}
            WHERE id = ${id}
          `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }
  revalidatePath("/posts");
  redirect("/posts");
}

export async function deletePost(id: string) {
  try {
    await sql`DELETE FROM posts WHERE id = ${id}`;
    revalidatePath("/posts");
    return { message: "Deleted Post." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Post." };
  }
}

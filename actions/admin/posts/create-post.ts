"use server";

import { db } from "@/lib/db";
import { posts } from "@/schema/posts";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/services/authorization-service";


const insertPostSchema = z.object({
  title: z.coerce.string(),
  content: z.coerce.string(),
});


export interface CreatePostState {
  errors?: {
    id?: string[];
    title?: string[];
    content?: string[];
  };
  message?: string;
}

export async function createPost(
  prevState: CreatePostState,
  formData: FormData
): Promise<CreatePostState> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("unauthenticated");
  }

  if (!isAdmin(session)) {
    throw new Error("unauthorized");
  }


  const validatedFields = insertPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "invalid data",
    };
  }

  try {
    await db.insert(posts).values(validatedFields.data);
  } catch (error) {
    console.error(error);
    return {
      message: "database error",
    }
  }

  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

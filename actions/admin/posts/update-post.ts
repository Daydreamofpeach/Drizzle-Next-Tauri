"use server";

import { db } from "@/lib/db";
import { posts } from "@/schema/posts";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/services/authorization-service";

const updatePostSchema = z.object({
  id: z.coerce.string().uuid(),
  title: z.coerce.string(),
  content: z.coerce.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
  .partial()
  .required({ id: true });

export interface UpdatePostState {
  errors?: {
    id?: string[];
    title?: string[];
    content?: string[];
    createdAt?: string[];
    updatedAt?: string[];
  };
  message?: string;
}

export async function updatePost(
  prevState: UpdatePostState,
  formData: FormData
): Promise<UpdatePostState> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("unauthenticated");
  }

  if (!isAdmin(session)) {
    throw new Error("unauthorized");
  }


  const validatedFields = updatePostSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    content: formData.get("content"),
    createdAt: formData.get("createdAt"),
    updatedAt: formData.get("updatedAt"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "invalid data",
    };
  }

  try {
    await db
      .update(posts)
      .set(validatedFields.data)
      .where(eq(posts.id, validatedFields.data.id));
  } catch (error) {
    console.error(error);
    return {
      message: "database error",
    }
  }

  revalidatePath("/admin/posts");
  revalidatePath("/admin/posts/" + validatedFields.data.id);
  revalidatePath("/admin/posts/" + validatedFields.data.id + "/edit");
  redirect("/admin/posts/" + validatedFields.data.id);
}

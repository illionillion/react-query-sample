"use server";

import { PostFormType } from "@/schema/post";
import { db } from "@/utils/db";

export const CreatePost = async (data: PostFormType) => {
  const { comment } = data;

  try {
    const result = await db.post.create({
      data: {
        comment,
      },
    });

    return { success: true, post: result };
  } catch (error) {
    console.error("CreatePost Error:", error);

    return { success: false, post: undefined };
  }
};

export const GetPosts = async () => {
  try {
    const posts = await db.post.findMany();

    return { success: true, posts };
  } catch (error) {
    console.error("GetPosts Error:", error);
    return { success: false, posts: [] };
  }
};

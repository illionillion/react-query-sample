import { z } from "zod";

export const PostSchame = z
  .object({
    comment: z
      .string()
      .trim()
      .min(1, { message: "1文字以上必須" })
      .max(100, { message: "100文字以内" }),
  })
  .brand("PostSchame");

export type PostFormType = z.infer<typeof PostSchame>;

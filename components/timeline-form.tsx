"use client";
import { FC } from "react";
import {
    VStack,
    FormControl,
    Input,
    Button,
    Card,
    CardBody,
    Text,
    Box,
    ui
} from "@yamada-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostFormType, PostSchame } from "@/schema/post";
import { CreatePost, GetPosts } from "@/actions/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const TimelineForm: FC = () => {
    const queryClient = useQueryClient();

    // 投稿一覧の取得
    const { data: posts, isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const { posts, success } = await GetPosts();
            if (!success) throw new Error("投稿の取得に失敗しました");
            return posts;
        },
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PostFormType>({
        resolver: zodResolver(PostSchame),
        defaultValues: {
            comment: "",
        },
    });

    // 投稿作成用のミューテーション
    const mutation = useMutation({
        mutationFn: async (data: PostFormType) => {
            const { post, success } = await CreatePost(data);
            if (!success) throw new Error("投稿の作成に失敗しました");
            return post;
        },
        onSuccess: (newPost) => {
            // 新しい投稿をキャッシュに追加
            queryClient.setQueryData(["posts"], (oldPosts: PostFormType[]) => [
                ...(oldPosts || []),
                newPost,
            ]);

            // もしくはキャッシュ自体を更新
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            reset();
        },
    });

    return (
        <VStack>
            <ui.form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
                <VStack>
                    <FormControl
                        label="コメント"
                        invalid={!!errors.comment}
                        errorMessage={errors.comment ? errors.comment.message : undefined}
                    >
                        <Input type="text" placeholder="コメント" {...register("comment")} />
                    </FormControl>
                    <Box>
                        <Button type="submit" loading={isSubmitting || mutation.isPending}>
                            投稿
                        </Button>
                    </Box>
                </VStack>
            </ui.form>

            <VStack>
                {isLoading ? (
                    <Text>読み込み中...</Text>
                ) : posts && posts.length === 0 ? (
                    <Card>
                        <CardBody>
                            <Text>投稿がありません</Text>
                        </CardBody>
                    </Card>
                ) : (
                    posts?.map((post) => (
                        <Card key={post.id}>
                            <CardBody>{post.comment}</CardBody>
                        </Card>
                    ))
                )}
            </VStack>
        </VStack>
    );
};

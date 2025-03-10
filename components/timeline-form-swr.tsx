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
import useSWR, { mutate } from "swr";

export const TimelineFormSWR: FC = () => {
    // 投稿一覧の取得（useSWRを使用）
    const { data: posts, error, isLoading } = useSWR(
        "posts", // キャッシュキー
        async () => {
            const { posts, success } = await GetPosts();
            if (!success) throw new Error("投稿の取得に失敗しました");
            return posts;
        }
    );

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

    // 投稿作成処理
    const onSubmit = async (data: PostFormType) => {
        try {
            const { post: _, success } = await CreatePost(data);
            if (!success) throw new Error("投稿の作成に失敗しました");

            // 新しい投稿をキャッシュに追加
            // mutate("posts", (oldPosts: PostFormType[] = []) => [...oldPosts, post], false);

            // もしくはキャッシュを無効化して再取得
            mutate("posts");

            reset();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <VStack>
            <ui.form onSubmit={handleSubmit(onSubmit)}>
                <VStack>
                    <FormControl
                        label="コメント"
                        invalid={!!errors.comment}
                        errorMessage={errors.comment ? errors.comment.message : undefined}
                    >
                        <Input type="text" placeholder="コメント" {...register("comment")} />
                    </FormControl>
                    <Box>
                        <Button type="submit" loading={isSubmitting}>
                            投稿
                        </Button>
                    </Box>
                </VStack>
            </ui.form>

            <VStack>
                {isLoading ? (
                    <Text>読み込み中...</Text>
                ) : error ? (
                    <Text color="red">エラーが発生しました</Text>
                ) : posts && posts.length === 0 ? (
                    <Card>
                        <CardBody>
                            <Text>投稿がありません</Text>
                        </CardBody>
                    </Card>
                ) : (
                    posts?.map((post) => (
                        <Card key={post.id}>
                            <CardBody>
                                <Text wordBreak="break-word">
                                    {post.comment}
                                </Text>
                            </CardBody>
                        </Card>
                    ))
                )}
            </VStack>
        </VStack>
    );
};

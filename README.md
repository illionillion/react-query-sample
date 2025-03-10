# TanStack Queryのサンプル

TanStack Query・React Hook Form・Zodを組み合わせた投稿フォーム

## 環境変数

```env
DATABASE_URL="postgresql://johndoe:postgres@localhost:54320/mydb?schema=public"
```

## 実行

```sh
pnpm i
docker compose up -d
pnpm migrate
pnpm dev
```

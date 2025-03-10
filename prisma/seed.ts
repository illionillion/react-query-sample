import { db } from "@/utils/db"

async function main() {

  // console.log("Transaction result:", result) // 結果を確認
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })

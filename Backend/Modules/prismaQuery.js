const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

// Async function will be used to send queries to the database
async function main() {

    await prisma.watchlist.create({
        data: {
          name: "My New Watchlist"
        }
      });
    const allWatchLists = await prisma.watchlist.findMany();
    console.log(allWatchLists);

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})
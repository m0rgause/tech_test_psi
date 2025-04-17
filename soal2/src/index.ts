import app from "./app";
import prisma from "./utils/prisma";

const PORT = process.env.PORT || 3000;

async function startServer() {
  await prisma.$connect();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});

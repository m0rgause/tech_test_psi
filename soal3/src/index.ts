import express from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// Seed Data Dummy
app.post("/seed", async (req, res) => {
  // Hapus data existing (opsional)
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();

  // Buat user
  const user1 = await prisma.user.create({
    data: {
      nama: "Imron",
      telp: "081234567890",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      nama: "Juli",
      email: "sammy@mail.com",
      telp: "0987654321",
    },
  });

  // Buat company
  await prisma.company.create({
    data: {
      user_id: user1.id,
      company_code: "SPI",
    },
  });

  await prisma.company.create({
    data: {
      user_id: user2.id,
      company_code: "PIC",
      company_name: "Samudera",
    },
  });

  res.json({ message: "Data seeded!" });
});

// Endpoint untuk join User + Company
app.get("/users-with-company", async (req, res) => {
  const usersWithCompany = await prisma.user.findMany({
    include: {
      companies: true, // Join dengan relasi companies
    },
    where: {
      companies: { some: {} }, // Hanya user yang punya company
    },
  });

  // Format response sesuai soal
  const result = usersWithCompany.flatMap((user) =>
    user.companies.map((company) => ({
      user_id: user.id,
      company_id: company.id,
      nama: user.nama,
      email: user.email || null,
      telp: user.telp || null,
      company_code: company.company_code,
      company_name: company.company_name || null,
    }))
  );

  res.json(result);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

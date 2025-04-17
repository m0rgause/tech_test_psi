import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fungsi untuk menambahkan voucher
export const addVoucher = async (
  code: string,
  discountPercentage: number,
  pointsPercentage: number
) => {
  try {
    const existingVoucher = await prisma.voucher.findFirst({
      where: { code },
    });

    if (existingVoucher) {
      throw new Error("Voucher dengan kode ini sudah ada.");
    }

    // Menambah voucher baru ke dalam database
    const newVoucher = await prisma.voucher.create({
      data: {
        code,
        discountPercentage,
        pointsPercentage,
      },
    });

    return newVoucher;
  } catch (error) {
    throw error;
  }
};

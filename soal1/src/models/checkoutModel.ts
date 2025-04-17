import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCheckout = async (
  productPrice: number,
  voucherCode: string
) => {
  try {
    // Cari voucher berdasarkan kode
    const voucher = await prisma.voucher.findFirst({
      where: {
        code: voucherCode,
      },
    });

    if (!voucher) {
      throw new Error("Voucher tidak ditemukan");
    }

    // Menghitung diskon dan poin
    const discount = (voucher.discountPercentage / 100) * productPrice;
    const finalPrice = productPrice - discount;
    const points = (voucher.pointsPercentage / 100) * discount;

    // Insert transaksi ke dalam database
    const transaction = await prisma.transaction.create({
      data: {
        productPrice,
        discount,
        finalPrice,
        pointsAwarded: points,
        voucherId: voucher.id,
      },
    });

    return transaction;
  } catch (error) {
    throw error;
  }
};

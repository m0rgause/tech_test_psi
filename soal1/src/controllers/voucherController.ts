import { Request, Response } from "express";
import { addVoucher } from "../models/voucherModel";

export const createVoucher = async (req: Request, res: Response) => {
  const { code, discountPercentage, pointsPercentage } = req.body;

  try {
    // Panggil fungsi addVoucher untuk menambah voucher baru
    const newVoucher = await addVoucher(
      code,
      discountPercentage,
      pointsPercentage
    );
    res.status(201).json({
      success: true,
      message: "Voucher berhasil ditambahkan",
      data: newVoucher,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Terjadi kesalahan",
    });
  }
};

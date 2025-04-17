import { Request, Response } from "express";
import { createCheckout } from "../models/checkoutModel";

export const checkout = async (req: Request, res: Response) => {
  const { productPrice, voucherCode } = req.body;

  try {
    const result = await createCheckout(productPrice, voucherCode);
    res.status(200).json({
      success: true,
      message: "Checkout berhasil",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Terjadi kesalahan",
    });
  }
};

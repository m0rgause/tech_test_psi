import express from "express";
import { checkout } from "../controllers/checkoutController";
import { createVoucher } from "../controllers/voucherController";

const router = express.Router();

// Endpoint untuk menambah voucher
router.post("/voucher", createVoucher);
// Endpoint untuk melakukan checkout
router.post("/checkout", checkout);

export default router;

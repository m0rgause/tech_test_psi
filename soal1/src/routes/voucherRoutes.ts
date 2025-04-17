import express from "express";
import { createVoucher } from "../controllers/voucherController";

const router = express.Router();

// Endpoint untuk menambah voucher
router.post("/voucher", createVoucher);

export default router;

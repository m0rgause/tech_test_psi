import express from "express";
import { checkout } from "../controllers/checkoutController";

const router = express.Router();

router.post("/checkout", checkout);

export default router;

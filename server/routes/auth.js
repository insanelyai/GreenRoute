import express from "express";
import dotenv from "dotenv";
import { login, register } from "../controllers/authController.js";
import Stripe from "stripe";


dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET);
const authRouter = express.Router();


authRouter.post("/register", register);
authRouter.post("/login", login);

authRouter.post("/donationpayment", async (req, res) => {
  const { amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Donation",
            },
            unit_amount: amount * 100, 
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/success", 
      cancel_url: "http://localhost:5173/cancel", 
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: "Failed to create payment session" });
  }
});

export default authRouter;

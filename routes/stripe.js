import express from "express";
const router = express.Router();
import Stripe from "stripe";
// Stripe(process.env.STRIPE_KEY);

const stripe = Stripe(
  "sk_test_51N5OHAL0PcZnqcnafQMYmsrVKMXzP3ajCOSsGrriqu7ch7S8BlABJtw8kjW333Nhyl28o3JzfDda3Sxr3nM93lQt00fVETkl4D"
);
// const stripe = Stripe(process.env.STRIPE_KEY);
// const stripe = Stripe(process.env.STRIPE_KEY);
router.post("/create-checkout-session", async (req, res) => {
  // console.log(req.body);
  // console.log(req.params);
  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.img.secure_url],
          description: item.category,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price,
      },
      quantity: item.cartQuantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "PK", "IN", "BD"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({ url: session.url });
});

export default router;

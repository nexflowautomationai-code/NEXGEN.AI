const crypto = require("crypto");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.post(
  "/webhook/razorpay",
  bodyParser.json(),
  (req, res) => {
    const secret = "razorpay_webhook_secret";

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest !== req.headers["x-razorpay-signature"]) {
      return res.status(400).send("Invalid signature");
    }

    // ✅ PAYMENT VERIFIED
    const event = req.body.event;

    if (event === "payment.captured") {
      const payment = req.body.payload.payment.entity;
      console.log("Razorpay payment success:", payment.id);

      // 👉 Save to DB
      // 👉 Activate automation
    }

    res.json({ status: "ok" });
  }
);

app.listen(4243, () =>
  console.log("Razorpay webhook running on 4243")
);

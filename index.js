const express = require("express");
const { v4: uuidv4 } = require("uuid"); // ← ADD THIS

const app = express();
app.use(express.json());
app.use(express.static("public"));

const orders = [];

app.post("/orders", (req, res) => {
  const order = {
    id: uuidv4(), // ← CHANGED from Date.now().toString()
    item: req.body.item,
    amount: req.body.amount,
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  console.log(`✅ Order created: ${order.id} (${order.item})`);
  res.status(201).json(order);
});

app.get("/orders", (req, res) => {
  res.json(orders);
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(3000, () => {
  console.log("🚀 Order API running on http://localhost:3000");
});

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import axios from "axios";

// Helper function to validate order data
const validateOrderData = (userId, items, amount, address) => {
  if (!userId || !items || !amount || !address) {
    throw new Error("Missing required fields: userId, items, amount, or address.");
  }
  if (!Array.isArray(items)) {
    throw new Error("Items must be an array.");
  }
  if (typeof amount !== "number" || amount <= 0) {
    throw new Error("Amount must be a positive number.");
  }
};

// Placing orders
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentMethod } = req.body;

    // Validate order data
    validateOrderData(userId, items, amount, address);

    // Determine payment status based on payment method
    const payment = paymentMethod === "Khalti"; // true for Khalti, false for COD

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod,
      payment,
      date: Date.now(),
    };

    // Save the order to the database
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Clear the user's cart after placing the order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.status(201).json({ success: true, message: "Your order has been placed successfully.", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Placing orders using Khalti Method
const placeOrderKhalti = async (req, res) => {
  try {
    const { userId, items, amount, address, token } = req.body;

    // Validate order data
    validateOrderData(userId, items, amount, address);

    // Verify Khalti payment using Khalti's server-side API
    const khaltiResponse = await axios.post(
      "https://dev.khalti.com/api/v2/epayment/initiate/",
      { token, amount: amount * 100 }, // Amount in paisa
      {
        headers: {
          Authorization: `Key ${import.meta.env.KHALTI_SECRET_KEY}`,
        },
      }
    );

    if (khaltiResponse.data.state.name !== "Completed") {
      throw new Error("Khalti payment failed.");
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Khalti",
      payment: true, 
      date: Date.now(),
    };

    // Save the order to the database
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Clear the user's cart after placing the order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.status(201).json({ success: true, message: "Order placed successfully using Khalti.", order: newOrder });
  } catch (error) {
    console.error("Error placing Khalti order:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// User Order Data For Frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      throw new Error("User ID is required.");
    }

    const orders = await orderModel.find({ userId });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update Order Status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      throw new Error("Order ID and status are required.");
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!updatedOrder) {
      throw new Error("Order not found.");
    }

    res.status(200).json({ success: true, message: "Order status updated successfully.", order: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export { placeOrder, placeOrderKhalti, allOrders, userOrders, updateStatus };
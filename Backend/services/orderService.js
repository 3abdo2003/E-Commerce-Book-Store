// backend/services/orderService.js
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Book = require('../models/Book');

exports.createOrder = async (userId, orderData) => {
  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.book');
    if (!cart || cart.items.length === 0) {
      throw new Error('Your cart is empty');
    }

    // Calculate total price
    const totalPrice = cart.items.reduce((total, item) => {
      return total + (item.book.price * item.quantity);
    }, 0);

    const newOrder = new Order({
      user: userId,
      items: cart.items,
      totalPrice,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
    });

    const savedOrder = await newOrder.save();

    // Clear the cart after placing the order
    await Cart.findOneAndDelete({ user: userId });

    return savedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getOrderById = async (orderId) => {
  try {
    const order = await Order.findById(orderId).populate('items.book');
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getUserOrders = async (userId) => {
  try {
    const orders = await Order.find({ user: userId }).populate('items.book');
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateOrderStatus = async (orderId, status) => {
  try {
    const validStatuses = ['Pending', 'Shipped', 'Delivered'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }

    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  } catch (error) {
    throw new Error(error.message);
  }
};

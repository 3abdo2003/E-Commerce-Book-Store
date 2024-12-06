const Order = require('../models/Order');


exports.createOrder = async (orderData) => {
  const newOrder = new Order(orderData);
  return await newOrder.save();
};


exports.updateOrderStatus = async (orderId, status) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error('Order not found');

  order.status = status;
  return await order.save();
};


exports.getOrderById = async (orderId) => {
  return await Order.findById(orderId).populate('user', 'name email').populate('items.book');
};

// Service function to get all orders for a user
exports.getOrdersByUserId = async (userId) => {
  return await Order.find({ user: userId })
    .populate('user', 'name email')
    .populate({
      path: 'items.book',
      select: 'title price', 
    })
    .select('_id items totalPrice shippingAddress phoneNumber status'); 
};

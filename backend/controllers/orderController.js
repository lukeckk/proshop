import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
 
// @desc Create new order
// @route POST /api/orders
// @access Private 
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body; // get info from the body of the http request

  if(orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items')
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x, 
        prodcut: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }

});

// @desc Get logged in user orders
// @route GET /api/orders/mine
// @access Private 
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user:req.user._id });
  res.status(200).json(orders);
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private 
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email'); // find the id and populate the user's name and user's email

  if(order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc Update order status to paid
// @route GET /api/orders/:id/pay
// @access Private 
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send('update order status to paid');
});

// @desc Update order status to delivered as admin
// @route GET /api/orders/:id/deliver
// @access Private / Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('update order status to delivered as Admin');
});

// @desc Get all orders as an admin
// @route GET /api/orders
// @access Private / Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send('get all orders as Admin');
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders
};
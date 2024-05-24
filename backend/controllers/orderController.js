import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/OrderModel.js"

// @desc   Create a new order
// @route  POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
    res.send('add order items');
});

// @desc   Get logged-in user's orders
// @route  GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
    res.send('get my orders');
});

// @desc   Get order by id
// @route  GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
    res.send('get order by id');
});

// @desc   Update order to paid
// @route  PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send('update order to paid');
});

// @desc   Update order to delivered
// @route  PUT /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send('update order to delivered');
});

// @desc   Get all orders
// @route  PUT /api/orders
// @access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
    res.send('get all orders');
});

export {
    getAllOrders,
    getMyOrders,
    getOrderById,
    updateOrderToDelivered,
    updateOrderToPaid,
    addOrderItems
}

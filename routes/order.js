const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// PLACE ORDER: POST /api/orders
router.post('/', async (req, res) => {
    try {
        const { customer, tableNumber, items, totalAmount } = req.body;

        const newOrder = new Order({
            customer,
            tableNumber,
            items,
            totalAmount
        });

        const order = await newOrder.save();
        res.status(201).json({ msg: 'Order placed successfully', orderId: order._id });
    } catch (err) {
        res.status(500).send('Order failed');
    }
});

// GET TABLE ORDERS (For Kitchen): GET /api/orders/active
router.get('/active', async (req, res) => {
    try {
        const activeOrders = await Order.find({ status: 'Pending' }).populate('items.menuItem');
        res.json(activeOrders);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
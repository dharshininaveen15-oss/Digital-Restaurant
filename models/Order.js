const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Links to the User model
        required: true 
    },
    tableNumber: { 
        type: Number, 
        required: true 
    },
    items: [{
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
        quantity: { type: Number, default: 1 },
        price: Number // Storing price at time of order in case menu price changes later
    }],
    totalAmount: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['Pending', 'Preparing', 'Served', 'Cancelled'], 
        default: 'Pending' 
    },
    paymentStatus: { 
        type: String, 
        enum: ['Unpaid', 'Paid'], 
        default: 'Unpaid' 
    },
    orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- 1. Middleware ---
app.use(cors());
app.use(express.json());
// Serves your CSS, JS, and Images
app.use(express.static(path.join(__dirname, 'public'))); 

// --- 2. MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/quickserve')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('❌ DB Error:', err));

// --- 3. Order Model ---
const Order = mongoose.model('Order', new mongoose.Schema({
    items: Array,
    total: String,
    tableNumber: String, 
    timestamp: { type: Date, default: Date.now }
}));

// --- 4. Routing Logic ---
const viewPath = (name) => path.join(__dirname, 'public', 'views', `${name}.html`);

// LANDING PAGE: QR Gateway
app.get('/', (req, res) => {
    res.sendFile(viewPath('index')); 
});

// MENU PAGE: Accessed after scanning
app.get('/menu', (req, res) => {
    res.sendFile(viewPath('menu'));
});

// CHECKOUT PAGE
app.get('/checkout', (req, res) => {
    res.sendFile(viewPath('checkout'));
});

// JOIN US / CONTACT PAGE 
app.get('/contact', (req, res) => {
    res.sendFile(viewPath('contact'));
});

// PRIVACY PAGE
app.get('/privacy', (req, res) => {
    res.sendFile(viewPath('privacy'));
});

// TERMS PAGE
app.get('/terms', (req, res) => {
    res.sendFile(viewPath('terms'));
});

// --- 5. API Endpoints ---
app.post('/api/orders', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json({ success: true, message: "Order saved to database!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// --- 6. Start Server ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`---`);
    console.log(`🚀 QuickServe Gateway Active`);
    console.log(`🌐 Desktop: http://localhost:${PORT}`);
    console.log(`📱 Mobile: http://192.168.31.248:${PORT}`); // Using your specific IP
    console.log(`---`);
});
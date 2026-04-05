const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

// GET ALL MENU ITEMS: GET /api/menu
router.get('/', async (req, res) => {
    try {
        const menuItems = await Menu.find({ isAvailable: true });
        res.json(menuItems);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// ADD NEW ITEM (Admin only): POST /api/menu
router.post('/add', async (req, res) => {
    try {
        const newItem = new Menu(req.body);
        const savedItem = await newItem.save();
        res.json(savedItem);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId: {
        type: String,
    },
    items: [
        {
            productId: {
                type: String,
            },
            name: String,
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity can not be less then 1.'],
                deafult: 1,
            },
            price: Number,
        },
    ],
    total_price: {
        type: Number,
        required: true,
        default: 0,
    },
    date_added: {
        type: Date,
        default: Date.now,
    },
});

const order = mongoose.model('Order', orderSchema);
module.exports = order;

const Cart = require('../models/cart');
const Product = require('../models/products');

const getCart = async (req, res) => {
    const userId = req.params.id;
    try {
        const cart = await Cart.findOne({ userId });
        if (cart && cart.items.length > 0) {
            res.send(cart);
        } else {
            res.send(null);
        }
    } catch (err) {
        res.status(500).send('Something went wrong');
    }
};

const addToCart = async (req, res) => {
    const userId = req.params.id;

    const { productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        const item = await Product.findOne({ _id: productId });
        if (!item) {
            res.status(404).json({
                msg: 'Item was not found!',
            });
        }
        const { price } = item;
        const name = item.title;

        if (cart) {
            const itemIndex = cart.items.findIndex((p) => p.productId === productId);
            if (itemIndex > -1) {
                const productItem = cart.items[itemIndex];
                productItem.quantity += quantity;
                cart.items[itemIndex] = productItem;
            } else {
                cart.items.push({
                    productId,
                    name,
                    quantity,
                    price,
                });
            }
            cart.total_price += quantity * price;
            cart = await cart.save();
            res.status(201).send(cart);
        } else {
            const newCart = await Cart.create({
                userId,
                items: [
                    {
                        productId,
                        name,
                        quantity,
                        price,
                    },
                ],
                total_price: quantity * price,
            });
            res.status(201).send(newCart);
        }
    } catch {
        res.status(500).json({
            msg: 'Internal server error',
        });
    }
};

const removeCart = async (req, res) => {
    const { userId } = req.params;
    const { itemId } = req.params;
    try {
        let cart = await Cart.findOne({ userId });
        const itemIndex = cart.items.findIndex((p) => p.productId === itemId);
        if (itemIndex > -1) {
            const productItem = cart.items[itemIndex];
            cart.total_price -= productItem.quantity * productItem.price;
            cart.items.splice(itemIndex, 1);
        }
        cart = await cart.save();
        res.status(201).send(cart);
    } catch (err) {
        res.status(500).send('Something went wrong');
    }
};

module.exports = { addToCart, getCart, removeCart };

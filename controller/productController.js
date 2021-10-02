const Product = require('../models/products');

const getProduct = async (req, res) => {
    try {
        const data = await Product.find();
        res.status(200).json({
            result: data,
        });
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
};
const addProduct = async (req, res) => {
    const productObj = req.body;

    const product = new Product(productObj);
    try {
        await product.save();
        res.status(200).json({
            msg: 'product added successfully',
        });
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
};

const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        await Product.deleteOne({ _id: productId });
        res.status(200).json({
            msg: 'producr delete was successfully',
        });
    } catch (err) {
        res.status(200).json({
            msg: err,
        });
    }
};

module.exports = {
    getProduct,
    addProduct,
    deleteProduct,
};

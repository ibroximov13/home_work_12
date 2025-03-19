const { Product, Category, User } = require('../models');
const logger = require('../logs/winston');

exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({ include: [Category, User] });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, { include: [Category, User] });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProductsByUserId = async (req, res) => {
    try {
        const { user_id } = req.params;
        const products = await Product.findAll({
            where: { user_id },
            include: [Category, User]
        });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProductsByCategoryId = async (req, res) => {
    try {
        const { category_id } = req.params;
        const products = await Product.findAll({
            where: { category_id },
            include: [Category, User]
        });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        await product.update(req.body);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        await product.destroy();
        res.status(200).json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
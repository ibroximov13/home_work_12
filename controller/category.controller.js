const logger = require('../logs/winston');
const { Category } = require('../model');
const { CategoryValidationCreate } = require('../validation/category.validation');

exports.createCategory = async (req, res) => {
    try {
        let {error, value} = CategoryValidationCreate.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const category = await Category.create(value);
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        let {error, value} = CategoryValidationCreate.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });
        await category.update(value);
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });
        await category.destroy();
        res.status(200).json({ message: "Category deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const { Region } = require('../models');
const logger = require('../utils/logger');

exports.createRegion = async (req, res) => {
    try {
        const region = await Region.create(req.body);
        res.status(201).json(region);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllRegions = async (req, res) => {
    try {
        const regions = await Region.findAll();
        res.status(200).json(regions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getRegionById = async (req, res) => {
    try {
        const { id } = req.params;
        const region = await Region.findByPk(id);
        if (!region) return res.status(404).json({ message: "Region not found" });
        res.status(200).json(region);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateRegion = async (req, res) => {
    try {
        const region = await Region.findByPk(req.params.id);
        if (!region) return res.status(404).json({ message: "Region not found" });
        await region.update(req.body);
        res.status(200).json(region);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteRegion = async (req, res) => {
    try {
        const region = await Region.findByPk(req.params.id);
        if (!region) return res.status(404).json({ message: "Region not found" });
        await region.destroy();
        res.status(200).json({ message: "Region deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
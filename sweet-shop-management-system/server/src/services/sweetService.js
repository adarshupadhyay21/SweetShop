// sweet-shop-management-system/sweet-shop-management-system/server/src/services/sweetService.js

const Sweet = require('../models/sweet.model');

const sweetService = {
    addSweet: async (sweetData) => {
        const data = Object.assign({}, sweetData);
        // ensure numeric fields are numbers
        if (data.price != null) data.price = Number(data.price);
        if (data.quantity != null) data.quantity = Number(data.quantity);
        const sweet = new Sweet(data);
        return await sweet.save();
    },

    getAllSweets: async (opts = {}) => {
        // simple pagination support: opts.page, opts.limit
        const page = Math.max(1, Number(opts.page) || 1);
        const limit = Math.max(1, Number(opts.limit) || 100);
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            Sweet.find().skip(skip).limit(limit),
            Sweet.countDocuments()
        ]);
        return { items, total, page, limit };
    },

    getSweetById: async (id) => {
        return await Sweet.findById(id);
    },

    getCategories: async () => {
        return await Sweet.distinct('category');
    },

    // Accept either a string query or an object with filters { q, category, minPrice, maxPrice }
    searchSweets: async (filters) => {
        const q = typeof filters === 'string' ? filters : (filters?.q || '');
        const category = (typeof filters === 'object') ? filters.category : undefined;
        const minPrice = (typeof filters === 'object') ? Number(filters.minPrice || 0) : undefined;
        const maxPrice = (typeof filters === 'object') ? (filters.maxPrice !== undefined ? Number(filters.maxPrice) : undefined) : undefined;

        const mongoQuery = {};
        if (q) mongoQuery.name = new RegExp(q, 'i');
        if (category) mongoQuery.category = category;
        if (minPrice !== undefined && !isNaN(minPrice)) mongoQuery.price = Object.assign(mongoQuery.price || {}, { $gte: minPrice });
        if (maxPrice !== undefined && !isNaN(maxPrice)) mongoQuery.price = Object.assign(mongoQuery.price || {}, { $lte: maxPrice });

        return await Sweet.find(mongoQuery);
    },

    purchaseSweet: async (id, quantity = 1) => {
        const sweet = await Sweet.findById(id);
        if (!sweet) throw new Error('Sweet not found');
        if (sweet.quantity < quantity) throw new Error('Insufficient stock');
        sweet.quantity = sweet.quantity - quantity;
        return await sweet.save();
    },

    restockSweet: async (id, quantity) => {
        const sweet = await Sweet.findById(id);
        if (!sweet) throw new Error('Sweet not found');
        sweet.quantity = sweet.quantity + Number(quantity || 0);
        return await sweet.save();
    },

    updateSweet: async (id, sweetData) => {
        return await Sweet.findByIdAndUpdate(id, sweetData, { new: true });
    },

    deleteSweet: async (id) => {
        return await Sweet.findByIdAndDelete(id);
    }
};

module.exports = sweetService;
// sweet-shop-management-system/sweet-shop-management-system/server/src/services/sweetService.js

const Sweet = require('../models/sweet.model');

const sweetService = {
    addSweet: async (sweetData) => {
        const sweet = new Sweet(sweetData);
        return await sweet.save();
    },

    getAllSweets: async () => {
        return await Sweet.find();
    },

    searchSweets: async (query) => {
        return await Sweet.find({ name: new RegExp(query, 'i') });
    },

    updateSweet: async (id, sweetData) => {
        return await Sweet.findByIdAndUpdate(id, sweetData, { new: true });
    },

    deleteSweet: async (id) => {
        return await Sweet.findByIdAndDelete(id);
    }
};

module.exports = sweetService;
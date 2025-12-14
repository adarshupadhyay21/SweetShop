const mongoose = require('mongoose');

const sweetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        enum: ['chocolates', 'candies', 'gummies', 'lollipops', 'others']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        default: ''
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    image: {
        type: String,
        default: ''
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

sweetSchema.pre('save', function (next) {
    this.isAvailable = this.quantity > 0;
    next();
});

const Sweet = mongoose.model('Sweet', sweetSchema);

module.exports = Sweet;
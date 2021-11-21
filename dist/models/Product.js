"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    pics: [{
            type: String
        }],
    qty: {
        type: Number,
        required: true
    },
    sellerId: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: true,
        ref: "Seller"
    },
    price: {
        type: Number,
        required: true
    },
    group: {
        type: String,
        enum: ['fashion', 'tech', 'household'],
        required: true
    },
    subgroup: {
        type: String,
        enum: ['mobile', 'comp', 'gadgets', 'tv', 'men', 'women', 'furniture', 'accessories'],
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose_1.default.model('Product', ProductSchema);

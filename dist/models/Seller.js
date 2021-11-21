"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SellerSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    sells: [{
            type: mongoose_1.default.SchemaTypes.ObjectId,
            ref: "Order"
        }],
    products: [{
            type: mongoose_1.default.SchemaTypes.ObjectId,
            ref: "Product"
        }]
});
exports.default = mongoose_1.default.model('Seller', SellerSchema);

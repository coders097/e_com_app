"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    clientId: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: true,
        ref: "Client"
    },
    status: {
        type: String,
        enum: ['process', 'success', 'cancel'],
        default: 'process'
    },
    products: [{
            type: mongoose_1.default.SchemaTypes.ObjectId,
            ref: "Product"
        }],
    productNos: [{
            type: Number
        }],
    totalPrice: {
        type: Number,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose_1.default.model('Order', OrderSchema);

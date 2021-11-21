"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CommentSchema = new mongoose_1.default.Schema({
    productId: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: true
    },
    clientId: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose_1.default.model('Comment', CommentSchema);

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Product_1 = __importDefault(require("../models/Product"));
const Seller_1 = __importDefault(require("../models/Seller"));
const Order_1 = __importDefault(require("../models/Order"));
const errors_1 = __importDefault(require("../utils/errors"));
let addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { title, qty, sellerId, price, group, subgroup } = req.body;
    // pics:[]
    let pics = [];
    req.files.forEach((file, i) => {
        let picName = `${sellerId}_${title}_${group}_${Date.now()}_${i}.jpg`;
        fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../storage/products", picName), file.buffer);
        pics.push(picName);
    });
    try {
        let seller = yield Seller_1.default.findById(sellerId);
        if (!seller) {
            errors_1.default.notFoundError(res);
            return;
        }
        let product = yield Product_1.default.create({
            title: title,
            pics: pics,
            qty: qty,
            sellerId: sellerId,
            price: price,
            group: group,
            subgroup: subgroup,
        });
        seller.products.push(product._id);
        seller.save().then(() => {
            res.status(200).json({
                success: true,
                data: {
                    title: title,
                    pics: pics,
                    qty: qty,
                    sellerId: sellerId,
                    price: price,
                    group: group,
                    subgroup: subgroup,
                    _id: product._id.toString()
                }
            });
        }).catch((err) => {
            errors_1.default.serverError(res);
        });
    }
    catch (e) {
        errors_1.default.serverError(res);
    }
});
let updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { price, productId, qty, _id } = req.body;
    if (!productId) {
        errors_1.default.notFoundError(res);
        return;
    }
    if (!price && !qty) {
        errors_1.default.dataMissingError(res);
        return;
    }
    try {
        let seller = yield Seller_1.default.findById(_id);
        let checkExists = false;
        seller.products.forEach((_productId) => {
            if (_productId.toString() === productId)
                checkExists = true;
        });
        if (!checkExists) {
            errors_1.default.resorucePresentError(res);
            return;
        }
        let product = yield Product_1.default.findById(productId);
        if (!product) {
            errors_1.default.notFoundError(res);
            return;
        }
        if (qty)
            product.qty = qty;
        if (price)
            product.price = price;
        product.save().then(() => {
            res.status(200).json({
                success: true
            });
        }).catch((err) => {
            errors_1.default.serverError(res);
        });
    }
    catch (e) {
        errors_1.default.serverError(res);
    }
    ;
});
let deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { productId, _id } = req.body;
    if (!productId) {
        errors_1.default.notFoundError(res);
        return;
    }
    try {
        let seller = yield Seller_1.default.findById(_id);
        let checkExists = false;
        seller.products.forEach((_productId) => {
            if (_productId.toString() === productId)
                checkExists = true;
        });
        if (!checkExists) {
            errors_1.default.resorucePresentError(res);
            return;
        }
        seller.products = seller.products.filter((_productId) => {
            if (_productId.toString() === productId)
                return false;
            else
                return true;
        });
        seller.save().then(() => __awaiter(void 0, void 0, void 0, function* () {
            res.status(200).json({
                success: true
            });
            try {
                let __product = yield Product_1.default.findByIdAndDelete(productId);
                __product.pics.forEach((_string) => {
                    fs_1.default.unlinkSync(path_1.default.join(__dirname, "../../storage/products", _string));
                });
            }
            catch (e) { }
        })).catch((e) => {
            errors_1.default.serverError(res);
        });
    }
    catch (e) {
        errors_1.default.serverError(res);
    }
    ;
});
let changeOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { orderId, status, _id } = req.body;
    if (!orderId || !status) {
        errors_1.default.dataMissingError(res);
        return;
    }
    try {
        let seller = yield Seller_1.default.findById(_id);
        let checkExists = false;
        seller.sells.forEach((_orderId) => {
            if (_orderId.toString() === orderId)
                checkExists = true;
        });
        if (!checkExists) {
            errors_1.default.resorucePresentError(res);
            return;
        }
        let order = yield Order_1.default.findById(orderId);
        if (!order) {
            errors_1.default.notFoundError(res);
            return;
        }
        order.status = status;
        order.save().then(() => {
            res.status(200).json({
                success: true
            });
        }).catch((e) => {
            errors_1.default.serverError(res);
        });
    }
    catch (e) {
        errors_1.default.serverError(res);
    }
});
let refreshSells = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { _id } = req.body;
    try {
        let seller = yield Seller_1.default.findById(_id).populate('sells');
        if (!seller) {
            errors_1.default.resorucePresentError(res);
            return;
        }
        res.status(200).json({
            success: true,
            data: seller.sells
        });
    }
    catch (e) {
        errors_1.default.serverError(res);
    }
});
let fetchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { _id } = req.body;
    try {
        let seller = yield Seller_1.default.findById(_id).populate('products');
        if (!seller) {
            errors_1.default.resorucePresentError(res);
            return;
        }
        res.status(200).json({
            success: true,
            data: seller.products
        });
    }
    catch (e) {
        errors_1.default.serverError(res);
    }
});
exports.default = {
    addProduct,
    fetchProducts,
    updateProduct,
    deleteProduct,
    changeOrderStatus,
    refreshSells
};

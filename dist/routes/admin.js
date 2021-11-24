"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const jwtAuthentication_1 = __importDefault(require("../middlewares/jwtAuthentication"));
const admin_1 = __importDefault(require("../controllers/admin"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// configuring multer
const multerStorage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: multerStorage,
});
// @type POST
// @route /admin/fetchProducts
// @desc  for fetching all product 
// @access PRIVATE
router.post("/fetchProducts", jwtAuthentication_1.default, admin_1.default.fetchProducts);
// @type POST
// @route /admin/addProduct
// @desc  for adding a product
// @access PRIVATE
router.post("/addProduct", upload.any(), (req, res) => {
    (0, jwtAuthentication_1.default)(req, res, () => {
        admin_1.default.addProduct(req, res);
    });
});
// @type PATCH
// @route /admin/updateProduct
// @desc  for updating a product
// @access PRIVATE
router.patch("/updateProduct", jwtAuthentication_1.default, admin_1.default.updateProduct);
// @type DELETE
// @route /admin/deleteProduct
// @desc  for deleting a product
// @access PRIVATE
router.delete("/deleteProduct", jwtAuthentication_1.default, admin_1.default.deleteProduct);
// @type POST
// @route /admin/changeOrderStatus
// @desc  for changing the status of an order
// @access PRIVATE
router.post("/changeOrderStatus", jwtAuthentication_1.default, admin_1.default.changeOrderStatus);
// @type POST
// @route /admin/refreshSells
// @desc  for getting info of latest sells
// @access PRIVATE
router.post("/refreshSells", jwtAuthentication_1.default, admin_1.default.refreshSells);
// @type  GET
// @route /admin/itemPic
// @desc  for getting item's picture
// @access PUBLIC
router.get("/itemPic/:pic/:token", (req, res) => {
    let pic = req.params.pic;
    let token = req.params.token;
    req.headers['Authorization'] = `Bearer ${token}`;
    (0, jwtAuthentication_1.default)(req, res, () => {
        try {
            let stream = fs_1.default.createReadStream(path_1.default.join(__dirname, "../../storage/products/", pic));
            stream.pipe(res);
        }
        catch (e) {
            res.status(404).send();
        }
    });
});
exports.default = router;

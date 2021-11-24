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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const saltRounds = 14;
const jwt_key = process.env.jwt_Key;
const jwtAuthentication_1 = __importDefault(require("../middlewares/jwtAuthentication"));
// importing Models
const Seller_1 = __importDefault(require("../models/Seller"));
const Client_1 = __importDefault(require("../models/Client"));
// configuring multer
const multerStorage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: multerStorage,
});
// @type POST
// @route /auth/signup
// @desc  for signup admin or client
// @access PUBLIC
router.post("/signup", upload.any(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phone, mode } = req.body;
    if (!email || !password || !name || !mode) {
        res.status(401).json({ success: false, error: "Invalid Details" });
        return;
    }
    if (!(mode === 'admin' || mode === 'client')) {
        res.status(401).json({ success: false, error: "Invalid Details" });
        return;
    }
    let userMatch = (mode === 'admin') ?
        yield Seller_1.default.findOne({ email: email }) :
        yield Client_1.default.findOne({ email: email });
    if (userMatch) {
        res.status(401).send({
            success: false,
            error: "Email present!",
        });
    }
    else {
        const temp_password = bcryptjs_1.default.hashSync(password, saltRounds);
        let pic_name = `${name}_${Date.now()}.jpg`;
        let pic_present = false;
        if (req.files && (req.files.length > 0)) {
            fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../storage/userpics", pic_name), (req.files[0]).buffer);
            pic_present = true;
        }
        else
            pic_name = "avatar.jpg";
        const new_user = (mode === 'admin') ? new Seller_1.default({
            name: name,
            pic: pic_name,
            password: temp_password,
            email: email,
            phone: phone ? phone : ""
        }) : new Client_1.default({
            name: name,
            pic: pic_name,
            password: temp_password,
            email: email,
            phone: phone ? phone : ""
        });
        new_user.save((err, user) => __awaiter(void 0, void 0, void 0, function* () {
            user = (mode === 'admin') ? user : user;
            if (err) {
                console.log(err);
                if (pic_present) {
                    try {
                        fs_1.default.unlinkSync(path_1.default.join(__dirname, "../../storage/userpics", pic_name));
                    }
                    catch (e) { }
                }
                res.status(400).send({
                    success: false,
                    error: "Service Temporary Unavalable!",
                });
            }
            else {
                res.status(200).json({
                    success: true,
                });
            }
        }));
    }
}));
// @type POST
// @route /auth/signin
// @desc  for signin admin or client
// @access PUBLIC
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email, mode } = req.body;
    if (!email || !password || !mode) {
        res.status(401).json({ success: false, error: "Invalid Details" });
        return;
    }
    if (!(mode === 'admin' || mode === 'client')) {
        res.status(401).json({ success: false, error: "Invalid Details" });
        return;
    }
    let userMatch = (mode === 'admin') ?
        yield Seller_1.default.findOne({ email: email }) :
        yield Client_1.default.findOne({ email: email });
    if (userMatch) {
        let submittedPass = password;
        let savedPass = userMatch.password;
        const comparePassword = bcryptjs_1.default.compareSync(submittedPass, savedPass);
        if (comparePassword === true) {
            let timeInMinutes = 120;
            let expires = Math.floor(Date.now() / 1000) + 60 * timeInMinutes;
            let token = jsonwebtoken_1.default.sign({
                name: userMatch.name,
                _id: userMatch._id,
                exp: expires,
            }, jwt_key);
            res.status(200).send({
                success: true,
                data: {
                    _id: userMatch._id,
                    name: userMatch.name,
                    email: userMatch.email,
                    pic: userMatch.pic,
                    phone: userMatch.phone,
                    token: token,
                },
            });
        }
        else {
            res.status(401).send({
                success: false,
                error: "Invalid Password!",
            });
        }
    }
    else {
        res.status(401).send({
            success: false,
            error: "Invalid Credentials!",
        });
    }
}));
// @type POST
// @route /auth/editProfile
// @desc  for editing admin's or client's profile
// @access PRIVATE
router.post("/editProfile", upload.any(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, jwtAuthentication_1.default)(req, res, () => {
        console.log("Verified!");
        let { id, name, email, password, phone, mode } = req.body;
        if (!email || !password || !mode) {
            res.status(401).json({ success: false, error: "Invalid Details" });
            return;
        }
        if (!(mode === 'admin' || mode === 'client')) {
            res.status(401).json({ success: false, error: "Invalid Details" });
            return;
        }
        (mode === 'admin' ? Seller_1.default : Client_1.default).findById(id)
            .then((user) => __awaiter(void 0, void 0, void 0, function* () {
            user = (mode === 'admin') ? user : user;
            let oldPic = user.pic;
            let newPic = oldPic;
            if (req.files.length != 0) {
                newPic = `${user.name}_${Date.now()}.jpg`;
                fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../storage/userpics", newPic), req.files[0].buffer);
                user.pic = newPic;
            }
            if (name) {
                user.name = name;
            }
            if (email) {
                user.email = email;
            }
            if (phone) {
                user.phone = phone;
            }
            if (password) {
                const temp_password = bcryptjs_1.default.hashSync(password, saltRounds);
                user.password = temp_password;
            }
            user
                .save()
                .then(() => __awaiter(void 0, void 0, void 0, function* () {
                res.status(200).json({
                    success: true,
                    data: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        pic: user.pic,
                    },
                });
                if (oldPic !== newPic) {
                    if (oldPic !== "avatar.jpg") {
                        try {
                            fs_1.default.unlinkSync(path_1.default.join(__dirname, "../../storage/userpics", oldPic));
                        }
                        catch (E) {
                            console.log("ADMIN PROBLEM 4002:", oldPic);
                        }
                    }
                }
            }))
                .catch(() => {
                res.status(401).json({
                    success: false,
                    error: "SERVER PROBLEM!",
                });
            });
        }))
            .catch((err) => {
            console.log(err);
            res.status(401).json({
                success: false,
                error: "INVALID USER ID!",
            });
        });
    });
}));
// @type  POST
// @route /auth/deleteProfile
// @desc  for deleting seller's or client's profile
// @access PRIVATE
router.post("/deleteProfile", jwtAuthentication_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id, mode } = req.body;
    if (!mode) {
        res.status(401).json({ success: false, error: "Invalid Details" });
        return;
    }
    if (!(mode === 'admin' || mode === 'client')) {
        res.status(401).json({ success: false, error: "Invalid Details" });
        return;
    }
    (mode === 'admin' ? Seller_1.default : Client_1.default).findByIdAndDelete(id)
        .then((user) => __awaiter(void 0, void 0, void 0, function* () {
        user = (mode === 'admin' ? user : user);
        res.status(200).json({
            success: true,
        });
        try {
            if (user.pic !== "avatar.jpg")
                fs_1.default.unlinkSync(path_1.default.join(__dirname, "../../storage/userpics", user.pic));
        }
        catch (E) { }
    }))
        .catch((err) => {
        res.status(401).json({
            success: false,
            error: "SERVER PROBLEM!",
        });
    });
}));
// @type  GET
// @route /auth/accountPic
// @desc  for getting user's profile picture
// @access PUBLIC
router.get("/accountPic/:pic", (req, res) => {
    let pic = req.params.pic;
    try {
        let stream = fs_1.default.createReadStream(path_1.default.join(__dirname, "../../storage/userpics/", pic));
        stream.pipe(res);
    }
    catch (e) {
        res.status(404).send();
    }
});
exports.default = router;

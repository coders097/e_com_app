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
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const autoComplete_1 = __importDefault(require("./utils/autoComplete"));
// Load Environment Variables
dotenv_1.default.config({ path: "config.env" });
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
// Routes
const auth_1 = __importDefault(require("./routes/auth"));
app.use("/auth", auth_1.default);
const admin_1 = __importDefault(require("./routes/admin"));
app.use("/admin", admin_1.default);
// Test Route
app.get("/", (req, res) => {
    res.send("BADOL Maji");
});
// Models
const Product_1 = __importDefault(require("./models/Product"));
// MongoDB Connection
mongoose_1.default.connect(process.env.MONGO_URL);
const db = mongoose_1.default.connection;
db.on('error', () => console.log("connection error"));
db.once('open', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("We are connected!");
    let initialValuesForTrie = "";
    let products = yield Product_1.default.find();
    products.forEach(product => initialValuesForTrie += product.title + " ");
    autoComplete_1.default.init(app, initialValuesForTrie);
    autoComplete_1.default.addWordToTrie("zebra");
}));
let PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
app.listen(PORT, "localhost", () => {
    console.log("http://localhost:3001");
});

"use strict";
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
// MongoDB Connection
mongoose_1.default.connect(process.env.MONGO_URL);
const db = mongoose_1.default.connection;
db.on('error', () => console.log("connection error"));
db.once('open', () => {
    console.log("We are connected!");
});
let PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
app.listen(PORT, "localhost", () => {
    console.log("http://localhost:3001");
});

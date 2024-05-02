"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web_1 = require("./app/web");
const logging_1 = require("./app/logging");
const cors_1 = __importDefault(require("cors"));
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });
web_1.app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    // Izinkan metode HTTP yang diizinkan, termasuk OPTIONS untuk permintaan preflight
    next();
});
web_1.app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type']
}));
web_1.app.listen(3001, () => {
    logging_1.logger.info("App started on port 3000");
});

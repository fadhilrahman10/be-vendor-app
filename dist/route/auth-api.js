"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authApi = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user-controller");
const vendor_controller_1 = require("../controller/vendor-controller");
exports.authApi = express_1.default.Router();
// authApi.use(authMiddleware);
exports.authApi.get("/api/users/current", user_controller_1.UserController.getUser);
exports.authApi.delete("/api/users/current", user_controller_1.UserController.logout);
exports.authApi.post("/api/vendors", vendor_controller_1.VendorController.create);
exports.authApi.get("/api/vendors", vendor_controller_1.VendorController.filter);

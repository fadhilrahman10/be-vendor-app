"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const guest_api_1 = require("../route/guest-api");
const error_middleware_1 = require("../middleware/error-middleware");
const auth_api_1 = require("../route/auth-api");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(guest_api_1.guestApi);
exports.app.use(auth_api_1.authApi);
exports.app.use(error_middleware_1.errorMiddleware);

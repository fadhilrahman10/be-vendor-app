"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
class UserValidation {
}
exports.UserValidation = UserValidation;
UserValidation.CREATE = zod_1.z.object({
    email: zod_1.z.string().email().min(3).max(100),
    password: zod_1.z.string().min(3).max(100),
    name: zod_1.z.string().min(3).max(100)
});
UserValidation.LOGIN = zod_1.z.object({
    email: zod_1.z.string().email().min(3).max(100),
    password: zod_1.z.string().min(3).max(100),
});

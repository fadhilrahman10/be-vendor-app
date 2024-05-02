"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorValidation = void 0;
const zod_1 = require("zod");
class VendorValidation {
}
exports.VendorValidation = VendorValidation;
VendorValidation.CREATE = zod_1.z.object({
    name: zod_1.z.string().min(3).max(100),
    address: zod_1.z.string(),
    unit: zod_1.z.number()
});
VendorValidation.FILTER = zod_1.z.object({
    unit: zod_1.z.number().positive().optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toVendorResponse = void 0;
function toVendorResponse(vendor) {
    return {
        id: vendor.id,
        name: vendor.name,
        address: vendor.address,
        unit: vendor.unit,
    };
}
exports.toVendorResponse = toVendorResponse;

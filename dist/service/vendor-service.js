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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorService = void 0;
const vendor_model_1 = require("../model/vendor-model");
const validation_1 = require("../validation/validation");
const vendor_validation_1 = require("../validation/vendor-validation");
const uuid_1 = require("uuid");
const database_1 = require("../app/database");
class VendorService {
    static create(user, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const creteRequest = validation_1.Validation.validate(vendor_validation_1.VendorValidation.CREATE, req);
            const id = (0, uuid_1.v4)();
            const record = Object.assign(Object.assign({}, creteRequest), { id: id });
            const vendor = yield database_1.prismaClient.vendor.create({
                data: record,
            });
            return (0, vendor_model_1.toVendorResponse)(vendor);
        });
    }
    static filter(user, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const filterRequest = validation_1.Validation.validate(vendor_validation_1.VendorValidation.FILTER, req);
            const skip = (filterRequest.page - 1) * filterRequest.size;
            const vendors = yield database_1.prismaClient.vendor.findMany({
                where: {
                    unit: filterRequest.unit,
                }
            });
            const total = yield database_1.prismaClient.vendor.count({
                where: {
                    unit: filterRequest.unit,
                }
            });
            return {
                data: vendors.map(vendor => (0, vendor_model_1.toVendorResponse)(vendor)),
                paging: {
                    current_page: filterRequest.page,
                    total_page: Math.ceil(total / filterRequest.size),
                    size: filterRequest.size,
                }
            };
        });
    }
}
exports.VendorService = VendorService;

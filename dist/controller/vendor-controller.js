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
exports.VendorController = void 0;
const vendor_service_1 = require("../service/vendor-service");
const logging_1 = require("../app/logging");
class VendorController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield vendor_service_1.VendorService.create(req.user, request);
                res.status(200).json({
                    data: response
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static filter(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
                    unit: req.query.unit ? Number(req.query.unit) : 1,
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 10
                };
                const response = yield vendor_service_1.VendorService.filter(req.user, request);
                logging_1.logger.debug(response);
                res.status(200).json(response);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.VendorController = VendorController;

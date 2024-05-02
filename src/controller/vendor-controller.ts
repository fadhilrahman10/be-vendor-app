import {UserRequest} from "../type/user-request";
import {Response, NextFunction} from "express";
import {CreateVendorRequest, FilterVendorRequest} from "../model/vendor-model";
import {VendorService} from "../service/vendor-service";
import {logger} from "../app/logging";

export class VendorController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateVendorRequest = req.body as CreateVendorRequest;
            const response = await VendorService.create(req.user!, request);
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e);
        }
    }

    static async filter(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: FilterVendorRequest = {
                unit: req.query.unit ? Number(req.query.unit) : 1,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10
            };

            const response = await VendorService.filter(req.user!, request);
            logger.debug(response);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}
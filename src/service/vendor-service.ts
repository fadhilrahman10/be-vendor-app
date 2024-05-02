import {User, Vendor} from "@prisma/client";
import {CreateVendorRequest, FilterVendorRequest, toVendorResponse, VendorResponse} from "../model/vendor-model";
import {Validation} from "../validation/validation";
import {VendorValidation} from "../validation/vendor-validation";
import {v4 as uuid} from "uuid";
import {prismaClient} from "../app/database";
import {Pageable} from "../model/page";

export class VendorService {
    static async create(user: User, req: CreateVendorRequest): Promise<VendorResponse> {
        const creteRequest = Validation.validate(VendorValidation.CREATE, req);

        const id = uuid();
        const record = {
            ...creteRequest,
            ...{id: id}
        }

        const vendor = await prismaClient.vendor.create({
            data: record,
        });

        return toVendorResponse(vendor);
    }

    static async filter(user: User, req: FilterVendorRequest): Promise<Pageable<VendorResponse>> {
        const filterRequest = Validation.validate(VendorValidation.FILTER, req);
        const skip = (filterRequest.page - 1) * filterRequest.size;

        const vendors = await prismaClient.vendor.findMany({
            where: {
                unit: filterRequest.unit,
            }
        });

        const total = await prismaClient.vendor.count({
            where: {
                unit: filterRequest.unit,
            }
        });

        return {
            data: vendors.map(vendor => toVendorResponse(vendor)),
            paging: {
                current_page: filterRequest.page,
                total_page: Math.ceil(total / filterRequest.size),
                size: filterRequest.size,
            }
        }
    }
}
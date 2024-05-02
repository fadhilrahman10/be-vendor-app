import {Vendor} from "@prisma/client";

export type VendorResponse = {
    id: string,
    name: string,
    address: string,
    unit: number
}

export type CreateVendorRequest = {
    name: string,
    address: string,
    unit: number
}

export type FilterVendorRequest = {
    unit: number,
    page: number,
    size: number
}

export function toVendorResponse(vendor: Vendor) : VendorResponse {
    return {
        id: vendor.id,
        name: vendor.name,
        address: vendor.address,
        unit: vendor.unit,
    };
}
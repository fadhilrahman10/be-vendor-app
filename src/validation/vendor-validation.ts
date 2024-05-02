import {z, ZodType} from "zod";

export class VendorValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(3).max(100),
        address: z.string(),
        unit: z.number()
    });

    static readonly FILTER: ZodType = z.object({
        unit: z.number().positive().optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive()
    });
}
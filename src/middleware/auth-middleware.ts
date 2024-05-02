import {Response, NextFunction} from "express";
import {prismaClient} from "../app/database";
import {UserRequest} from "../type/user-request";
import {logger} from "../app/logging";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    // logger.info(req);
    const token = req.get("X-API-TOKEN");

    if (!token) {
        return res.status(401).json({
            errors: "Unauthorized"
        }).end();
    }

    const user = await prismaClient.user.findFirst({
        where: {
            token: token,
        }
    });

    if (!user) {
        return res.status(401).json({
            errors: "Unauthorized"
        }).end();
    }

    req.user = user;
    next();
    return;
}
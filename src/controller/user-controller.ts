import {Request, Response, NextFunction} from "express";
import {CreateUserRequest, LoginUserRequest} from "../model/user-model";
import {UserService} from "../service/user-service";
import {UserRequest} from "../type/user-request";
import {logger} from "../app/logging";

export class UserController {
    static async store(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateUserRequest = req.body as CreateUserRequest;
            const response = await UserService.createUser(request);

            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest;
            const response = await UserService.login(request);

            logger.debug(response);
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async getUser(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await UserService.get(req.user!);

            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-API-TOKEN");

            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e);
        }
    }

    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            await UserService.logout(req.user!);

            res.status(200).json({
                data: true
            });
        } catch (e) {
            next(e);
        }
    }
}
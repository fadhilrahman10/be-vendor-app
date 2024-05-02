import {CreateUserRequest, LoginUserRequest, toUserResponse, UserResponse} from "../model/user-model";
import {Validation} from "../validation/validation";
import {UserValidation} from "../validation/user-validation";
import {prismaClient} from "../app/database";
import {ResponseError} from "../error/response-error";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";
import {User} from "@prisma/client";

export class UserService {

    static async createUser(req: CreateUserRequest): Promise<UserResponse> {
        const createUserRequest = Validation.validate(UserValidation.CREATE, req);

        const userExists = await prismaClient.user.count({
            where: {
                email: req.email
            }
        });

        if (userExists > 0) {
            throw new ResponseError(400, "User already exists");
        }

        createUserRequest.password = await bcrypt.hash(createUserRequest.password, 10);

        const user = await prismaClient.user.create({
            data: createUserRequest
        });

        return toUserResponse(user);
    }

    static async login(req: LoginUserRequest): Promise<UserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, req);

        let user = await prismaClient.user.findUnique({
            where: {
                email: loginRequest.email
            }
        });

        if (!user) {
            throw new ResponseError(401, "Email or password is incorrect");
        }

        const isPasswordMatch = await bcrypt.compare(loginRequest.password, user.password);

        if (!isPasswordMatch) {
            throw new ResponseError(401, "Email or password is incorrect");
        }

        user = await prismaClient.user.update({
            where: {
                email: loginRequest.email
            },
            data: {
                token: uuid()
            }
        })

        const response = toUserResponse(user);
        response.token = user.token!;

        return response;
    }

    static async get(user: User): Promise<UserResponse> {
        return toUserResponse(user);
    }

    static async logout(user: User): Promise<UserResponse> {
        const result = await prismaClient.user.update({
            where: {
                email: user.email
            },
            data: {
                token: null,
            }
        });

        return toUserResponse(user);
    }
}
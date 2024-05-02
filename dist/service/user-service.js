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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("../model/user-model");
const validation_1 = require("../validation/validation");
const user_validation_1 = require("../validation/user-validation");
const database_1 = require("../app/database");
const response_error_1 = require("../error/response-error");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
class UserService {
    static createUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const createUserRequest = validation_1.Validation.validate(user_validation_1.UserValidation.CREATE, req);
            const userExists = yield database_1.prismaClient.user.count({
                where: {
                    email: req.email
                }
            });
            if (userExists > 0) {
                throw new response_error_1.ResponseError(400, "User already exists");
            }
            createUserRequest.password = yield bcrypt_1.default.hash(createUserRequest.password, 10);
            const user = yield database_1.prismaClient.user.create({
                data: createUserRequest
            });
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    static login(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginRequest = validation_1.Validation.validate(user_validation_1.UserValidation.LOGIN, req);
            let user = yield database_1.prismaClient.user.findUnique({
                where: {
                    email: loginRequest.email
                }
            });
            if (!user) {
                throw new response_error_1.ResponseError(401, "Email or password is incorrect");
            }
            const isPasswordMatch = yield bcrypt_1.default.compare(loginRequest.password, user.password);
            if (!isPasswordMatch) {
                throw new response_error_1.ResponseError(401, "Email or password is incorrect");
            }
            user = yield database_1.prismaClient.user.update({
                where: {
                    email: loginRequest.email
                },
                data: {
                    token: (0, uuid_1.v4)()
                }
            });
            const response = (0, user_model_1.toUserResponse)(user);
            response.token = user.token;
            return response;
        });
    }
    static get(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    static logout(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.prismaClient.user.update({
                where: {
                    email: user.email
                },
                data: {
                    token: null,
                }
            });
            return (0, user_model_1.toUserResponse)(user);
        });
    }
}
exports.UserService = UserService;

import express from "express";
import {authMiddleware} from "../middleware/auth-middleware";
import {UserController} from "../controller/user-controller";
import {VendorController} from "../controller/vendor-controller";

export const authApi = express.Router();
// authApi.use(authMiddleware);

authApi.get("/api/users/current", UserController.getUser);
authApi.delete("/api/users/current", UserController.logout);

authApi.post("/api/vendors", VendorController.create);
authApi.get("/api/vendors", VendorController.filter);
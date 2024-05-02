import express from "express";
import {UserController} from "../controller/user-controller";

export const guestApi = express.Router();
guestApi.post("/api/users", UserController.store);
guestApi.post("/api/users/login", UserController.login);
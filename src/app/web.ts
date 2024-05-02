import express, {Request, Response, NextFunction} from 'express';
import {guestApi} from "../route/guest-api";
import {errorMiddleware} from "../middleware/error-middleware";
import {authApi} from "../route/auth-api";
import cors from "cors";

export const app = express();
app.use(express.json());
app.use(guestApi);
app.use(authApi);
app.use(errorMiddleware);
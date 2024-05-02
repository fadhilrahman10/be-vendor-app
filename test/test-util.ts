import {prismaClient} from "../src/app/database";
import bcrypt from "bcrypt";
import {User} from "@prisma/client";
import {v4 as uuid} from "uuid";

export class UserTest {
    static async delete() {
        await prismaClient.user.deleteMany({
            where: {
                email: "test@gmail.com"
            }
        });
    }

    static async store() {
        await prismaClient.user.create({
            data: {
                email: "test@gmail.com",
                password: await bcrypt.hash("test", 10),
                name: "test",
                token: "test"
            }
        })
    }

    static async get(): Promise<User> {
        const user =  await prismaClient.user.findFirst({
            where: {
                email: 'test@gmail.com',
            }
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }
}

export class VendorTest {
    static async deleteAll() {
        await prismaClient.vendor.deleteMany({
            where: {
                name: "test"
            }
        })
    }

    static async create() {
        await prismaClient.vendor.create({
            data: {
                id: uuid(),
                name: "test",
                address: "test",
                unit: 1
            }
        });
    }
}
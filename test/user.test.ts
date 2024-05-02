import supertest from "supertest";
import {app} from "../src/app/web";
import {logger} from "../src/app/logging";
import {UserTest} from "./test-util";

describe('POST /api/users', () => {

    afterEach(async () => {
        await UserTest.delete();
    })

    it('should be validation error request', async () => {
        const response = await supertest(app)
            .post('/api/users')
            .send({
                email: "",
                password: "",
                name: ""
            });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should create new user', async () => {
        const response = await supertest(app)
            .post('/api/users')
            .send({
                email: "test@gmail.com",
                password: "123456",
                name: "Test User"
            })

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.email).toEqual("test@gmail.com");
        expect(response.body.data.name).toEqual("Test User");
    })
});

describe('POST /api/users/login', () => {
    beforeEach(async () => {
        await UserTest.store();
    })

    afterEach(async () => {
        await UserTest.delete();
    })

    it('should be success to login', async () => {
        const response = await supertest(app)
            .post('/api/users/login')
            .send({
                email: "test@gmail.com",
                password: "test",
            })

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.email).toEqual("test@gmail.com");
        expect(response.body.data.name).toEqual("test");
        expect(response.body.data.token).toBeDefined();
    })

    it('should error if email is incorrect', async () => {
        const response = await supertest(app)
            .post('/api/users/login')
            .send({
                email: "test23@gmail.com",
                password: "test",
            })

        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });

    it('should error if password is incorrect', async () => {
        const response = await supertest(app)
            .post('/api/users/login')
            .send({
                email: "test@gmail.com",
                password: "test123",
            })

        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
});

describe('GET /api/users/current', () => {
    beforeEach(async () => {
        await UserTest.store();
    })

    afterEach(async () => {
        await UserTest.delete();
    })

    it('should be success to get user', async () => {
        const response = await supertest(app)
            .get('/api/users/current')
            .set('X-API-TOKEN', 'test');

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.email).toEqual("test@gmail.com");
        expect(response.body.data.name).toEqual("test");
    })

    it('should be error if token is invalid', async () => {
        const response = await supertest(app)
            .get('/api/users/current')
            .set('X-API-TOKEN', 'kacau');

        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    })
});

describe('DELETE /api/users/current', () => {
    beforeEach(async () => {
        await UserTest.store();
    })

    afterEach(async () => {
        await UserTest.delete();
    })

    it('should be success to logout', async () => {
        const response = await supertest(app)
            .delete('/api/users/current')
            .set('X-API-TOKEN', 'test');

        logger.debug(response.body);

        expect(response.status).toBe(200);
        expect(response.body.data).toBe(true);

        const user = await UserTest.get();
        expect(user.token).toBeNull();
    });
});
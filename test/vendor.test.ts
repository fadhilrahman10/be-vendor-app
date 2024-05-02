import {UserTest, VendorTest} from "./test-util";
import supertest from "supertest";
import {app} from "../src/app/web";
import {logger} from "../src/app/logging";

describe('POST /api/vendors', () => {
    beforeEach(async () => {
        await UserTest.store();
    })

    afterEach(async () => {
        await VendorTest.deleteAll();
        await UserTest.delete();
    })

    it('should create new vendor', async () => {
        const response = await supertest(app)
            .post('/api/vendors')
            .set('X-API-TOKEN', 'test')
            .send({
                name: 'test',
                address: 'test',
                unit: 1
            })

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.name).toBe('test');
        expect(response.body.data.address).toBe('test');
        expect(response.body.data.unit).toBe(1);
    });
});

describe('GET /api/vendors', () => {
    beforeEach(async () => {
        await UserTest.store();
        await VendorTest.create();
    });

    afterEach(async () => {
        await VendorTest.deleteAll();
        await UserTest.delete();
    });

    it('should get all vendors', async () => {
        const response = await supertest(app)
            .get("/api/vendors")
            .set('X-API-TOKEN', 'test');

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    })
});
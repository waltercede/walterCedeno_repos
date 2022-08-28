import { describe, expect, test } from '@jest/globals';
import ServerWalterCedeno from '../src/Middleware/server-walter-cedeno';
import request from "supertest";
const serverWalterCedeno = new ServerWalterCedeno();

describe('Test de los CRUD de organization', () => {
    test('Peticion al metodo post Organization', async () => {
        const response = await request(serverWalterCedeno.app).post('/organization').send();
        expect(response.statusCode).toBe(200)
    });
});
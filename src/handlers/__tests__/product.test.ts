import request from 'supertest';
import server from '../../server'; // Asegúrate de importar correctamente tu servidor Express



describe('DELETE /api/products/:id', () => {

    it('should delete a product', async () => {
        const response = await request(server).delete('/api/products/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    });
    it('should return an error if the product does not exist', async () => {
        const response = await request(server).delete('/api/products/999');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    });
});

describe ('PATCH /api/products/:id', () => {    
    it('should update the availability of a product', async () => {
        const response = await request(server).patch('/api/products/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    });
    it('should return an error if the product does not exist', async () => {
        const response = await request(server).patch('/api/products/999');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    });
}
);

describe('PUT /api/products/:id', () => {
    it('should update a product', async () => {
        const response = await request(server)
            .put('/api/products/1')
            .send({
                name: 'Producto actualizado',
                price: 20,
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    });
    it('should return an error if the product does not exist', async () => {
        const response = await request(server)
            .put('/api/products/78888')
            .send({
                name: 'Producto actualizado',
                price: 20,
            });
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body).not.toHaveProperty('data');
        expect(response.body.error).toBe('Producto no encontrado');
    });
});     


describe('POST /api/products', () => {
    it('should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(4);
    });
    it('should create a new product', async () => {
        const response = await request(server) // Utiliza request de supertest para realizar la solicitud
            .post('/api/products')
            .send({
                name: 'Producto de prueba',
                price: 10,
            });
        expect(response.status).toBe(200); // Comprueba que el estado de la respuesta sea 200
        expect(response.body).toHaveProperty('data'); // Comprueba que la respuesta tenga una propiedad 'data'

    });
});

describe('GET /api/products', () => {
    it('should return a list of products', async () => {
        const response = await request(server).get('/api/products');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body).not.toHaveProperty('errors');
        expect(response.body.data).toHaveLength(1);
        expect(response.error).toBe(500);

    
    });
});

describe('GET /api/products/:id', () => {
    it('should return a single product', async () => {
        const response = await request(server).get('/api/products/2');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body).not.toHaveProperty('errors');
    });
    it('should return an error if the product does not exist', async () => {
        const response = await request(server).get('/api/products/999');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body).not.toHaveProperty('data');
    });
});
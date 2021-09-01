import { Client } from 'pg';
import config from '../connection/config';

export default async function addProductService(product) {
    const { title, description, price, count, image } = product;
    const client = new Client(config);
    try {
        await client.connect();
        await client.query('BEGIN');
        const productQuery = 'INSERT INTO products(title, description, price, image) VALUES ($1, $2, $3, $4) RETURNING id';
        const productRes = await client.query(productQuery, [title, description, price, image]);
        const productId = productRes.rows[0].id;
        const stockQuery = 'INSERT INTO stocks(product_id, count) VALUES ($1, $2)';
        await client.query(stockQuery, [productId, count]);
        await client.query('COMMIT');
        return {
            id: productId,
            title,
            description,
            price,
            count,
            image
        };
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.end();
    }
}

import { Client } from 'pg';
import config from "../connection/config";

export default async function getProductsService() {
    const client = new Client(config);
    try {
        await client.connect();
        const query = 'SELECT id, title, image, price, description, count FROM products INNER JOIN stocks ON product_id = id';
        const { rows } = await client.query(query);
        return rows;
    } finally {
        await client.end()
    }
};

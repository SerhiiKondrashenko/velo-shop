import { Client } from 'pg';
import config from "../connection/config";
import checkUUID from "../utils/checkUUID";
import {INCORRECT_PRODUCT_ID, PRODUCT_NOT_FOUND} from "../utils/errorMessages";

export default async function getProductByIdService(productId) {
    const client = new Client(config);
    try {
        if (checkUUID(productId) === null) {
            throw new Error(INCORRECT_PRODUCT_ID);
        }
        await client.connect();
        const { rows } = await client.query(`
            SELECT 
                id, title, image, price, description, count
            FROM 
                products 
            INNER JOIN 
                stocks ON product_id = id 
            WHERE id = $1
        `, [productId]);
        if (rows.length === 0) {
            throw new Error(PRODUCT_NOT_FOUND);
        }
        return rows.pop();
    } finally {
        await client.end()
    }
}

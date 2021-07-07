import getProducts from "./getProducts";

it('should returns correct response with list of products', async () => {
    const response = await getProducts();
    expect(response.statusCode).toBe(200);
    const products = JSON.parse(response.body);
    expect(products).toBeInstanceOf(Array);
    expect(products.length).toBeGreaterThan(0);
});

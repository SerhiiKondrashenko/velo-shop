import getProductsService from "../services/getProductsService";
import getProducts from "./getProducts";

jest.mock('../services/getProductsService');

getProductsService.mockImplementation(async () => {
    return [
        {
            id: 'giant-contend-3-2021',
            title: 'Giant Contend 3 2021',
            descriptions: 'Smooth, fast, and fun. This versatile aluminum road bike has been revamped to give it a well-rounded performance ride quality. It’s the perfect choice to help you push the pace, ride more miles, and expand your road riding experience.',
            price: 774,
            count: 3,
            image: 'https://www.sefiles.net/images/library/large/giant-contend-3-381485-1.jpg'
        }
    ]
})

it('should returns correct response with list of products', async () => {
    const response = await getProducts();
    expect(response.statusCode).toBe(200);
    const products = JSON.parse(response.body);
    expect(products).toBeInstanceOf(Array);
    expect(products.length).toBeGreaterThan(0);
});

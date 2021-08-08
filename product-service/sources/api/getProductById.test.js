import getProductByIdService from "../services/getProductByIdService";
import getProductById from "./getProductById";

jest.mock('../services/getProductByIdService');

getProductByIdService.mockImplementation((productId) => {
    if (productId === 'giant-contend-3-2021') {
        return {
            id: 'giant-contend-3-2021',
            title: 'Giant Contend 3 2021',
            descriptions: 'Smooth, fast, and fun. This versatile aluminum road bike has been revamped to give it a well-rounded performance ride quality. It’s the perfect choice to help you push the pace, ride more miles, and expand your road riding experience.',
            price: 774,
            count: 3,
            image: 'https://www.sefiles.net/images/library/large/giant-contend-3-381485-1.jpg'
        }
    }

    throw new Error('Product was not found!');
});

it('should return correct response', async () => {

    const response = await getProductById({
        pathParameters: {
            productId: 'giant-contend-3-2021'
        }
    });

    expect(response.statusCode).toBe(200);
    const product = JSON.parse(response.body);
    expect(product).toMatchObject({
        id: 'giant-contend-3-2021',
        title: 'Giant Contend 3 2021',
        descriptions: 'Smooth, fast, and fun. This versatile aluminum road bike has been revamped to give it a well-rounded performance ride quality. It’s the perfect choice to help you push the pace, ride more miles, and expand your road riding experience.',
        price: 774,
        count: 3,
        image: 'https://www.sefiles.net/images/library/large/giant-contend-3-381485-1.jpg'
    });
});

it('should return product not found response', async () => {
    const response = await getProductById({
        pathParameters: {
            productId: 'some-fancy-not-existing-product-id'
        }
    });

    expect(response.statusCode).toBe(404);
    const content = JSON.parse(response.body);
    expect(content.message).toBe('Product was not found!')
});


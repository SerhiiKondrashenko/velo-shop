import addProductService from "../services/addProductService";
import AWSMock from 'aws-sdk-mock';
import catalogBatchProcess from "./catalogBatchProcess";

jest.mock('../services/addProductService');

const SNSPublishMockFunc = (params, cb) => {
    cb(null, { status: 'Message successfully sent'});
};

beforeEach(() => {
    AWSMock.mock('SNS', 'publish', SNSPublishMockFunc);
});

afterEach(() => {
    AWSMock.restore('SNS');
})

it('should add products to database', async () => {

    addProductService.mockImplementation((product) => {
        expect(product).toMatchObject({
            title: 'Giant Contend 3 2021',
            descriptions: 'Smooth, fast, and fun. This versatile aluminum road bike has been revamped to give it a well-rounded performance ride quality. It’s the perfect choice to help you push the pace, ride more miles, and expand your road riding experience.',
            price: 774,
            count: 3,
            image: 'https://www.sefiles.net/images/library/large/giant-contend-3-381485-1.jpg'
        });
        return product;
    })

    const event = {
        Records: [
            { body: `{"title": "Giant Contend 3 2021","descriptions": "Smooth, fast, and fun. This versatile aluminum road bike has been revamped to give it a well-rounded performance ride quality. It’s the perfect choice to help you push the pace, ride more miles, and expand your road riding experience.","price": 774,"count": 3,"image": "https://www.sefiles.net/images/library/large/giant-contend-3-381485-1.jpg"}`},
            { body: `{"title": "Giant Contend 3 2021","descriptions": "Smooth, fast, and fun. This versatile aluminum road bike has been revamped to give it a well-rounded performance ride quality. It’s the perfect choice to help you push the pace, ride more miles, and expand your road riding experience.","price": 774,"count": 3,"image": "https://www.sefiles.net/images/library/large/giant-contend-3-381485-1.jpg"}`},
            { body: `{"title": "Giant Contend 3 2021","descriptions": "Smooth, fast, and fun. This versatile aluminum road bike has been revamped to give it a well-rounded performance ride quality. It’s the perfect choice to help you push the pace, ride more miles, and expand your road riding experience.","price": 774,"count": 3,"image": "https://www.sefiles.net/images/library/large/giant-contend-3-381485-1.jpg"}`},
            { body: `{"title": "Giant Contend 3 2021","descriptions": "Smooth, fast, and fun. This versatile aluminum road bike has been revamped to give it a well-rounded performance ride quality. It’s the perfect choice to help you push the pace, ride more miles, and expand your road riding experience.","price": 774,"count": 3,"image": "https://www.sefiles.net/images/library/large/giant-contend-3-381485-1.jpg"}`},
            { body: `{"title": "Giant Contend 3 2021","descriptions": "Smooth, fast, and fun. This versatile aluminum road bike has been revamped to give it a well-rounded performance ride quality. It’s the perfect choice to help you push the pace, ride more miles, and expand your road riding experience.","price": 774,"count": 3,"image": "https://www.sefiles.net/images/library/large/giant-contend-3-381485-1.jpg"}`},
        ]
    }

    await catalogBatchProcess(event);

    expect(addProductService.mock.calls.length).toBe(5);

    addProductService.mockImplementation((product) => product);
});

it('should publish notification', async () => {
    const mock = jest.fn((params, cb) => {
        const {Subject, Message, MessageAttributes} = params;
        const title = MessageAttributes.title.StringValue;
        expect(Subject).toBe('Product successfully added to database');
        expect(Message).toBe(`Product ${title} were added to database`);
        cb(null, {status: 'Message successfully sent'});
    });

    AWSMock.remock('SNS', 'publish', mock);

    const event = {
        Records: [
            { body: `{"title": "Giant Contend 3 2021","descriptions": "Smooth, fast, and fun. This versatile aluminum road bike has been revamped to give it a well-rounded performance ride quality. It’s the perfect choice to help you push the pace, ride more miles, and expand your road riding experience.","price": 774,"count": 3,"image": "https://www.sefiles.net/images/library/large/giant-contend-3-381485-1.jpg"}`},
            { body: `{"title": "Giant Contend 3 2021","descriptions": "Smooth, fast, and fun. This versatile aluminum road bike has been revamped to give it a well-rounded performance ride quality. It’s the perfect choice to help you push the pace, ride more miles, and expand your road riding experience.","price": 774,"count": 3,"image": "https://www.sefiles.net/images/library/large/giant-contend-3-381485-1.jpg"}`},
            { body: `{"title": "Giant Contend 3 2021","descriptions": "Smooth, fast, and fun. This versatile aluminum road bike has been revamped to give it a well-rounded performance ride quality. It’s the perfect choice to help you push the pace, ride more miles, and expand your road riding experience.","price": 774,"count": 3,"image": "https://www.sefiles.net/images/library/large/giant-contend-3-381485-1.jpg"}`},
            { body: `{"title": "Giant Contend 3 2021","descriptions": "Smooth, fast, and fun. This versatile aluminum road bike has been revamped to give it a well-rounded performance ride quality. It’s the perfect choice to help you push the pace, ride more miles, and expand your road riding experience.","price": 774,"count": 3,"image": "https://www.sefiles.net/images/library/large/giant-contend-3-381485-1.jpg"}`},
            { body: `{"title": "Giant Contend 3 2021","descriptions": "Smooth, fast, and fun. This versatile aluminum road bike has been revamped to give it a well-rounded performance ride quality. It’s the perfect choice to help you push the pace, ride more miles, and expand your road riding experience.","price": 774,"count": 3,"image": "https://www.sefiles.net/images/library/large/giant-contend-3-381485-1.jpg"}`},
        ]
    }
    await catalogBatchProcess(event);
    expect(mock.mock.calls.length).toBe(5);
});

import products from "./products";


export default async function getProductByIdService(productId) {
    const product = products.find(({id}) => id === productId);
    if (product === undefined) {
        throw new Error('Product was not found!');
    }
    return product;
}

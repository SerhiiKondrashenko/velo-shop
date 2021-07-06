import products from "./products.json";


export default function getProductByIdService(productId) {
    const product = products.find(({id}) => id === productId);
    if (product === undefined) {
        throw new Error("Product was not found!")
    }
    return products[product];
}

import * as Validator from 'validatorjs';

export default function validateProduct(product) {
    const validation = new Validator(product, {
        title: 'required|min:4',
        description: 'present',
        price: 'required|numeric',
        count: 'required|integer',
        image: 'present'
    });
    validation.check();
    return validation.errors.all();
}

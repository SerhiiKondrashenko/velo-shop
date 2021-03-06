# NodeJS For AWS course Backend part

## Task 3

OpenAPI description is available on
[Swagger](https://app.swaggerhub.com/apis/SerhiiKondrashenko/VeloSop/1.0.0)


Front-end part of application is available [here](https://d2m5ioz6hxitxt.cloudfront.net/)

Front-end repository for task 3 is available [here](https://github.com/SerhiiKondrashenko/shop-react-redux-cloudfront/tree/task3)

Task 3 front-end changes is available [here](https://github.com/SerhiiKondrashenko/shop-react-redux-cloudfront/pull/2)

What was done:
 - Main part:
    - added serverless configuration for two lambda functions
    - lambda functions getProductsList and getProducts returns correct response
    - front-end application integrated with product service and available [here](https://d2m5ioz6hxitxt.cloudfront.net/)
 - Additional part:
    - lambda handlers described as async functions
    - es6 modules are user for implementation
    - webpack configured for product-service
    - Swagger documentation created and available [here](https://app.swaggerhub.com/apis/SerhiiKondrashenko/VeloSop/1.0.0)
    - lambda handlers covered by UNIT tests
    - lambda handlers written in different module files
    - product not found error covered by API using try catch

If you have any suggestions please contact me in Teams or leave comment in Pull request :)

### Api Methods:
1. List of Products:

```
GET https://qsnju9olj2.execute-api.eu-west-1.amazonaws.com/shop/products
```

2. Retrieve Product:

```
GET https://qsnju9olj2.execute-api.eu-west-1.amazonaws.com/shop/products/{Product ID}
Example: https://qsnju9olj2.execute-api.eu-west-1.amazonaws.com/shop/products/giant-contend-3-2021
```


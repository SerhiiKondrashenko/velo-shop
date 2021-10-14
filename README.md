# NodeJS For AWS course Backend part

## Task 8
### 8.1 Added dockerfile https://github.com/SerhiiKondrashenko/rs-cart-api/tree/task8
### 8.2 Deployed app to elastic beanstalk and integrated front-end app with beanstalk


## Task 7
### 7.1 Added authorization-service
### 7.2 Integrated authorization with import service
### 7.3 Added frontend logic to send authorization token during uploading file with products

### Optional task:
   1. Added alert handlers for 401 and 403 statuses

## Task 6 

### 6.1 Created catalogBatchProcess in the resources section in serverless.yml
### 6.2 Added SQS queue called catalogItemsQueue in serverless.yml and updated importFileParser to send each
CSV record into SQS
### 6.3 Added SNS notification when catalogBatchProcess creates product

### Optional task:
   1. Added test coverage for catalogBatchProcess
   2. Added additional subscription for createdProduct topic and added title filtering for another email

## Task 5

### 5.1 Added import service function available on /import path and returns Signed URL
   Link: https://w6hdhq9c2f.execute-api.us-east-1.amazonaws.com/shop/import?name=importedFile 

### 5.2 Added importFileParser lambda which is triggered on file uploading and parsing cvs file
### Optional task:
   1. async/await is used in lambda functions
   2. importProductsFile is covered by unit test
   3. parsed files moved to parsed folder


## Task 4

### 4.1 Created database instance and filled it with data
### 4.2 Implemented mocked products and product api with real one:
   Links:
   GET - https://0fxzvnjz7e.execute-api.us-east-1.amazonaws.com/shop/products
   GET - https://0fxzvnjz7e.execute-api.us-east-1.amazonaws.com/shop/products/{productId}
### 4.3 Created api for product creation 
   Link:
   POST - https://0fxzvnjz7e.execute-api.us-east-1.amazonaws.com/shop/products

### 4.4 Integrated Front-End part (https://d2m5ioz6hxitxt.cloudfront.net/)

### Optional Tasks:
   1. if product data is invalid service returns 400 status code
   2. all lambdas return 500 status code on server fault
   3. all lambdas do console.log arguments on each request 
   4. service methods are using transactions

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


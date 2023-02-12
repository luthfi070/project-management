**Description**

This is a Back End for Project Management application, created using Node JS and MongoDB, this project has a few feature to use, such as Project Creation, and Task as a sub part of Project. User can also create account to keep Project private to each account.

https://project-management-production-80e6.up.railway.app/

**API Description**

This API is created using Node JS and MongoDB, you can view the Postman Collection here ( https://elements.getpostman.com/redirect?entityId=6730993-1c784661-2903-4a69-b6e8-349a283581f3&entityType=collection ) to run it easily. This API has 3 main Routes ( User, Project, Task ) which then be used into different subroutes and method with different functionality.

**Endpoint**

This API has a few Endpoint divided from 3 main routes, every endpoint has a different functionality, there are total 16 endpoint that can be used in this API, 14 of them need custom token that will be given after users login to the application, which then will be included using Authorization Headers as a Bearer Token, this step is needed in terms of security

**Authentication**

Authentication is done in all endpoint, except register, the authentication will start in Login endpoint when the API is matching the inputted Email and Password with the one in the database, if it matched and valid, it will gave the token in form of json web token which then will be included in every endpoint as a Authorization Headers.

Every token that has been included in headers, will go first to the verifyToken middleware ( located in helper->authHelper->verifyToken ), to be signed by using secret key used and verified in every endpoint to make sure only authorized and verified users can use every endpoint available, if the token is valid, it will continue the process.

**Authorization**

To make sure every user can only access, view, and modify their own data, every select and update queries has one more filter to make sure the data given is their own data, not other users data. 

For example if we need to delete a Project by Project Id, it will also add one more requirement which is the user_id field available is required to match the logged in user id which has been acquired by using the Authentication Middleware.

**Error Handling**

Error handling is done through a middleware, to help customize the error given by the API if an error occurs, the middleware is located in helper->errorHelper, the middleware will be triggered by throwing the error or when the code breaks and goes into the catch statement.

**Security**

The security and sanitazion is done through npm packages by using express-validator, every endpoint that requires a JSON request will go through a checking using this package, the checking is customizeable based on the purpose, for example on Email field, it will do a checking isEmail to check if that is a valid email.

**Documentation**

You can view the detailed documentation about the endpoint on endpoint_documentation.md, or you can also view the postman version in this link https://documenter.getpostman.com/view/6730993/2s935uGLgS

**Deployment**

The deployment is done through railway.app and the code is distributed through Github, railway will link my repository with the projects i have created on railway, every push done to the main branch will trigger a redeploy to make sure the production server is updated and valid.



    

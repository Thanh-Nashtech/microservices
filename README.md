# MICROSERVICE EXAMPLE PROJECT
## OVERVIEW
The project is a simple management system, the logic and business of the project is very basic so that we can focus on the technical implementation includes.  
The project includes some services below: 
- Category service: this service provides features such as category CURD APIs (create, update, read, and delete). 
- Product service: allow the application to interact with products management, provides CURD APIs to the application. 
- User service: allow to manage user of the system such as CRUD, grant permissions. 
- Auth service: play a role as a middleware to verify the user 
- API Gateway service: this service is a middle service which plays a role to interact directly with clients and then send request to each micro service inside. 
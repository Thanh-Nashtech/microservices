# MICROSERVICE EXAMPLE PROJECT
## OVERVIEW
The project is a simple management system, the logic and business of the project is very basic so that we can focus on the technical implementation includes.  
The project includes some services below: 
- Category service: this service provides features such as category CURD APIs (create, update, read, and delete). 
- Product service: allow the application to interact with products management, provides CURD APIs to the application. 
- User service: allow to manage user of the system such as CRUD, grant permissions. 
- Auth service: play a role as a middleware to verify the user 
- API Gateway service: this service is a middle service which plays a role to interact directly with clients and then send request to each micro service inside.  
![alt text](https://github.com/Thanh-Nashtech/microservices/blob/main/ORM.png)

## AUTHENTICATION
![alt text](https://github.com/Thanh-Nashtech/microservices/blob/main/authentication-flow.png)  
When clients send requests to the application, the first destination is the gateway. Here, the gateway will check the request headers authorization. In this application, JWT token is using, the token will be sent to the auth service. Here, if the auth service successfully verifies the token, it can get the information about user id, user name, roles and permissions then it sends the results back to the gateway. If the gateway receives the information of the user, it means the user has been authorized successfully, then the gateway will check the permissions to decide whether the requests are continually sent to other inside micro services. Otherwise, if the auth service cannot verify the user or the permissions cannot be passed, it sends 401 or 403 statuses to the gateway, then the gateway sends errors to clients. 
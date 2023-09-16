# API DOCUMENTATION

1. [Setup](#setup-soschat-express-api)
2. [Entity](#entity)
3. [Request](#request)

## Setup Soschat Express API
1. Clone this repository into your local pc
2. After you clone, open the folder
3. Run ```npm install``` command in your terminal
4. Make sure you use git bash already
5. Make a database called ```soschat``` in MySQL
6. Configure ```.env``` file
7. Run ```chmod +x cmd/migrate.sh``` in your terminal
8. Run ```cmd/migrate.sh``` in your terminal to migrate all models 
9. Make sure you have typescript compiler installed already
10. Run ```npm run dev``` to run development express server

## DON'T FORGET
This api use api key interceptor, make sure when sending request to this api, you already include api key in the header request.
This api also use validator for request body, the response message is clear enough to not be documented in here.

## Entity
1. User
    Attributes: fullname, username, password, followers, following
2. Post
    Attributes: title, description, image, comments, liked
3. Comment
    Attributes: content
For more details, looks up [models](../src/db/models/) directory

## Request
1. [Auth](#auth)
2. [User](#user)
3. [Follow](#follow)
4. [Post](#post)

### Auth
1. ##### Register User
    endpoint : ```/api/auth/register```   
    method : ```POST```    
    json request body : 
    ```
    {
        "fullname": "Devan F",
        "username": "dvnnnfr",
        "password": "dvpassbcc123",
        "email": "dnv10@gmail.com"
    }
    ```
    json response : 
    ```
    {
        "status": 201,
        "message": "user registered"
    }
    ```

2. ##### Login User
    endpoint : ```/api/auth/login```         
    method : ```POST```       
    json request body : 
    ```
    {
        "username": "dvnnnfr",
        "password": "dvpassbcc123"
    }
    ```
    json response : 
    ```
    {
        "status": 200,
        "message": "user successfully login"
    }
    ```

3. ##### Logout User
    endpoint : ```/api/auth/logout```     
    method : ```POST```      
    json response : 
    ```
    {
        "status": 200,
        "message": "user successfully logout"
    }
    ```

### User
1. ##### Get All Users 
    endpoint : ```/api/users```    
    method : ```GET```    
    json response : 
    ```
    {
        "status": 200,
        "message": "successfully fetch users",
        "data": [
            {
                "id": "25283d54-206e-46d5-83bf-416580219d3e",
                "fullname": "Devan F",
                "username": "dvnnnfr",
                "email": "dnv10@gmail.com",
                "following": 0,
                "followers": 0,
                "createdAt": "2023-09-16T13:23:21.000Z",
                "updatedAt": "2023-09-16T13:23:21.000Z"
            },
            {
                "id": "bce601de-0ceb-42b7-8abc-eef2590d3020",
                "fullname": "Ananta",
                "username": "nanta10",
                "email": "risky@gmail.com",
                "following": 0,
                "followers": 0,
                "createdAt": "2023-09-16T10:07:04.000Z",
                "updatedAt": "2023-09-16T13:03:40.000Z"
            }
        ]
    }
    ```

2. ##### Get User by Username
    endpoint : ```/api/users/{username}```     
    method : ```GET```     
    json response : 
    ```
    {
        "status": 200,
        "message": "successfully fetch user",
        "data": {
            "id": "7bb0869a-ff6e-4018-b2c0-5661c3d50a26",
            "fullname": "Devan",
            "username": "dvnf20",
            "email": "dvn@gmail.com",
            "following": 0,
            "followers": 0,
            "createdAt": "2023-09-13T03:09:57.000Z",
            "updatedAt": "2023-09-16T13:03:40.000Z",
            "user_posts": [
                {
                    "id": "ef1b3795-2121-4602-95e4-3f43cba79e8f",
                    "userId": "7bb0869a-ff6e-4018-b2c0-5661c3d50a26",
                    "title": "aku",
                    "desc": "acaa",
                    "image": null,
                    "liked": 0,
                    "comments": 0,
                    "createdAt": "2023-09-13T03:32:12.000Z",
                    "updatedAt": "2023-09-13T03:32:12.000Z"
                }
            ]
        }
    }
    ```

3. ##### Search User
    endpoint : ```/api/users/search/{search}```      
    method : ```GET```      
    json response :
    ```
    {
        "status": 200,
        "message": "successfully fetch user",
        "data": [
            {
                "id": "25283d54-206e-46d5-83bf-416580219d3e",
                "fullname": "Devan F",
                "username": "dvnnnfr",
                "email": "dnv10@gmail.com",
                "following": 0,
                "followers": 0,
                "createdAt": "2023-09-16T13:23:21.000Z",
                "updatedAt": "2023-09-16T13:23:21.000Z"
            },
            {
                "id": "7bb0869a-ff6e-4018-b2c0-5661c3d50a26",
                "fullname": "Devan",
                "username": "dvnf20",
                "email": "dvn@gmail.com",
                "following": 0,
                "followers": 0,
                "createdAt": "2023-09-13T03:09:57.000Z",
                "updatedAt": "2023-09-16T13:03:40.000Z"
            }
        ]
    }
    ```
4. ##### Update User
    endpoint : ```/api/users```        
    method : ```PATCH```      
    json request body :     
    NOTE: not all required     
    ```
    {
        "fullname": "Rivaldo",
        "username": "aldo",
        "password": "inialdo10",
        "email": "aldo@gmail.com"
    }
    ```
    json response : 
    ```
    {
        "status": 200,
        "message": "successfully update user data"
    }
    ```
    
5. ##### Delete User   
    endpoint : ```/api/users```      
    method : ```DELETE```   
    json response :
    ```
    {
        "status": 200,
        "message": "successfully delete user data"
    }
    ```

### Follow
1. ##### Follow Other User
    endpoint : ```/api/follow/{followId}```     
    method : ```POST```     
    json response :
    ```
    {
        "status": 201,
        "message": "successfully follow user",
        "data": {
            "id": 5,
            "followerId": "d7a133bc-e8d9-4626-a23c-87601f33ca22",
            "followingId": "bce601de-0ceb-42b7-8abc-eef2590d3020",
            "updatedAt": "2023-09-16T13:54:03.736Z",
            "createdAt": "2023-09-16T13:54:03.736Z"
        }
    }
    ```

2. ##### Unfollow Following
    endpoint : ```/api/follow/{followId}```     
    method : ```DELETE```     
    json response : 
    ```
    {
        "status": 201,
        "message": "successfully unfollow user"
    }
    ```

### Post

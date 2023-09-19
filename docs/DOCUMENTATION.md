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
7. Make a firebase storage and configure the ```.env``` `
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
5. [Comment](#comment)

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
    NOTE: not all fields are required     
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

3. ##### Get Followings
    endpoint : ```/api/followings```     
    method : ```GET```     
    json response : 
    ```
    {
        "status": 200,
        "message": "successfully fetch followings",
        "data": [
            {
                "id": "bce601de-0ceb-42b7-8abc-eef2590d3020",
                "fullname": "Ananta",
                "username": "nanta10",
                "email": "risky@gmail.com",
                "following": 0,
                "followers": 2,
                "createdAt": "2023-09-16T10:07:04.000Z",
                "updatedAt": "2023-09-16T15:46:32.000Z"
            },
            {
                "id": "d7a133bc-e8d9-4626-a23c-87601f33ca22",
                "fullname": "Devan F",
                "username": "dvnnnfr",
                "email": "dnv10@gmail.com",
                "following": 1,
                "followers": 1,
                "createdAt": "2023-09-16T13:51:10.000Z",
                "updatedAt": "2023-09-16T15:46:47.000Z"
            }
        ]
    }
    ```

4. ##### Get Followers
    endpoint : ```/api/followers```    
    method : ```GET```      
    json response : 
    ```
    {
        "status": 200,
        "message": "successfully fetch followers",
        "data": [
            {
                "id": "2d2433a1-046e-438e-b1ab-a2a0f94a6159",
                "fullname": "Rivaldo",
                "username": "aldoo123",
                "email": "aldo@gmail.com",
                "following": 2,
                "followers": 0,
                "createdAt": "2023-09-16T15:44:44.000Z",
                "updatedAt": "2023-09-16T15:46:47.000Z"
            }
        ]
    }
    ```

### Post
1. ##### Get All Post
    endpoint : ```/api/posts```      
    method : ```GET```       
    json response : 
    ```
    {
        "status": 200,
        "message": "successfully fetch posts",
        "data": [
            {
                "id": "684caaa2-0335-498c-b44c-b1ba090b4818",
                "userId": "dad05825-85dd-4891-898a-0b3ad018e69f",
                "title": "keluh kesah oprec asprak",
                "desc": "knp harus dari ipk, oprecnya males bgt ajg",
                "image": null,
                "liked": 0,
                "comments": 1,
                "createdAt": "2023-09-17T10:25:02.000Z",
                "updatedAt": "2023-09-19T02:37:51.000Z",
                "user": {
                    "id": "dad05825-85dd-4891-898a-0b3ad018e69f",
                    "fullname": "Rivaldo",
                    "username": "aldoo123"
                }
            }
        ]
    }
    ```

2. ##### Get User Following's Post
    endpoint : ```/api/posts/feed```     
    method : ```GET```       
    json response : 
    ```
    {
        "status": 200,
        "message": "successfully fetch following's post",
        "data": [
            {
                "id": "684caaa2-0335-498c-b44c-b1ba090b4818",
                "userId": "dad05825-85dd-4891-898a-0b3ad018e69f",
                "title": "keluh kesah oprec asprak",
                "desc": "knp harus dari ipk, oprecnya males bgt ajg",
                "image": null,
                "liked": 0,
                "comments": 1,
                "createdAt": "2023-09-17T10:25:02.000Z",
                "updatedAt": "2023-09-19T02:37:51.000Z",
                "user": {
                    "id": "dad05825-85dd-4891-898a-0b3ad018e69f",
                    "fullname": "Rivaldo",
                    "username": "aldoo123"
                }
            }
        ]
    }
    ```

3. ##### Get User's Posts
    endpoint : ```/api/posts/my```    
    method : ```GET```      
    json response : 
    ```
    {
    "status": 200,
    "message": "successfully fetch user posts",
    "data": [
            {
                "id": "ba2d16ce-aa45-42f8-968a-7c9b34c066ee",
                "userId": "d7a133bc-e8d9-4626-a23c-87601f33ca22",
                "title": "keluh kesah oprec asprak",
                "desc": "knp harus dari ipk, oprecnya males bgt ajg",
                "image": null,
                "liked": 0,
                "comments": 0,
                "createdAt": "2023-09-16T16:33:45.000Z",
                "updatedAt": "2023-09-16T16:33:45.000Z"
            },
            {
                "id": "e82bd47f-6c32-4144-92ef-d284ae41a88c",
                "userId": "d7a133bc-e8d9-4626-a23c-87601f33ca22",
                "title": "gass kader adting ke bcc",
                "desc": "yjja, yang jago jago aja wkwkwk",
                "image": null,
                "liked": 0,
                "comments": 0,
                "createdAt": "2023-09-16T16:07:53.000Z",
                "updatedAt": "2023-09-16T16:07:53.000Z"
            }
        ]
    }
    ```

4. ##### Create Post
    endpoint : ```/api/posts```        
    method : ```POST```       
    json request body : 
    ```
    {
        "title": "keluh kesah oprec asprak",
        "desc": "knp harus dari ipk, oprecnya males bgt ajg"
    }
    ```
    json response : 
    ```
    {
        "status": 201,
        "message": "successfully create new post",
        "data": {
            "liked": 0,
            "comments": 0,
            "title": "keluh kesah oprec asprak",
            "desc": "knp harus dari ipk, oprecnya males bgt ajg",
            "id": "e82bd47f-6c32-4144-92ef-d284ae41a88c",
            "userId": "d7a133bc-e8d9-4626-a23c-87601f33ca22",
            "updatedAt": "2023-09-16T16:07:53.714Z",
            "createdAt": "2023-09-16T16:07:53.714Z"
        }
    }
    ```

4. ##### Update Post
    endpoint : ```/api/posts/{id}```       
    method : ```PATCH```
    json request body :       
    NOTE: not all fields are required     
    ```
    {
        "title": "gass kader adting ke bcc",
        "desc": "yjja, yang jago jago aja wkwkwk",
        "comments": 1,
        "liked": 1
    }
    ```
    json response : 
    ```
    {
        "status": 201,
        "message": "successfully update post"
    }
    ```

5. ##### Delete Post
    endpoint : ```/api/posts/{id}```      
    method : ```DELETE```       
    json response : 
    ```
    {
        "status": 200,
        "message": "successfully deleted post"
    }
    ```

### Comment
1. ##### Create Post Comment
    endpoint : ```/api/comments/post/{postId}```      
    method : ```POST```    
    json request body : 
    ```
    {
        "content": "ya sabar bang, next time gas semester 2"
    }
    ```
    json response :
    ```
    {
        "status": 201,
        "message": "successfully create comment",
        "data": {
            "liked": 0,
            "totalChained": 0,
            "id": "868a4f31-4b0a-4242-8b7c-756a17405527",
            "userId": "7d6205ec-d520-4cf4-ba08-0d02591aab3a",
            "postId": "c18805c8-4765-47ed-a5ba-fa669829d99b",
            "content": "ya sabar bang, next time gas semester 2",
            "updatedAt": "2023-09-17T08:04:48.241Z",
            "createdAt": "2023-09-17T08:04:48.241Z"
        }
    }
    ```

2. ##### Create Chained Comment  
    endpoint : ```/api/comments/reply/{commentId}```    
    method : ```POST```      
    json request body : 
    ```
    {
        "content": "aminnn, ngambil tif aja hihihi"
    }
    ```
    json response  : 
    ```
    {
        "status": 201,
        "message": "successfully create chained comment",
        "data": {
            "liked": 0,
            "totalChained": 0,
            "id": "4fe92077-04e9-41e4-b297-dc95de4e29d6",
            "userId": "83bd2636-8120-4fc8-9a7e-62c27bfb1211",
            "postId": "c18805c8-4765-47ed-a5ba-fa669829d99b",
            "commentId": "868a4f31-4b0a-4242-8b7c-756a17405527",
            "content": "aminnn, ngambil tif aja hihihi",
            "updatedAt": "2023-09-17T08:07:19.337Z",
            "createdAt": "2023-09-17T08:07:19.337Z"
        }
    }
    ```

3. ##### Get Post Comments
    endpoint : ```/api/comments/post/{postId}```      
    method : ```GET```    
    json response :
    ```
    {
        "status": 200,
        "message": "successfully fetch post comments",
        "data": [
            {
                "id": "a5a1f890-335e-4354-9506-a44ee09e1ad7",
                "postId": "684caaa2-0335-498c-b44c-b1ba090b4818",
                "userId": "43afc37c-b9e8-4634-9b02-435fd63d56e8",
                "commentId": null,
                "content": "ya sabar bang, next time gas semester 2",
                "liked": 0,
                "totalChained": 1,
                "createdAt": "2023-09-19T02:37:51.000Z",
                "updatedAt": "2023-09-19T02:45:48.000Z",
                "user": {
                    "id": "43afc37c-b9e8-4634-9b02-435fd63d56e8",
                    "fullname": "Ananta",
                    "username": "ininanta10"
                }
            },
            {
                "id": "c0dfc2e6-ebf4-484c-9ee2-a2fc1c9049d0",
                "postId": "684caaa2-0335-498c-b44c-b1ba090b4818",
                "userId": "dad05825-85dd-4891-898a-0b3ad018e69f",
                "commentId": "a5a1f890-335e-4354-9506-a44ee09e1ad7",
                "content": "aminnn, ngambil tif aja hihihi",
                "liked": 0,
                "totalChained": 0,
                "createdAt": "2023-09-19T02:45:48.000Z",
                "updatedAt": "2023-09-19T02:45:48.000Z",
                "user": {
                    "id": "dad05825-85dd-4891-898a-0b3ad018e69f",
                    "fullname": "Rivaldo",
                    "username": "aldoo123"
                }
            }
        ]
    }
    ```

4. ##### Get Chained Comments   
    endpoint : ```/api/comments/reply/{commentId}```      
    method : ```GET```       
    json response :
    ```
    {
        "status": 200,
        "message": "successfully fetch chained comments",
        "data": [
            {
                "id": "c0dfc2e6-ebf4-484c-9ee2-a2fc1c9049d0",
                "postId": "684caaa2-0335-498c-b44c-b1ba090b4818",
                "userId": "dad05825-85dd-4891-898a-0b3ad018e69f",
                "commentId": "a5a1f890-335e-4354-9506-a44ee09e1ad7",
                "content": "aminnn, ngambil tif aja hihihi",
                "liked": 0,
                "totalChained": 0,
                "createdAt": "2023-09-19T02:45:48.000Z",
                "updatedAt": "2023-09-19T02:45:48.000Z",
                "user": {
                    "id": "dad05825-85dd-4891-898a-0b3ad018e69f",
                    "fullname": "Rivaldo",
                    "username": "aldoo123",
                    "email": "aldo@gmail.com",
                    "following": 0,
                    "followers": 0,
                    "createdAt": "2023-09-17T10:24:47.000Z",
                    "updatedAt": "2023-09-17T10:24:47.000Z"
                }
            }
        ]
    }
    ```

5. ##### Delete Comment
    endpoint : ```'/api/comments/:id```   
    method : ```DELETE```      
    json response : 
    ```
    {
        "status": 200,
        "message": "successfully delete comment"
    }
    ```
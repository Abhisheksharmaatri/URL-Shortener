# URL Shortener Project

## Introduction

Welcome to my URL Shortener project! This project allows users to shorten long URLs into easy-to-share and manage short URLs. It's built using modern technologies and follows industry best practices to ensure security, reliability, and performance.

### Technologies Used

Node.js - A powerful server-side JavaScript runtime.
Express.js - A fast and minimalist web framework for Node.js.
Mongoose - A MongoDB object modeling tool for Node.js.
bcryptjs - A library for hashing passwords securely.
jsonwebtoken - A library for generating and validating JSON Web Tokens (JWT).
uuid - A package for generating universally unique identifiers (UUIDs).

## API Endpoints

### User Authentication

1. POST /user/signup
   Create a new user account.

Request Body:

```
{
    "email": "example@example.com",
    "name": "John Doe",
    "password": "securePassword"
}
```

Response:

```
{
    "success": true,
    "message": "User signed up successfully.",
    "token": "<JWT Token>"
}
```

2. POST /user/login
   Log in an existing user.

Request Body:

```
{
    "email": "example@example.com",
    "password": "securePassword"
}
```

Response:

```
{
    "success": true,
    "message": "User logged in successfully.",
    "token": "<JWT Token>"
}
```

### User URL Management

1. POST /url/create
   Create a shortened URL for the authenticated user.

Request Body:

```
{
    "longUrl": "https://example.com/some/very/long/url",
    "userId": "<User ID>"
}
```

Response:

```
{
    "message": "Url created successfully"
}
```

2. GET /url/:urlCode
   Retrieve the long URL associated with a given short URL code.

Response:

```
{
    "message": "Url fetched successfully",
    "url": "https://example.com/some/very/long/url"
}
```

3. DELETE /url/delete
   Delete a previously created short URL for the authenticated user.

Request Body:

```
{
    "urlId": "<URL ID>"
}
```

Response:

```
{
    "message": "Url deleted successfully"
}
```

### User Account Management

1. GET /user/get
   Retrieve the authenticated user's account details.

Response:

```
{
    "success": true,
    "message": "User fetched successfully.",
    "user": {
        "email": "example@example.com",
        "name": "John Doe",
        "urls": [
            {
            "longUrl": "https://example.com/some/very/long/url",
            "shortUrl": "https://shrt.io/AbCdEf",
            "expirationDate": "2023-12-31"
            },
            // More shortened URLs...
        ],
        "verificationStatus": true
    }
}
```

2. DELETE /user/delete
   Delete the authenticated user's account and all associated shortened URLs.

Response:

```
{
    "success": true,
    "message": "User deleted successfully."
}
```

GraphQL Queries
In addition to the REST API endpoints, my URL Shortener project also provides a GraphQL API for more flexible data retrieval. Below are the supported GraphQL queries:

1. Query: Get User Details
   Retrieve the details of a user based on their email.

```
query GetUser($email: String!) {
    getUser(email: $email) {
        email
        name
        verificationStatus
        urls {
            longUrl
            shortUrl
            expirationDate
        }
    }
}
```

2. Query: Get URL Details
   Retrieve the details of a short URL based on the URL code.

```
query GetUrl($urlCode: String!) {
    getUrl(urlCode: $urlCode) {
        longUrl
        shortUrl
        expirationDate
    }
}
```

3. Mutation: User Signup
   Create a new user account using GraphQL mutation.

```
mutation Signup($email: String!, $name: String!, $password: String!) {
    create(email: $email, name: $name, password: $password) {
        success
    }
}
```

4. Mutation: User Login
   Log in an existing user using GraphQL mutation.

```
mutation Login($email: String!, $password: String!) {
    getLogin(email: $email, password: $password) {
        token
        success
    }
}
```

5. Mutation: Create URL
   Create a shortened URL for the authenticated user using GraphQL mutation.

```
mutation CreateUrl($longUrl: String!, $userId: String!) {
    createUserUrl(longUrl: $longUrl, userId: $userId) {
        longUrl
        shortUrl
        expirationDate
    }
}
```

6. Mutation: Delete URL
   Delete a previously created short URL for the authenticated user using GraphQL mutation.

```
mutation DeleteUrl($urlId: String!) {
    deleteUrl(urlId: $urlId) {
        success
    }
}
```

8. Mutation: Delete User
   Delete the authenticated user's account and all associated shortened URLs using GraphQL mutation.

```
mutation DeleteUser($email: String!) {
    deleteUser(email: $email) {
        success
    }
}
```

## Conclusion

My URL Shortener project provides a convenient and secure way for users to manage and share long URLs. It's powered by a robust backend built with Node.js, Express.js, and MongoDB, ensuring high performance and scalability. With features like user authentication, URL creation, retrieval, and deletion, this project is ready to be integrated into various web applications and services.

Thank you for exploring my URL Shortener project. I hope you found it interesting and inspiring. Feel free to contribute, fork, or use it as a reference for your own projects. Happy coding! 🚀

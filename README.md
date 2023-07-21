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

## GraphQL Queries

In addition to the REST API endpoints, the URL Shortener project also provides a GraphQL API for more flexible data retrieval. This API allows you to query user details and URL information. Below are the supported GraphQL queries:

1. Query: Get User Details

   Retrieve the details of a user based on their email.

   ````{
   getUser(email: $email) {
       email
       name
       urls {
       longUrl
       shortUrl
       expirationDate
       }
       verificationStatus
   }
   }```

   Variables
   email: The email of the user you want to retrieve information for.

   ````

2. Query: Get URL Details
   Retrieve the details of a URL based on its URL code.

```{
getUrl(urlCode: $urlCode) {
longUrl
shortUrl
expirationDate
}
}
```

Variables
urlCode: The unique code of the URL you want to retrieve information for.

## GraphQL Mutations

The GraphQL API also provides mutations to perform create and delete operations. Below are the supported GraphQL mutations:

1.  Mutation: Create User
    Create a new user.

    ````mutation{
    create(email: $email, name: $name, password: $password) {
    success
    }
    }```
    Variables
    email: The email of the new user.
    name: The name of the new user.
    password: The password of the new user.
    ````

2.  Mutation: Create User URL
    Create a new URL for a specific user.

    ````mutation {
    createUserUrl(longUrl: $longUrl, email: $email) {
    success
    }
    }```
    Variables
    longUrl: The original (long) URL to be shortened.
    email: The email of the user who wants to create the URL.

    ````

3.  Mutation: Delete User
    Delete a user based on their email.

    ````mutation {
    deleteUser(email: $email) {
    success
    }
    }```
    Variables
    email: The email of the user you want to delete.

    ````

4.  Mutation: Delete URL
    Delete a URL based on its ID.

````mutation {
deleteUrl(urlId: $urlId) {
success
}
}```
Variables
urlId: The unique ID of the URL you want to delete.
Note
Please ensure that you have the necessary authorization and proper input values while executing these GraphQL queries and mutations. If you encounter any issues or have questions, feel free to reach out to the development team for assistan
````

## Conclusion

My URL Shortener project provides a convenient and secure way for users to manage and share long URLs. It's powered by a robust backend built with Node.js, Express.js, and MongoDB, ensuring high performance and scalability. With features like user authentication, URL creation, retrieval, and deletion, this project is ready to be integrated into various web applications and services.

Thank you for exploring my URL Shortener project. I hope you found it interesting and inspiring. Feel free to contribute, fork, or use it as a reference for your own projects. Happy coding! 🚀

```

Url Shortener API | Node.js, Express.js, JWT, GrapqhQL, Bcrypt.js, uuid
Developed URL Shortener API with Node.js, Express.js, MongoDB, JWT, Bcrypt.js.
Implemented user authentication with JWT and secure password hashing.
Utilized MongoDB and Mongoose for data storage and modeling.
Created RESTful API endpoints for URL management (CRUD operations).
Added GraphQL support for efficient data retrieval.
Github link: https://github.com/Abhisheksharmaatri/URL-Shortener

```

```

```

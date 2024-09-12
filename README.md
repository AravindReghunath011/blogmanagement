# Blog and User API Documentation

This API provides endpoints for managing blogs and users. Below is a detailed explanation of each route.

## Blog Routes

### Create a Blog
- **Route:** `POST /create`
- **Description:** Creates a new blog post.
- **Required Fields:** title, content, author
- **Authentication:** Not required
- **Response:** Returns the created blog object

### Edit a Blog
- **Route:** `POST /edit/:id`
- **Description:** Edits an existing blog post.
- **Required Fields:** title, content
- **Authentication:** Required (Access token in Authorization header)
- **Authorization:** Only the author can edit their own blog
- **Response:** Returns the updated blog object

### Delete a Blog
- **Route:** `DELETE /delete/:id`
- **Description:** Deletes a blog post.
- **Authentication:** Required (Access token in Authorization header)
- **Authorization:** Only the author can delete their own blog
- **Response:** Confirmation message of successful deletion

### Get All Blogs
- **Route:** `GET /all`
- **Description:** Retrieves all blog posts.
- **Authentication:** Not required
- **Response:** Returns an array of all blog objects

### Get a Specific Blog
- **Route:** `GET /:id`
- **Description:** Retrieves a specific blog post by ID.
- **Authentication:** Not required
- **Response:** Returns the requested blog object

## User Routes

### Register a New User
- **Route:** `POST /register`
- **Description:** Registers a new user.
- **Required Fields:** name, email, password
- **Authentication:** Not required
- **Response:** Returns the new user object and authentication tokens

### User Login
- **Route:** `POST /login`
- **Description:** Authenticates a user and provides access tokens.
- **Required Fields:** email, password
- **Authentication:** Not required
- **Response:** Returns user information and authentication tokens

### Refresh Token
- **Route:** `POST /refresh-token`
- **Description:** Generates a new access token using a refresh token.
- **Required Fields:** refreshToken (in request body)
- **Authentication:** Not required (but valid refresh token needed)
- **Response:** Returns a new access token

### Get All Users with Their Blogs
- **Route:** `GET /`
- **Description:** Retrieves all users along with their associated blogs.
- **Authentication:** Not required
- **Response:** Returns an array of user objects, each including an array of their blog posts

## Authentication

- Most routes that modify data (create, edit, delete) require authentication.
- Authentication is done via JWT (JSON Web Tokens).
- Include the access token in the Authorization header as a Bearer token.

## Error Handling

All routes include error handling and will return appropriate status codes and error messages if something goes wrong.

## Environment Variables

Make sure to set up the following environment variables:
- `ACCESS_TOKEN_SECRET`: Secret key for signing access tokens
- `REFRESH_TOKEN_SECRET`: Secret key for signing refresh tokens

## Models

The API uses two main models:
1. User model (fields: name, email, password)
2. Blog model (fields: title, content, author)

Ensure your database is set up with these models before using the API.

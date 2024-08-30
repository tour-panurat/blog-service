/**
 * @swagger
 * components:
 *   securitySchemes:
 *     JWT:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: |
 *         Enter '{token}' (without quotes) in the header to authenticate.
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID
 *         name:
 *           type: string
 *           description: The user's name
 *         username:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           description: The user's email address
 *         phone:
 *           type: string
 *           description: The user's phone number
 *         website:
 *           type: string
 *           description: The user's website
 *         company:
 *           $ref: '#/components/schemas/Company'  # Reference to Company schema
 *         address:
 *           $ref: '#/components/schemas/Address'  # Reference to Address schema
 *         posts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Post'  # Reference to Post schema
 *       required:
 *         - name
 *         - username
 *         - email
 *         - phone
 *         - website
 *     Address:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The address ID
 *         street:
 *           type: string
 *           description: The street name
 *         suite:
 *           type: string
 *           description: The suite or apartment number
 *         city:
 *           type: string
 *           description: The city name
 *         zipcode:
 *           type: string
 *           description: The postal code
 *         geo:
 *           $ref: '#/components/schemas/Geo'  # Reference to Geo schema
 *         userId:
 *           type: integer
 *           description: The ID of the user this address belongs to
 *       required:
 *         - street
 *         - city
 *         - zipcode
 *     Geo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The geo ID
 *         lat:
 *           type: string
 *           description: Latitude coordinate
 *         lng:
 *           type: string
 *           description: Longitude coordinate
 *         addressId:
 *           type: integer
 *           description: The ID of the address this geo data belongs to
 *       required:
 *         - lat
 *         - lng
 *     Company:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The company ID
 *         name:
 *           type: string
 *           description: The company's name
 *         catchPhrase:
 *           type: string
 *           description: The company's catchphrase
 *         bs:
 *           type: string
 *           description: Business descriptor
 *         userId:
 *           type: integer
 *           description: The ID of the user this company belongs to
 *       required:
 *         - name
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The post ID
 *         title:
 *           type: string
 *           description: The title of the post
 *         body:
 *           type: string
 *           description: The content of the post
 *         userId:
 *           type: integer
 *           description: The ID of the user this post belongs to
 *       required:
 *         - title
 *         - body
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * paths:
 *   /users:
 *     get:
 *       summary: Get all users
 *       tags: [Users]
 *       security:
 *         - JWT: []  # This applies the JWT security scheme
 *       responses:
 *         200:
 *           description: A list of users
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/User'  # Response as User schema
 *         500:
 *           description: Internal server error
 */

/**
 * @swagger
 * paths:
 *   /users/{id}:
 *     get:
 *       summary: Get a user by ID
 *       tags: [Users]
 *       security:
 *         - JWT: []  # This applies the JWT security scheme
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The user ID
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: User details
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'  # Response as User schema
 *         404:
 *           description: User not found
 *         500:
 *           description: Internal server error
 */

/**
 * @swagger
 * paths:
 *   /users/{id}/posts:
 *     get:
 *       summary: Get all posts by user ID
 *       tags: [Users]
 *       security:
 *         - JWT: []  # This applies the JWT security scheme
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The user ID
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: A list of posts
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Post'  # Response as Post schema
 *         404:
 *           description: User not found
 *         500:
 *           description: Internal server error
 */

/**
 * @swagger
 * paths:
 *   /users:
 *     post:
 *       summary: Create a new user
 *       tags: [Users]
 *       security:
 *         - JWT: []  # This applies the JWT security scheme
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'  # Reference the User schema
 *       responses:
 *         201:
 *           description: User created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'  # Response as User schema
 *         500:
 *           description: Internal server error
 */

/**
 * @swagger
 * paths:
 *   /users/{id}:
 *     put:
 *       summary: Update a user
 *       tags: [Users]
 *       security:
 *         - JWT: []  # This applies the JWT security scheme
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The user ID
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'  # Reference the User schema
 *       responses:
 *         200:
 *           description: User updated
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'  # Response as User schema
 *         404:
 *           description: User not found
 *         500:
 *           description: Internal server error
 */

/**
 * @swagger
 * paths:
 *   /users/{id}:
 *     patch:
 *       summary: Patch a user
 *       tags: [Users]
 *       security:
 *         - JWT: []  # This applies the JWT security scheme
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The user ID
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'  # Reference the User schema
 *       responses:
 *         200:
 *           description: User patched
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'  # Response as User schema
 *         404:
 *           description: User not found
 *         500:
 *           description: Internal server error
 */

/**
 * @swagger
 * paths:
 *   /users/{id}:
 *     delete:
 *       summary: Delete a user
 *       tags: [Users]
 *       security:
 *         - JWT: []  # This applies the JWT security scheme
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The user ID
 *           schema:
 *             type: integer
 *       responses:
 *         204:
 *           description: User deleted
 *         404:
 *           description: User not found
 *         500:
 *           description: Internal server error
 */

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management
 */

/**
 * @swagger
 * paths:
 *   /posts:
 *     get:
 *       summary: Get all posts with optional filtering
 *       tags: [Posts]
 *       security:
 *         - JWT: []  # This applies the JWT security scheme
 *       parameters:
 *         - name: title
 *           in: query
 *           description: Title filter for posts
 *           required: false
 *           schema:
 *             type: string
 *         - name: userId
 *           in: query
 *           description: Filter by user ID
 *           required: false
 *           schema:
 *             type: integer
 *         - name: page
 *           in: query
 *           description: Page number for pagination
 *           required: false
 *           schema:
 *             type: integer
 *             default: 1
 *         - name: limit
 *           in: query
 *           description: Number of posts to return
 *           required: false
 *           schema:
 *             type: integer
 *             default: 10
 *       responses:
 *         200:
 *           description: A list of posts
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   posts:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Post'
 *                   total:
 *                     type: integer
 *         500:
 *           description: Internal server error
 */

/**
 * @swagger
 * paths:
 *   /posts/{id}:
 *     get:
 *       summary: Get a post by ID
 *       tags: [Posts]
 *       security:
 *         - JWT: []  # This applies the JWT security scheme
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The post ID
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: Post details
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Post'
 *         404:
 *           description: Post not found
 *         500:
 *           description: Internal server error
 */

/**
 * @swagger
 * paths:
 *   /posts:
 *     post:
 *       summary: Create a new post
 *       tags: [Posts]
 *       security:
 *         - JWT: []  # This applies the JWT security scheme
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 body:
 *                   type: string
 *                 userId:
 *                   type: integer
 *       responses:
 *         201:
 *           description: Post created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Post'
 *         500:
 *           description: Internal server error
 */

/**
 * @swagger
 * paths:
 *   /posts/{id}:
 *     put:
 *       summary: Update an existing post
 *       tags: [Posts]
 *       security:
 *         - JWT: []  # This applies the JWT security scheme
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The post ID
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 body:
 *                   type: string
 *       responses:
 *         200:
 *           description: Post updated
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Post'
 *         404:
 *           description: Post not found
 *         500:
 *           description: Internal server error
 */

/**
 * @swagger
 * paths:
 *   /posts/{id}:
 *     patch:
 *       summary: Patch an existing post (partial update)
 *       tags: [Posts]
 *       security:
 *         - JWT: []  # This applies the JWT security scheme
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The post ID
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 body:
 *                   type: string
 *       responses:
 *         200:
 *           description: Post patched
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Post'
 *         404:
 *           description: Post not found
 *         500:
 *           description: Internal server error
 */

/**
 * @swagger
 * paths:
 *   /posts/{id}:
 *     delete:
 *       summary: Delete a post
 *       tags: [Posts]
 *       security:
 *         - JWT: []  # This applies the JWT security scheme
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The post ID
 *           schema:
 *             type: integer
 *       responses:
 *         204:
 *           description: Post deleted
 *         404:
 *           description: Post not found
 *         500:
 *           description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         body:
 *           type: string
 *         userId:
 *           type: integer
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *             username:
 *               type: string
 *             email:
 *               type: string
 *             phone:
 *               type: string
 *             website:
 *               type: string
 *             company:
 *               type: string
 */



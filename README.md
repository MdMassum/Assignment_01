# Node App with Mongoose and APIs

This project is a Node app that uses Mongoose to connect to a MongoDB database and provides three APIs to retrieve, store, update, and delete data.

## Getting Started

1. Clone the repository: `git clone https://github.com/MdMassum/Assignment_01.git`
2. Install the dependencies: `npm install`
3. Start the server: `node run dev`

## APIs

1. GET /getUser/:id : Retrieves a single user.
2. GET /getAllUser : Retrieves a list of all users.
3. POST /createUser : Creates a new user.
4. PUT /updateUser/:id : Updates an existing user.
5. PUT /updatePassword/:id : Updates Password of an existing user.
6. DELETE /deleteUser/:id : Deletes an existing user

## Model

The User model is defined in `models/userModel.js`.

## Database

The app connects to a MongoDB database using Mongoose.

## Version Control

This project uses Git for version control.

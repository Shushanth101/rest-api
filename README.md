Overview
This project is a basic REST API built with Node.js and Express.js, which allows for CRUD (Create, Read, Update, Delete) operations on a collection of user data stored in a JSON file (MOCK_DATA.json). The project demonstrates handling API routes, parsing incoming data, and interacting with the filesystem to persist data.

Features
->Fetch all users
->Fetch a user by ID
->Add a new user
->Update user details
->Delete a user
Project Structure
->index.js: The main application file containing all routes and logic.
->MOCK_DATA.json: JSON file that stores user data.
Dependencies
->express: Web framework for Node.js.
->fs: Node.js File System module used for reading/writing user data to a file.
How to Run
1.Install Node.js and npm.
2.Clone the repository.
3.Run npm install to install the dependencies.
4.Start the server with node index.js (or npm start if the repository is cloned as it is).
5.Access the API at http://localhost:8080.
API Endpoints
1.GET /users
Displays all users as an HTML list.

2.GET /api/users
Returns all users in JSON format.

3.GET /api/users/:id
Returns the user with the given ID. Example: GET /api/users/1.
 {
    "id": 1,
    "first_name": "Freedman",
    "last_name": "Hawtry",
    "email": "fhawtry0@oaic.gov.au",
    "gender": "Male"
  }

4.POST /api/users
Adds a new user. Example body:
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "gender": "Male"
}

5.PATCH /api/users/:id
Updates the details of an existing user with the given ID. Example body:
{
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "jane.doe@example.com",
  "gender": "Female"
}

6.DELETE /api/users/:id
Deletes a user by their ID.

Error Handling
->The project handles invalid user IDs and file write errors by returning appropriate HTTP status codes (400, 500).
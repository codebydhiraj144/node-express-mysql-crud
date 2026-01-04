# node-express-mysql-crud
A practice Node.js project from Apna College demonstrating CRUD operations with Express, MySQL, and EJS templates.


# Node Express MySQL User CRUD

This is a **practice project** from Apna College tutorials demonstrating **basic CRUD operations** using Node.js, Express, MySQL, and EJS templates.

## Project Overview

The project manages a simple **user database** with the following functionality:

1. **Homepage**: Shows total number of users in the database.
2. **View Users**: Displays all users in a table with `ID`, `Email`, `Username`, and an "Edit Username" button.
3. **Edit User**: Allows editing a user's username after validating their password.
4. **Update User**: Updates the username in the database using a PATCH request via method-override.

## Tech Stack

- **Node.js** – Server-side JavaScript runtime
- **Express.js** – Web framework for routing and middleware
- **MySQL** – Database for storing users
- **EJS** – Templating engine for dynamic HTML rendering
- **Method-override** – To support PATCH requests from forms
- **Faker.js** – For generating random users (helper function included but not used in routes)

## Features

- Simple user management system (Read and Update)
- Password verification before updating username
- Dynamic HTML rendering using EJS templates
- Clean, beginner-friendly code structure for learning purposes
- Prepared for deployment/testing on local machine (localhost:8080)



// faker library (currently NOT used in routes)
const { faker } = require('@faker-js/faker');

// mysql driver
const mysql = require('mysql2');

// express framework
const express = require("express");
const app = express();

// path module for views folder
const path = require("path");

// method-override for PATCH / DELETE via forms
const methodoverride = require("method-override");

// middleware to support ?_method=PATCH
app.use(methodoverride("_method"));

// middleware to read form data (req.body)
// ⚠️ typo fixed should be: extended (not extend)
app.use(express.urlencoded({ extend: true }));

// setting ejs as view engine
app.set("view engine", "ejs");

// setting views directory
app.set("views", path.join(__dirname, "views"));


// MySQL connection (single connection)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'dhiraj'
});

// faker helper function (not used currently)
let getRandomUser = () => {
  return [
    faker.string.uuid(),          // random id
    faker.internet.username(),    // random username
    faker.internet.email(),       // random email
    faker.internet.password(),    // random password
  ];
};


// ================= HOME ROUTE =================
app.get("/", (req, res) => {
  let q = 'SELECT COUNT(*) FROM user';

  // ⚠️ try-catch does NOT catch async errors
  try {
    connection.query(q, (err, result) => {
      if (err) throw err; // error thrown inside async callback

      // extracting count value
      let count = result[0]["count(*)"];

      // rendering home.ejs with count
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log("Error caught:", err);
    res.send("some err in database");
  }
});


// ================= SHOW USERS ROUTE =================
app.get("/user", (req, res) => {
  let q = 'SELECT * FROM user';

  try {
    connection.query(q, (err, users) => {
      if (err) throw err;

      // passing users array to showusers.ejs
      res.render("showusers.ejs", { users });
    });
  } catch (err) {
    console.log("Error caught:", err);
    res.send("some err in database");
  }
});


// ================= EDIT USER ROUTE =================
app.get("/user/:id/edit", (req, res) => {
  // extracting id from URL
  let { id } = req.params;

  // ⚠️ SQL injection risk (string interpolation)
  let q = `SELECT * FROM user WHERE id = '${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;

      // first user object
      let user = result[0];

      // rendering edit form with user data
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.log("Error caught:", err);
    res.send("some err in database");
  }
});


// ================= UPDATE USER ROUTE =================
app.patch("/user/:id", (req, res) => {

  // id from URL
  let { id } = req.params;

  // destructuring form data
  let { password: formpass, username: newusername } = req.body;

  // ⚠️ SQL injection risk
  let q = `SELECT * FROM user WHERE id = '${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;

      let user = result[0];

      // password validation
      if (formpass != user.password) {
        res.send("Wrong password");   // ❌ response sent here
      } else {

        // ⚠️ variable mismatch: newUsername vs newusername
        let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`;

        connection.query(q2, (err, result) => {
          if (err) throw err;

          // redirect after update
          res.redirect("/user");      // ❌ response sent again
        });
      }

      // ❌ third response → causes ERR_HTTP_HEADERS_SENT
      res.send(user);
    });
  } catch (err) {
    console.log("Error caught:", err);
    res.send("some err in database");
  }
});


// ================= SERVER =================
app.listen("8080", () => {
  console.log("server is listening to port 8080:");
});

const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const timeAgo = require("timeago.js")
const cors = require("cors")
const session = require('express-session');
const cookieParser = require('cookie-parser');

const PORT = 6869

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
  }
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  })
);
app.use(cookieParser());

// const conn = mysql.createConnection({
//   host: 'db4free.net',   
//   user: 'urvashi', /* MySQL User */
//   password: 'qwerty123', /* MySQL Password */
//   database: 'qwerty_db' /* MySQL Database */
// });

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root', /* MySQL User */
  password: '', /* MySQL Password */
  database: 'me2' /* MySQL Database */
});

conn.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected with App...');
});

const hashing = (s) => {
  s = s.split("").map((e, i) => {
    return i % 2 == 0 ? String.fromCharCode(e.charCodeAt(0) + 1) : e.charCodeAt(0) - 1;
  })
  return s.join("");
}

app.get("/", (req, res) => res.send("APPLe"))

// Auth 
app.post('/auth/:flag', (req, res) => {
  req.body.password = hashing(req.body.password);
  if (req.params.flag === "true") {
    let sqlQuery = "INSERT INTO users SET ?";
    let query = conn.query(sqlQuery, req.body, (err, results) => {
      if (err) {
        res.status(400).json({ error: err.sqlMessage });
      }
      else {
        req.session.user = {
          id: results.insertId,
          name: req.body.name,
          username: req.body.username,
          email: req.body.email
        };
        req.session.save();
        res.status(200).json({ success: "User created successfully" });
      }
    });
  } else if (req.params.flag === "false") {
    // Login
    let sqlQuery = "SELECT * FROM users WHERE username='" + req.body.username + "' AND password='" + req.body.password + "'";
    let query = conn.query(sqlQuery, req.body, (err, results) => {
      if (err) {
        res.status(400).json({ error: err.sqlMessage });
      }
      else {
        if (results.length > 0) {
          delete results[0].password;
          req.session.user = results[0];
          req.session.save();
          res.status(200).json({ success: "User logged in successfully" });
        } else {
          res.status(400).json({ error: "Invalid Credentials" });
        }
      }
    });
  } else if (req.params.flag === "admin") {
    let sqlQuery = "SELECT * FROM admin WHERE username='" + req.body.username + "' AND password='" + req.body.password + "'";
    let query = conn.query(sqlQuery, req.body, (err, results) => {
      if (err) {
        res.status(400).json({ error: err.sqlMessage });
      }
      else {
        if (results.length > 0) {
          // req.session.user = req.body.username === "admin" ? "admin" : results[0].id;
          delete results[0].password;
          req.session.user = results[0];
          req.session.save();
          res.status(200).json({ success: "Admin logged in successfully" });
        } else {
          res.status(400).json({ error: "Invalid Credentials" });
        }
      }
    });
  }
});


app.get("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).json({ success: "User logged out successfully" });
})

const checkAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ error: "You are not logged in" });
  }
};

app.get("/loggedIn", (req, res) => {
  if (req.session.user) {
    res.json({ auth: true, user: req.session.user });
  } else {
    res.json({ auth: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
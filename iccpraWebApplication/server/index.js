const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Gosvea2022@",
  database: "cruddatabase",
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/insert", (req, res) => {
  const {
    firstName,
    lastName,
    phoneNum,
    email,
    courseTime,
    channel,
    otherDetails,
  } = req.body;

  const sqlInsert =
    "INSERT INTO students (firstName, lastName, phoneNum, email, courseTime, channel, otherDetails) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sqlInsert,
    [firstName, lastName, phoneNum, email, courseTime, channel, otherDetails],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Server error");
      } else {
        console.log(result);
        res.status(200).send("Successful submission");
      }
    }
  );
});

app.post("/login", (req, res) => {
  const { email, lastName } = req.body;
  const sql = "SELECT * FROM students WHERE email = ? AND lastName = ?";
  db.query(sql, [email, lastName], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Failed");
    }
  });
});

app.get("/api/userinfo", (req, res) => {
  const { email } = req.query;
  const sql = "SELECT * FROM students WHERE email = ?";
  db.query(sql, [email], (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (data.length > 0) {
      res.json(data[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
});

app.put("/api/userinfo", (req, res) => {
  const {
    email,
    firstName,
    lastName,
    phoneNum,
    courseTime,
    channel,
    otherDetails,
  } = req.body;
  const sql =
    "UPDATE students SET firstName = ?, lastName = ?, phoneNum = ?, courseTime = ?, channel = ?, otherDetails = ? WHERE email = ?";
  db.query(
    sql,
    [firstName, lastName, phoneNum, courseTime, channel, otherDetails, email],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows > 0) {
        res.json({ message: "User info updated successfully" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("running on port 301");
});

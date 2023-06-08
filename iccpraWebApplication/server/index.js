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
  const { email, idStudents } = req.body;
  const sql = "SELECT * FROM students WHERE email = ? AND idStudents = ?";
  db.query(sql, [email, idStudents], (err, data) => {
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

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM students";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

app.get("/api/get/:userId", (req, res) => {
  const userId = req.params.userId;
  const sqlSelect = "SELECT * FROM students WHERE idStudents = ?";
  db.query(sqlSelect, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

app.put("/api/update/:userId", (req, res) => {
  const userId = req.params.userId;
  const { courseTime } = req.body;

  const sqlUpdate = "UPDATE students SET courseTime = ? WHERE idStudents = ?";
  db.query(sqlUpdate, [courseTime, userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      console.log(result);
      res.status(200).send("Successfully updated course time");
    }
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});

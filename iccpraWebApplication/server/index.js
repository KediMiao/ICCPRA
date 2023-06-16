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

//Table for Date registration limitation
app.get("/api/createTable", (req, res) => {
  const sqlCreateTable =
    "CREATE TABLE registrations (date VARCHAR(255), count INT)";
  db.query(sqlCreateTable, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      console.log(result);
      res.status(200).send("Successfully created table");
    }
  });
});

// check date slot
app.get("/api/registrationsCount", (req, res) => {
  const sqlSelect =
    "SELECT courseDate, COUNT(*) as count FROM registrations GROUP BY courseDate";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      res.json(result);
    }
  });
});

//form submission
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

  const date = courseTime;

  const sqlSelect = "SELECT * FROM registrations WHERE date = ?";
  db.query(sqlSelect, [date], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      if (result.length > 0) {
        // check if 12 slot is full when the chosen date is created
        if (result[0].count < 2) {
          // add and save the customer information if slot is avaliable
          const sqlUpdate =
            "UPDATE registrations SET count = count + 1 WHERE date = ?";
          db.query(sqlUpdate, [date], (err, result) => {
            if (err) {
              console.error(err);
              res.status(500).send("Server error");
            } else {
              // insert
              const sqlInsert =
                "INSERT INTO students (firstName, lastName, phoneNum, email, courseTime, channel, otherDetails) VALUES (?, ?, ?, ?, ?, ?, ?)";
              db.query(
                sqlInsert,
                [
                  firstName,
                  lastName,
                  phoneNum,
                  email,
                  courseTime,
                  channel,
                  otherDetails,
                ],
                (err, result) => {
                  if (err) {
                    console.error(err);
                    res.status(500).send("Server error");
                  } else {
                    res.status(200).send("Successful submission");
                  }
                }
              );
            }
          });
        } else {
          // prevent from submit the form when date is full
          res.status(409).send("This course date is full");
        }
      } else {
        // create a new date record if chosen date is not found
        const sqlInsert =
          "INSERT INTO registrations (date, count) VALUES (?, ?)";
        db.query(sqlInsert, [date, 1], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send("Server error");
          } else {
            // insert
            const sqlInsert =
              "INSERT INTO students (firstName, lastName, phoneNum, email, courseTime, channel, otherDetails) VALUES (?, ?, ?, ?, ?, ?, ?)";
            db.query(
              sqlInsert,
              [
                firstName,
                lastName,
                phoneNum,
                email,
                courseTime,
                channel,
                otherDetails,
              ],
              (err, result) => {
                if (err) {
                  console.error(err);
                  res.status(500).send("Server error");
                } else {
                  res.status(200).send("Successful submission");
                }
              }
            );
          }
        });
      }
    }
  });
});

// Test code for table information
app.get("/api/registrations", (req, res) => {
  const sqlSelect = "SELECT * FROM registrations";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      res.json(result);
    }
  });
});

//Guest login module
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

//display student's personal information from database
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

//Reschedule function
app.put("/api/update/:userId", (req, res) => {
  const userId = req.params.userId;
  const newCourseTime = req.body.courseTime;

  // First, get the old course time
  db.query(
    "SELECT courseTime FROM students WHERE idStudents = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Server error");
        return;
      }

      const oldCourseTime = results[0].courseTime;

      // Second, check the new course time
      db.query(
        "SELECT COUNT(*) AS count FROM students WHERE courseTime = ?",
        [newCourseTime],
        (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).send("Server error");
          } else if (results[0].count >= 2) {
            res.status(409).send("This course time is full");
          } else {
            // Third, update the user
            db.query(
              "UPDATE students SET courseTime = ? WHERE idStudents = ?",
              [newCourseTime, userId],
              (err, results) => {
                if (err) {
                  console.error(err);
                  res.status(500).send("Server error");
                } else {
                  // Fourth, decrement the old course time count
                  db.query(
                    "UPDATE registrations SET count = count - 1 WHERE date = ?",
                    [oldCourseTime],
                    (err, results) => {
                      if (err) {
                        console.error(err);
                        res.status(500).send("Server error");
                      } else {
                        // Fifth, increment the new course time count
                        db.query(
                          "INSERT INTO registrations (date, count) VALUES (?, 1) ON DUPLICATE KEY UPDATE count = count + 1",
                          [newCourseTime],
                          (err, results) => {
                            if (err) {
                              console.error(err);
                              res.status(500).send("Server error");
                            } else {
                              res
                                .status(200)
                                .send("Successfully updated course time");
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  );
});

app.listen(3001, () => {
  console.log("running on port 3001");
});

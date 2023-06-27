if (!process.env.NODE_ENV || process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const dbInstance = require("./db/instance");
const path = require("path");
const cookieParser = require("cookie-parser");
const Mark = require("./models/mark");

const app = express();
app.set("view engine", "ejs");

(async () => {
  try {
    await dbInstance.authenticate();
    console.log("Connected to database...");
  } catch (error) {
    console.log("Cannot connect to database: ", error);
  }
})();

// (async () => {
//   try {
//     await dbInstance.sync({ alter: true, force: false });
//     console.log("All models synchronized...");
//   } catch (error) {
//     console.log("Cannot synchronize models: ", error);
//   }
// })();

// middlewares
app.use(express.urlencoded());
app.use(express.static("assets"));
app.use(cookieParser());

// ui routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/admin-login", (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, "views", "admin-login.html"));
});

app.get("/add-marks", (req, res) => {
  if (!req.cookies.isloggedin)
    return res
      .status(200)
      .sendFile(path.join(__dirname, "views", "admin-login.html"));

  return res
    .status(200)
    .sendFile(path.join(__dirname, "views", "add-marks.html"));
});

app.get("/show-marks", async (req, res) => {
  if (!req.cookies.isloggedin)
    return res
      .status(200)
      .sendFile(path.join(__dirname, "views", "admin-login.html"));

  try {
    const marks = await Mark.findAll();

    return res.render("show-marks", { marks });
  } catch (error) {
    console.log("Cannot show marks", error);
    return res.status(500).redirect("/add-marks?error=internal-server-error");
  }
});

// api routes
app.post("/admin-login", (req, res) => {
  const { username, password } = req.body;
  const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

  if (!username || !password)
    return res.status(422).redirect("/admin-login?error=empty");

  if (username != ADMIN_USERNAME)
    return res.status(422).redirect("/admin-login?error=invalid-username");

  if (password != ADMIN_PASSWORD)
    return res.status(422).redirect("/admin-login?error=invalid-password");

  res.cookie("isloggedin", true, { httpOnly: true });

  return res.status(200).redirect("/add-marks");
});

app.post("/add-marks", async (req, res) => {
  const { oose, jp, os, daa, dbms, pqt, dob } = req.body;

  if (
    !oose ||
    !jp ||
    !os ||
    !daa ||
    !dbms ||
    !pqt ||
    !dob ||
    !req.body["register-number"]
  )
    return res.status(422).redirect("/add-marks?error=empty");

  try {
    const mark = await Mark.create({
      oose,
      jp,
      os,
      daa,
      dbms,
      pqt,
      dob,
      registerNumber: req.body["register-number"],
    });

    return res.status(422).redirect("/show-marks");
  } catch (error) {
    console.log("Cannot add marks", error);
    return res.status(500).redirect("/add-marks?error=internal-server-error");
  }
});

app.post("/student-login", async (req, res) => {
  const { dob } = req.body;
  const registerNumber = req.body["register-number"];

  if (!dob || !registerNumber) return res.status(422).redirect("/?error=empty");

  // fetch student marks
  try {
    const mark = await Mark.findOne({ where: { dob, registerNumber } });

    if (!mark) return res.status(422).redirect("/?error=not-found");

    return res.render("result", { mark });
  } catch (error) {
    console.log("Cannot login student", error);
    return res.status(500).redirect("/?error=internal-server-error");
  }
});

const PORT = 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

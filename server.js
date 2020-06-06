const express = require("express");
const connectDB = require("./config/db");
const passport = require("passport");
const session = require("express-session");

const app = express();

connectDB();

require("./config/passport")(passport);

app.use(express.json({ extended: false }));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/posts/:id/comments", require("./routes/api/comments"));

app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => console.log("server is starting"));

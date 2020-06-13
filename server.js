const express = require("express");
const connectDB = require("./config/db");
const passport = require("passport");
const session = require("express-session");

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/marketplace", require("./routes/api/marketplace"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/posts/:id/comments", require("./routes/api/comments"));
app.use("/api/forums", require("./routes/api/forums"));

app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server is starting"));

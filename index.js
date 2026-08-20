const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello from Lesson 1!");
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.get("/version", (req, res) => {
    res.json({ version: "1.0.0" });
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

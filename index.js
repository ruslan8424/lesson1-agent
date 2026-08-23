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

app.get("/info", (req, res) => {
    res.json({
        name: "lesson1-agent",
        version: "1.0.0"
    });
});


app.get("/status", (req, res) => {
    res.json({
        name: "lesson1-agent",
        status: "healthy",
        version: process.env.APP_VERSION || "1.0.0",
        environment: process.env.NODE_ENV || "development"
    });
});


app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

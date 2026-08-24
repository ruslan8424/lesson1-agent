const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

app.get("/db-status", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({
            status: "connected",
            databaseTime: result.rows[0].now
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});

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

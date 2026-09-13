const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.static("public"));
app.use(express.json());
const port = process.env.PORT || 3000;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

pool.on("error", (error) => {
    console.error("Unexpected PostgreSQL connection error:", error.message);
});

function isValidId(id) {
    return Number.isInteger(Number(id)) && Number(id) > 0;
}


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
    res.send("Hello from Lesson 2!");
});

app.get("/health", async (req, res) => {
    try {
        await pool.query("SELECT 1");

        res.json({
            status: "ok",
            database: "connected"
        });
    } catch (error) {
        res.status(503).json({
            status: "error",
            database: "unavailable"
        });
    }
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

app.get("/tasks", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks ORDER BY id"
        );

        res.json(result.rows);
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});


app.post("/tasks", async (req, res) => {
    try {
        const { title } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                status: "error",
                message: "Title is required"
            });
        }

        const result = await pool.query(
            "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
            [title]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});

app.put("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidId(id)) {
            return res.status(400).json({
                status: "error",
                message: "Invalid task ID"
            });
        }
        const { title, completed } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                status: "error",
                message: "Title is required"
            });
        }

        if (typeof completed !== "boolean") {
            return res.status(400).json({
                status: "error",
                message: "Completed must be true or false"
            });
        }

        const result = await pool.query(
            `UPDATE tasks
             SET title = $1, completed = $2
             WHERE id = $3
             RETURNING *`,
            [title, completed, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Task not found"
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});


app.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidId(id)) {
            return res.status(400).json({
                status: "error",
                message: "Invalid task ID"
            });
        }

        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Task not found"
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});


app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

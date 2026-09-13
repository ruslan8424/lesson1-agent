const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

async function runMigrations() {
    try {
        const migrationsDir = path.join(__dirname, "migrations");

        const files = fs
            .readdirSync(migrationsDir)
            .filter(file => file.endsWith(".sql"))
            .sort();

        for (const file of files) {
            const sql = fs.readFileSync(
                path.join(migrationsDir, file),
                "utf8"
            );

            console.log(`Running migration: ${file}`);
            await pool.query(sql);
        }

        console.log("Migrations completed successfully.");
    } catch (error) {
        console.error("Migration failed:", error.message);
        process.exitCode = 1;
    } finally {
        await pool.end();
    }
}

runMigrations();

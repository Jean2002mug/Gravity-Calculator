import express from "express";// import express from "express";
import gravityRouter from "./routes/gravityRoutes.js";//import gravityRouter from "./routes/gravityRoutes.js";
import pool from "./databases/db.js";//import pool from "./databases/db.js";
import celestialBodyRouter from "./routes/celestialBodyRoutes.js";
import calculationHistoryRouter from "./routes/calculationHistoryRoutes.js";
//initialize express app
//express function is called to create an instance of an Express application
// which is assigned to the variable app. This app variable will be used to define routes
//  and middleware for the server.
const app = express();

// set the port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

//express app uses JSON middleware to parse incoming requests with JSON payloads
app.use(express.json());
//express app gets the root route and sends a welcome message as JSON response
app.get("/", (_req, res) => {
    res.json({
        message: "Welcome to the Gravity Calculator API!"
    });
});
//express app uses the gravityRouter for all routes starting with /api/gravity
app.use("/api/gravity", gravityRouter);
//express app uses the celestialBodyRouter for all routes starting with /api/celestial-bodies
app.use("/api/celestial-bodies", celestialBodyRouter);
//express app uses the calculationHistoryRoutes for all routes starting with /api/calculation
app.use("/api/calculations", calculationHistoryRouter);

//health check endpoint to verify database connection
app.get("/api/health/db", async (_req, res) => {
    try {
        const result = await pool.query(
            "SELECT current_database() AS database, NOW() AS time"
        );

        res.json({
            connected: true,
            database: result.rows[0].database,
            time: result.rows[0].time
        });
    } catch (error) {
        console.error("Database connection error:", error);

        res.status(500).json({
            connected: false,
            error: "Unable to connect to PostgreSQL"
        });
    }
});


//express app listens on the specified port and logs a message when the server is running

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
import express from "express";// import express from "express";
import gravityRouter from "./routes/gravityRoutes.js";//import gravityRouter from "./routes/gravityRoutes.js";
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
//express app listens on the specified port and logs a message when the server is running
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
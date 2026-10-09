"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || "http://127.0.0.1:8000";
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Gravity Calculator API!" });
});
app.post(["/api/gravity/force", "/calculate-force"], async (req, res) => {
    const { mass1, mass2, distance } = req.body;
    try {
        const response = await fetch(`${PYTHON_SERVICE_URL}/gravity/force`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mass1, mass2, distance }),
        });
        const result = await response.json();
        res.status(response.status).json(result);
    }
    catch (error) {
        console.error("Error calculating force:", error);
        res.status(500).json({ error: "Failed to calculate force" });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

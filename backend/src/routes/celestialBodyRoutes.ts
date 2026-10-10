import { Router } from "express";
import pool from "../databases/db.js";

const router = Router();

interface CelestialBodyRequest {
    name: string;
    mass: number;
    radius: number;
}

// Get all celestial bodies
router.get("/", async (_req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, name, mass, radius, created_at
             FROM celestial_bodies
             ORDER BY id`
        );

        res.json(result.rows);

    } catch (error) {
        console.error("Error retrieving celestial bodies:", error);

        res.status(500).json({
            error: "Failed to retrieve celestial bodies"
        });
    }
});

// Retrieve one celestial body by ID
router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "Invalid celestial body ID"
        });
    }

    try {
        const result = await pool.query(
            `SELECT id, name, mass, radius, created_at
             FROM celestial_bodies
             WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Celestial body not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error("Error retrieving celestial body:", error);

        res.status(500).json({
            error: "Failed to retrieve celestial body"
        });
    }
});

// Create a celestial body
router.post("/", async (req, res) => {
    const {
        name,
        mass,
        radius
    } = req.body as CelestialBodyRequest;

    if (!name || mass <= 0 || radius <= 0) {
        return res.status(400).json({
            error: "name is required and mass and radius must be greater than 0"
        });
    }

    try {
        const result = await pool.query(
            `INSERT INTO celestial_bodies (name, mass, radius)
             VALUES ($1, $2, $3)
             RETURNING id, name, mass, radius, created_at`,
            [name, mass, radius]
        );

        res.status(201).json(result.rows[0]);

    } catch (error: any) {

        if (error.code === "23505") {
            return res.status(409).json({
                error: "A celestial body with that name already exists"
            });
        }

        console.error("Error creating celestial body:", error);

        res.status(500).json({
            error: "Failed to create celestial body"
        });
    }
});

export default router;
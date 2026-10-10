import { Router } from 'express';
import pool from '../databases/db';

const router= Router();

router.get("/history", async (_req, res) => {
    try {
        const result = await pool.query(
            `SELECT
                id,
                calculation_type,
                input_data,
                result_data,
                created_at
             FROM calculation_history
             ORDER BY created_at DESC`
        );

        res.json(result.rows);

    } catch (error) {
        console.error("Error retrieving calculation history:", error);

        res.status(500).json({
            error: "Failed to retrieve calculation history"
        });
    }
});

export default router;
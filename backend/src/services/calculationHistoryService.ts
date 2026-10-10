import pool from "../databases/db.js";

export async function saveCalculation(
    calculationType: string,
    inputData: unknown,
    resultData: unknown
) {
    try {
        await pool.query(
            `INSERT INTO calculation_history
             (calculation_type, input_data, result_data)
             VALUES ($1, $2, $3)`,
            [
                calculationType,
                JSON.stringify(inputData),
                JSON.stringify(resultData)
            ]
        );
    } catch (error) {
        console.error("Failed to save calculation history:", error);
    }
}
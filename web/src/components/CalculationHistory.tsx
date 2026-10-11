// Load the React hooks.
import { useEffect, useState } from "react";

// Format very large and very small numbers cleanly.
import ScientificNumber from "./ScientificNumber";

// Define one calculation stored in PostgreSQL
interface CalculationHistoryItem {
    // Store the calculation ID.
    id: number;
    // Store the calculation type.
    calculation_type: string;
    // Store the input names and numbers.
    input_data: Record<string, number>;
    // Store the result values and units.
    result_data: Record<string, number | string>;
    // Store when the calculation was saved.
    created_at: string;
// Close this block.
}

// Define the shape of this data.
interface CalculationHistoryProps {
    // Receive the counter that triggers a reload.
    refreshKey: number;
// Close this block.
}

// Create the history component with its refresh counter.
function CalculationHistory({ refreshKey }: CalculationHistoryProps) {
    // Start with an empty history list.
    const [history, setHistory] = useState<CalculationHistoryItem[]>([]);
    // Track whether history is loading.
    const [loading, setLoading] = useState(true);
    // Store any error message.
    const [error, setError] = useState("");

    // Reload the history when the refresh counter changes.
    useEffect(() => {
        // Load saved calculations from the backend.
        async function loadHistory() {
            // Try to load the data.
            try {
                // Show the loading state.
                setLoading(true);

                // Send a request to the backend.
                const response = await fetch(
                    // Use the calculation history endpoint.
                    "http://localhost:3000/api/calculations/history"
                // Finish this expression.
                );

                // Check whether the request failed.
                if (!response.ok) {
                    // Report the failed request.
                    throw new Error("Failed to retrieve calculation history");
                // Close this block.
                }

                // Prepare to store the returned history items.
                const data: CalculationHistoryItem[] =
                    // Read the response as JSON.
                    await response.json();

                // Save the loaded history.
                setHistory(data);
                // Clear the previous error.
                setError("");

            // Handle a loading error.
            } catch (error) {
                // Log the error for debugging.
                console.error(error);
                // Show a loading error message.
                setError("Unable to load calculation history");

            // Finish after success or failure.
            } finally {
                // Stop showing the loading state.
                setLoading(false);
            // Close this block.
            }
        // Close this block.
        }

        // Start loading the history.
        loadHistory();
    // Run this effect again when the counter changes.
    }, [refreshKey]);

    // Turn a stored name into a readable label.
    function formatCalculationName(name: string) {
        // Start with the stored name.
        return name
            // Split the name at underscores.
            .split("_")
            // Update each word.
            .map(
                // Process one word.
                (word) =>
                    // Capitalize the first letter of the word.
                    word.charAt(0).toUpperCase() + word.slice(1)
            // Finish this expression.
            )
            // Join the words with spaces.
            .join(" ");
    // Close this block.
    }

    // Check whether history is still loading.
    if (loading) {
        // Show the loading message.
        return <p>Loading calculation history...</p>;
    // Close this block.
    }

    // Check for an error message.
    if (error) {
        // Show the error message.
        return <p>{error}</p>;
    // Close this block.
    }

    // Display the component.
    return (
        // Start the history section.
        <section className="panel history-panel">
            {/* Show this heading. */}
            <h2>Calculation History</h2>

            {/* Check whether the history is empty. */}
            {history.length === 0 ? (
                // Show this information in a paragraph.
                <p>No calculations yet.</p>
            // Otherwise, show the saved calculations.
            ) : (
                // Display each saved calculation.
                history.map((item) => (
                    // Start a saved calculation entry.
                    <article className="history-card" key={item.id}>
                        {/* Show this heading. */}
                        <h3>
                            {/* Show a readable calculation name. */}
                            {formatCalculationName(
                                // Use this calculation type.
                                item.calculation_type
                            // Finish this expression.
                            )}
                        {/* Close this part of the page. */}
                        </h3>

                        {/* Show this heading. */}
                        <h4>Inputs</h4>

                        {/* Display each saved input using scientific formatting. */}
                        {Object.entries(item.input_data).map(
                            ([name, value]) => (
                                <p key={name}>
                                    {/* Show a readable input name. */}
                                    {formatCalculationName(name)}:{" "}

                                    {/* Format numbers such as 5.972e24 cleanly. */}
                                    <ScientificNumber
                                        value={Number(value)}
                                    />
                                </p>
                            )
                        )}

                        {/* Show this heading. */}
                        <h4>Result</h4>

                        {/* Display the saved numerical result. */}
                        {Object.entries(item.result_data)

                            // Do not create a separate "Unit: N" line.
                            .filter(([name]) => name !== "unit")

                            .map(([name, value]) => (
                                <p key={name}>
                                    {/* Show the readable result name. */}
                                    {formatCalculationName(name)}:{" "}

                                    {/* Format the number and attach its unit. */}
                                    <ScientificNumber
                                        value={Number(value)}
                                        unit={String(
                                            item.result_data.unit ?? ""
                                        )}
                                    />
                                </p>
                         ))}

                        {/* Show this information in a paragraph. */}
                        <p>
                            {/* Read the saved date. */}
                            {new Date(
                                // Use the creation timestamp.
                                item.created_at
                            // Format the date and time for the user.
                            ).toLocaleString()}
                        {/* Close this part of the page. */}
                        </p>

                        {/* Separate the saved entries. */}
                    {/* Close this part of the page. */}
                    </article>
                // Finish this expression.
                ))
            // Finish this expression.
            )}
        {/* Close this part of the page. */}
        </section>
    // Finish this expression.
    );
// Close this block.
}

// Make this component available to other files.
export default CalculationHistory;
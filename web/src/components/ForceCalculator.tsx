// Import React's hook for storing component state.
import { useState } from "react"; // Make useState available to this component.

interface ForceResult { // Describe the calculation result returned by the backend.
    force: number; // Store the calculated gravitational force.
    unit: string; // Store the force's unit of measurement.
} // End the result interface.

function ForceCalculator() { // Define the gravitational force calculator component.
    const [mass1, setMass1] = useState(""); // Store the first mass as input text.
    const [mass2, setMass2] = useState(""); // Store the second mass as input text.
    const [distance, setDistance] = useState(""); // Store the distance as input text.

    const [result, setResult] = useState<ForceResult | null>(null); // Start without a calculation result.
    const [error, setError] = useState(""); // Store any user-facing error message.
    const [loading, setLoading] = useState(false); // Track whether a calculation request is pending.

    async function calculateForce(event: React.FormEvent<HTMLFormElement>) { // Handle form submission asynchronously.
        event.preventDefault(); // Prevent the browser from reloading the page on submission.

        setLoading(true); // Mark the calculation as in progress.
        setError(""); // Clear any error from the previous attempt.
        setResult(null); // Clear any previous calculation result.

        try { // Handle failures while requesting or reading the calculation.
            const response = await fetch( // Send the request and wait for the HTTP response.
                // Finish this expression.
                "http://localhost:3000/api/gravity/force", // Specify the local force calculation endpoint.
                { // Begin the request options.
                    method: "POST", // Submit the calculation inputs with a POST request.
                    headers: { // Define the request headers.
                        "Content-Type": "application/json" // Tell the server the request body contains JSON.
                    }, // End the request headers.
                    body: JSON.stringify({ // Convert the input object to a JSON request body.
                        mass1: Number(mass1), // Convert the first mass input to a number.
                        mass2: Number(mass2), // Convert the second mass input to a number.
                        distance: Number(distance) // Convert the distance input to a number.
                    }) // Finish serializing the request body.
                } // End the request options.
            ); // Finish the fetch call.

            const data = await response.json(); // Parse the server's JSON response.

            if (!response.ok) { // Check for an unsuccessful HTTP status.
                throw new Error("Calculation failed"); // Pass the failure to the catch block.
            } // End the response status check.

            setResult(data); // Store the successful result for display.
        } catch (error) { // Catch request, parsing, or response status errors.
            console.error(error); // Log the failure for debugging.
            setError("Unable to calculate gravitational force"); // Set the error shown to the user.
        } finally { // Run after either success or failure.
            setLoading(false); // Mark the calculation attempt as complete.
        } // End the error-handling blocks.
    } // End the form submission handler.

    return ( // Render the calculator's interface.
        // Group the calculator in a section.
        <section>
            {/* Display the calculator heading. */}
            <h2>Gravitational Force</h2>

            {/* Run calculateForce when this form is submitted. */}
            <form onSubmit={calculateForce}>
                {/* Group the first mass label and input. */}
                <div>
                    {/* Associate the label with the first mass input. */}
                    <label htmlFor="mass1">Mass 1 (kg)</label>
                    {/* Render the first mass input with the properties below. */}
                    <input
                        // Identify the input for its label.
                        id="mass1"
                        // Use the browser's numeric input control.
                        type="number"
                        // Display the current first mass state.
                        value={mass1}
                        // Update the first mass state when the user types.
                        onChange={(event) => setMass1(event.target.value)}
                        // Require a value before the browser submits the form.
                        required
                    // Finish the first mass input.
                    />
                    {/* Close the first mass group. */}
                </div>

                {/* Group the second mass label and input. */}
                <div>
                    {/* Associate the label with the second mass input. */}
                    <label htmlFor="mass2">Mass 2 (kg)</label>
                    {/* Render the second mass input with the properties below. */}
                    <input
                        // Identify the input for its label.
                        id="mass2"
                        // Use the browser's numeric input control.
                        type="number"
                        // Display the current second mass state.
                        value={mass2}
                        // Update the second mass state when the user types.
                        onChange={(event) => setMass2(event.target.value)}
                        // Require a value before the browser submits the form.
                        required
                    // Finish the second mass input.
                    />
                    {/* Close the second mass group. */}
                </div>

                {/* Group the distance label and input. */}
                <div>
                    {/* Associate the label with the distance input. */}
                    <label htmlFor="distance">Distance (m)</label>
                    {/* Render the distance input with the properties below. */}
                    <input
                        // Identify the input for its label.
                        id="distance"
                        // Use the browser's numeric input control.
                        type="number"
                        // Display the current distance state.
                        value={distance}
                        // Update the distance state when the user types.
                        onChange={(event) => setDistance(event.target.value)}
                        // Require a value before the browser submits the form.
                        required
                    // Finish the distance input.
                    />
                    {/* Close the distance group. */}
                </div>

                {/* Disable submission while a calculation is pending. */}
                <button type="submit" disabled={loading}>
                    {/* Choose the button text based on the loading state. */}
                    {loading ? "Calculating..." : "Calculate"}
                    {/* Close the submit button. */}
                </button>
                {/* Close the calculator form. */}
            </form>

            {/* Show an error paragraph only when an error message exists. */}
            {error && <p>{error}</p>}

            {/* Show the result block only when a result exists. */}
            {result && (
                // Wrap the calculation result in a container.
                <div>
                    {/* Display the result heading. */}
                    <h3>Result</h3>
                    {/* Group the force value and its unit in a paragraph. */}
                    <p>
                        {/* Display the calculated force followed by its unit. */}
                        {result.force} {result.unit}
                        {/* Close the result paragraph. */}
                    </p>
                    {/* Close the result container. */}
                </div>
            // Finish this expression.
            ) /* Finish the conditional result display. */}
            {/* Close the calculator section. */}
        </section>
    ); // Finish returning the calculator markup.
} // End the calculator component.

export default ForceCalculator; // Make this component available to other modules.

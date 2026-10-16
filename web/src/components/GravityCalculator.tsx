// Load the React hooks.
import { useEffect, useState } from "react";
// Load the available calculation settings.
import { calculations } from "../config/calculations";
import ScientificNumber from './ScientificNumber';
// Base URL for the Node.js backend.
import { API_URL } from "../config/api";
//Fetch from Node with automatic retry support
import { apiFetch } from "../utils/apiFetch";

// Define the shape of this data.
interface GravityCalculatorProps {
    // Define the callback for a completed calculation.
    onCalculationComplete: () => void;
    onCelestialBodyChange: (bodyName: string) => void;
// Close this block.
}

// Describe the data for a celestial body.
interface CelestialBody {
    // Store the body ID.
    id: number;
    // Store the body name.
    name: string;
    // Store the body mass.
    mass: number;
    // Store the body radius.
    radius: number;
// Close this block.
}

// Create the calculator component.
function GravityCalculator({
    // Receive the completion callback.
    onCalculationComplete,
    onCelestialBodyChange
// Apply the calculator prop types.
}:GravityCalculatorProps) {
    // Keep track of the selected calculation type.
    const [calculationType, setCalculationType] = useState("force");
    // Keep track of the input values.
    const [inputs, setInputs] = useState<Record<string, string>>({});
    // Keep track of the calculation result.
    const [result, setResult] = useState<Record<string, unknown> | null>(null);

    // Keep track of the available celestial bodies.
    const [bodies, setBodies] = useState<CelestialBody[]>([]);

    // Keep track of the selected body ID.
    const [selectedBody, setSelectedBody] = useState("");
    // Keep track of the first body ID.
    const [selectedBody1, setSelectedBody1] = useState("");
    // Keep track of the second body ID.
    const [selectedBody2, setSelectedBody2] = useState("");

    // Keep track of the error message.
    const [error, setError] = useState("");
    // Keep track of whether a calculation is running.
    const [loading, setLoading] = useState(false);

    // Get the settings for the selected calculation.
    const config = calculations[calculationType];

    // Load body data when the component opens.
    useEffect(() => {
        // Load the available celestial bodies.
        async function loadBodies() {
            // Try the request.
            try {
                // Send a request to the backend.
                const response = await apiFetch(
                    // Use this backend address.
                   "/api/celestial-bodies"
                // Finish this expression.
                );

                // Check whether the request failed.
                if (!response.ok) {
                    // Report the failed request.
                    throw new Error("Failed to retrieve celestial bodies");
                // Close this block.
                }

                // Read the JSON response.
                const data: CelestialBody[] = await response.json();

                // Save the available bodies.
                setBodies(data);
            // Handle a failed request.
            } catch (error) {
                // Log the error for debugging.
                console.error("Unable to load celestial bodies:", error);
            // Close this block.
            }
        // Close this block.
        }

        // Start loading the bodies.
        loadBodies();
    // Keep this effect independent of state changes.
    }, []);

    // Update an input value.
    function handleInputChange(name: string, value: string) {
        // Update the input values.
        setInputs((previousInputs) => ({
            // Keep the other input values.
            ...previousInputs,
            // Save the changed input value.
            [name]: value
        // Finish this expression.
        }));
    // Close this block.
    }

    // Switch the calculation type.
    function handleCalculationChange(value: string) {
        // Save the selected calculation type.
        setCalculationType(value);

        // Clear the input values.
        setInputs({});
        // Clear the previous result.
        setResult(null);
        // Clear the previous error.
        setError("");

        // Clear the body selection.
        setSelectedBody("");
        // Clear the body selection.
        setSelectedBody1("");
        // Clear the body selection.
        setSelectedBody2("");
    // Close this block.
    }

    // Use the selected body mass and radius.
    function handleBodySelection(bodyId: string) {
        // Save the selected body ID.
        setSelectedBody(bodyId);
        
        // If the user clears the selection,
        // return the background to Earth.
        if (!bodyId) {
            onCelestialBodyChange("Earth");
            return;
        }
        // Find the selected body.
        const body = bodies.find(
            // Match the body ID to the selection.
            (body) => body.id === Number(bodyId)
        // Finish this expression.
        );

        // Check whether no matching body was found.
        if (!body) {
            // Stop if the body is missing.
            return;
        // Close this block.
        }
        // Change the page background.
        onCelestialBodyChange(body.name);

        // Update the input values.
        setInputs((previousInputs) => ({
            // Keep the other input values.
            ...previousInputs,
            // Fill in the selected body mass.
            mass: String(body.mass),
            // Fill in the selected body radius.
            radius: String(body.radius)
        // Finish this expression.
        }));
    // Close this block.
    }

    // Use the first selected body mass.
    function handleBody1Selection(bodyId: string) {
        // Save the selected body ID.
        setSelectedBody1(bodyId);
        
        // If the user clears the selection,
        // return the visual background to Earth.
        if (!bodyId) {
            onCelestialBodyChange("Earth");
            return;
        }

        // Find the selected body.
        const body = bodies.find(
            // Match the body ID to the selection.
            (body) => body.id === Number(bodyId)
        // Finish this expression.
        );

        // Check whether no matching body was found.
        if (!body) {
            // Stop if the body is missing.
            return;
        // Close this block.
        }

        // Change the background to the selected body.
         onCelestialBodyChange(body.name);

        // Update the input values.
        setInputs((previousInputs) => ({
            // Keep the other input values.
            ...previousInputs,
            // Fill in this mass from the selected body.
            mass1: String(body.mass)
        // Finish this expression.
        }));
    // Close this block.
    }

    // Use the second selected body mass.
    function handleBody2Selection(bodyId: string) {
        // Save the selected body ID.
        setSelectedBody2(bodyId);
        
        // Return to Earth when the selection is cleared.
        if (!bodyId) {
            onCelestialBodyChange("Earth");
            return;
        }
        // Find the selected body.
        const body = bodies.find(
            // Match the body ID to the selection.
            (body) => body.id === Number(bodyId)
        // Finish this expression.
        );

        // Check whether no matching body was found.
        if (!body) {
            // Stop if the body is missing.
            return;
        // Close this block.
        }
        onCelestialBodyChange(body.name);


        // Update the input values.
        setInputs((previousInputs) => ({
            // Keep the other input values.
            ...previousInputs,
            // Fill in this mass from the selected body.
            mass2: String(body.mass)
        // Finish this expression.
        }));
    // Close this block.
    }

    // Submit the calculation.
    async function calculate(event: React.FormEvent<HTMLFormElement>) {
        // Stop the form from reloading the page.
        event.preventDefault();

        // Mark the calculation as running.
        setLoading(true);
        // Clear the previous error.
        setError("");
        // Clear the previous result.
        setResult(null);

        // Create the data to send to the backend.
        const payload: Record<string, number> = {};

        // Go through the required input fields.
        for (const field of config.fields) {
            // Convert this input to a number.
            payload[field.name] = Number(inputs[field.name]);
        // Close this block.
        }

        // Try the request.
        try {
            // Send a request to the backend.
            const response = await apiFetch(
                // Use this backend address.
                config.endpoint,
                // Finish this expression.
                {
                    // Send the data with a POST request.
                    method: "POST",
                    // Set the request headers.
                    headers: {
                        // Tell the backend to expect JSON.
                        "Content-Type": "application/json"
                    // Close this block.
                    },
                    // Convert the input data to JSON.
                    body: JSON.stringify(payload)
                // Close this block.
                }
            // Finish this expression.
            );

            // Read the JSON response.
            const data = await response.json();

            // Check whether the request failed.
            if (!response.ok) {
                // Report the failed request.
                throw new Error("Calculation failed");
            // Close this block.
            }

            // Save the calculation result.
            setResult(data);
            // Tell the app the calculation is complete.
            onCalculationComplete();

        // Handle a failed request.
        } catch (error) {
            // Log the error for debugging.
            console.error(error);
            // Show an error message.
            setError("Unable to complete calculation");

        // Finish after success or failure.
        } finally {
            // Mark the calculation as finished.
            setLoading(false);
        // Close this block.
        }
    // Close this block.
    }

    // Check whether two body selectors are needed.
    const usesTwoBodies =
        // Include this calculation type in the check.
        calculationType === "force" ||
        // Include this calculation type in the check.
        calculationType === "potentialEnergy";

    // Check whether a body with a radius is needed.
    const usesBodyWithRadius =
        // Include this calculation type in the check.
        calculationType === "acceleration" ||
        // Include this calculation type in the check.
        calculationType === "escapeVelocity" ||
        // Include this calculation type in the check.
        calculationType === "intensity" ||
        // Include this calculation type in the check.
        calculationType === "density" ||
        // Include this calculation type in the check.
        calculationType === "potentialDifference" ||
        // Include this calculation type in the check.
        calculationType === "potentialGradient";

    // Check whether a central body is needed.
    const usesCentralBody =
        // Include this calculation type in the check.
        calculationType === "angularVelocity";

    // Display the calculator interface.
    return (
        // Start the calculator section.
        <section className="panel calculator-panel">
            {/* Show the calculator title. */}
            <h2>Physics Calculator</h2>

            {/* Start a group of related content. */}
            <div className="form-group">
                {/* Label the matching input. */}
                <label htmlFor="calculation">
                    {/* Show this label text. */}
                    Calculation
                {/* Close this part of the interface. */}
                </label>

                {/* Start a selection menu. */}
                <select
                    // Give this control an ID for its label.
                    id="calculation"
                    // Set the current control value.
                    value={calculationType}
                    // Handle changes to this control.
                    onChange={(event) =>
                        // Update the selected calculation.
                        handleCalculationChange(event.target.value)
                    // Close this block.
                    }
                // Finish the opening tag.
                >
                    {/* Create an option for each calculation. */}
                    {Object.entries(calculations).map(([key, calculation]) => (
                        // Add a menu option.
                        <option key={key} value={key}>
                            {/* Show the calculation name. */}
                            {calculation.label}
                        {/* Close this part of the interface. */}
                        </option>
                    // Finish this list or conditional display.
                    ))}
                {/* Close this part of the interface. */}
                </select>
            {/* Close this part of the interface. */}
            </div>

            {/* Show this heading. */}
            <h3>{config.label}</h3>

            {/* Show these selectors when needed. */}
            {usesTwoBodies && (
                // Group the two body selectors.
                <>
                    {/* Start a group of related content. */}
                    <div className="form-group">
                        {/* Label the matching input. */}
                        <label htmlFor="body1">
                            {/* Show this label text. */}
                            Celestial Body 1
                        {/* Close this part of the interface. */}
                        </label>

                        {/* Start a selection menu. */}
                        <select
                            // Give this control an ID for its label.
                            id="body1"
                            // Set the current control value.
                            value={selectedBody1}
                            // Handle changes to this control.
                            onChange={(event) =>
                                // Update the first selected body.
                                handleBody1Selection(event.target.value)
                            // Close this block.
                            }
                        // Finish the opening tag.
                        >
                            {/* Add a menu option. */}
                            <option value="">
                                {/* Show this label text. */}
                                Select a body
                            {/* Close this part of the interface. */}
                            </option>

                            {/* Create an option for each body. */}
                            {bodies.map((body) => (
                                // Add a menu option.
                                <option
                                    // Give React a unique key for this item.
                                    key={body.id}
                                    // Set the current control value.
                                    value={body.id}
                                // Finish the opening tag.
                                >
                                    {/* Show the body name. */}
                                    {body.name}
                                {/* Close this part of the interface. */}
                                </option>
                            // Finish this list or conditional display.
                            ))}
                        {/* Close this part of the interface. */}
                        </select>
                    {/* Close this part of the interface. */}
                    </div>

                    {/* Start a group of related content. */}
                    <div>
                        {/* Label the matching input. */}
                        <label htmlFor="body2">
                            {/* Show this label text. */}
                            Celestial Body 2
                        {/* Close this part of the interface. */}
                        </label>

                        {/* Start a selection menu. */}
                        <select
                            // Give this control an ID for its label.
                            id="body2"
                            // Set the current control value.
                            value={selectedBody2}
                            // Handle changes to this control.
                            onChange={(event) =>
                                // Update the second selected body.
                                handleBody2Selection(event.target.value)
                            // Close this block.
                            }
                        // Finish the opening tag.
                        >
                            {/* Add a menu option. */}
                            <option value="">
                                {/* Show this label text. */}
                                Select a body
                            {/* Close this part of the interface. */}
                            </option>

                            {/* Create an option for each body. */}
                            {bodies.map((body) => (
                                // Add a menu option.
                                <option
                                    // Give React a unique key for this item.
                                    key={body.id}
                                    // Set the current control value.
                                    value={body.id}
                                // Finish the opening tag.
                                >
                                    {/* Show the body name. */}
                                    {body.name}
                                {/* Close this part of the interface. */}
                                </option>
                            // Finish this list or conditional display.
                            ))}
                        {/* Close this part of the interface. */}
                        </select>
                    {/* Close this part of the interface. */}
                    </div>
                {/* Close this part of the interface. */}
                </>
            // Finish this list or conditional display.
            )}

            {/* Show these selectors when needed. */}
            {usesBodyWithRadius && (
                // Start a group of related content.
                <div>
                    {/* Label the matching input. */}
                    <label htmlFor="body">
                        {/* Show this label text. */}
                        Celestial Body
                    {/* Close this part of the interface. */}
                    </label>

                    {/* Start a selection menu. */}
                    <select
                        // Give this control an ID for its label.
                        id="body"
                        // Set the current control value.
                        value={selectedBody}
                        // Handle changes to this control.
                        onChange={(event) =>
                            // Update the selected body.
                            handleBodySelection(event.target.value)
                        // Close this block.
                        }
                    // Finish the opening tag.
                    >
                        {/* Add a menu option. */}
                        <option value="">
                            {/* Show this label text. */}
                            Select a body
                        {/* Close this part of the interface. */}
                        </option>

                        {/* Create an option for each body. */}
                        {bodies.map((body) => (
                            // Add a menu option.
                            <option
                                // Give React a unique key for this item.
                                key={body.id}
                                // Set the current control value.
                                value={body.id}
                            // Finish the opening tag.
                            >
                                {/* Show the body name. */}
                                {body.name}
                            {/* Close this part of the interface. */}
                            </option>
                        // Finish this list or conditional display.
                        ))}
                    {/* Close this part of the interface. */}
                    </select>
                {/* Close this part of the interface. */}
                </div>
            // Finish this list or conditional display.
            )}

            {/* Show these selectors when needed. */}
            {usesCentralBody && (
                // Start a group of related content.
                <div>
                    {/* Label the matching input. */}
                    <label htmlFor="central-body">
                        {/* Show this label text. */}
                        Central Body
                    {/* Close this part of the interface. */}
                    </label>

                    {/* Start a selection menu. */}
                    <select
                        // Give this control an ID for its label.
                        id="central-body"
                        // Set the current control value.
                        value={selectedBody}
                        // Handle changes to this control.
                        onChange={(event) => {
                            // Read the selected body ID.
                            const bodyId = event.target.value;

                            // Save the selected body ID.
                            setSelectedBody(bodyId);

                            // Find the selected body.
                            const body = bodies.find(
                                // Match the body ID to the selection.
                                (body) => body.id === Number(bodyId)
                            // Finish this expression.
                            );

                            // Continue if a matching body exists.
                            if (body) {
                                // Change the page background.
                                onCelestialBodyChange(body.name);
                                // Update the input values.
                                setInputs((previousInputs) => ({
                                    // Keep the other input values.
                                    ...previousInputs,
                                    // Fill in the selected body mass.
                                    mass: String(body.mass)
                                // Finish this expression.
                                }));
                            // Close this block.
                            }
                        // Close this block.
                        }}
                    // Finish the opening tag.
                    >
                        {/* Add a menu option. */}
                        <option value="">
                            {/* Show this label text. */}
                            Select a body
                        {/* Close this part of the interface. */}
                        </option>

                        {/* Create an option for each body. */}
                        {bodies.map((body) => (
                            // Add a menu option.
                            <option
                                // Give React a unique key for this item.
                                key={body.id}
                                // Set the current control value.
                                value={body.id}
                            // Finish the opening tag.
                            >
                                {/* Show the body name. */}
                                {body.name}
                            {/* Close this part of the interface. */}
                            </option>
                        // Finish this list or conditional display.
                        ))}
                    {/* Close this part of the interface. */}
                    </select>
                {/* Close this part of the interface. */}
                </div>
            // Finish this list or conditional display.
            )}

            {/* Run the calculation when the form is submitted. */}
            <form className="calculator-form" onSubmit={calculate}>
                {/* Create an input for each required field. */}
                {config.fields.map((field) => (
                    // Start a group of related content.
                    <div className="form-group" key={field.name}>
                        {/* Label the matching input. */}
                        <label htmlFor={field.name}>
                            {/* Show the field name and unit. */}
                            {field.label} ({field.unit})
                        {/* Close this part of the interface. */}
                        </label>

                        {/* Start a number input. */}
                        <input
                            // Give this control an ID for its label.
                            id={field.name}
                            // Use a numeric input.
                            type="number"
                            // Allow decimal values.
                            step="any"
                            // Set the current control value.
                            value={inputs[field.name] ?? ""}
                            // Handle changes to this control.
                            onChange={(event) =>
                                // Save the changed input.
                                handleInputChange(
                                    // Pass the input name.
                                    field.name,
                                    // Pass the new input value.
                                    event.target.value
                                // Finish this expression.
                                )
                            // Close this block.
                            }
                            // Require a value before submission.
                            required
                        // Finish the opening tag.
                        />
                    {/* Close this part of the interface. */}
                    </div>
                // Finish this list or conditional display.
                ))}

                {/* Disable the submit button while calculating. */}
                <button className="primary-button" type="submit" disabled={loading}>
                    {/* Show the button text for the current loading state. */}
                    {loading ? "Calculating..." : "Calculate"}
                {/* Close this part of the interface. */}
                </button>
            {/* Close this part of the interface. */}
            </form>

            {/* Show any error message. */}
            {error && <p className="error-message">{error}</p>}

            {/* Show the result when available. */}
            {result && (
                <div className="result-card">
                    <p className="result-label">
                        Result
                    </p>

                    <p className="result-value">
                        <ScientificNumber
                            value={Number(result[config.resultKey])}
                            unit={String(result.unit)}
                        />
                    </p>
                </div>
            )}
        {/* Close this part of the interface. */}
        </section>
    // Finish this expression.
    );
// Close this block.
}

// Make the component available to other files.
export default GravityCalculator;
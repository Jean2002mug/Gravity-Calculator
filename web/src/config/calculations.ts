// Define the shape of this data.
export interface CalculationField {
    // Define the input name used by the API.
    name: string;
    // Define the label shown to the user.
    label: string;
    // Define the input unit.
    unit: string;
// Close this block.
}

// Define the shape of this data.
export interface CalculationConfig {
    // Define the label shown to the user.
    label: string;
    // Define the backend endpoint.
    endpoint: string;
    // Define which response value to display.
    resultKey: string;
    // Define the required input fields.
    fields: CalculationField[];
// Close this block.
}

// Define the settings for all calculation types.
export const calculations: Record<string, CalculationConfig> = {
    // Start the settings for this calculation.
    force: {
        // Set the calculation display name.
        label: "Gravitational Force",
        // Set the API route for this calculation.
        endpoint: "/api/gravity/force",
        // Choose the result value from the API response.
        resultKey: "force",
        // List the inputs for this calculation.
        fields: [
            // Define the mass 1 input and its unit.
            { name: "mass1", label: "Mass 1", unit: "kg" },
            // Define the mass 2 input and its unit.
            { name: "mass2", label: "Mass 2", unit: "kg" },
            // Define the distance input and its unit.
            { name: "distance", label: "Distance", unit: "m" }
        // Finish the input list.
        ]
    // Close this block.
    },

    // Start the settings for this calculation.
    acceleration: {
        // Set the calculation display name.
        label: "Acceleration Due to Gravity",
        // Set the API route for this calculation.
        endpoint: "/api/gravity/acceleration",
        // Choose the result value from the API response.
        resultKey: "acceleration",
        // List the inputs for this calculation.
        fields: [
            // Define the mass input and its unit.
            { name: "mass", label: "Mass", unit: "kg" },
            // Define the radius input and its unit.
            { name: "radius", label: "Radius", unit: "m" }
        // Finish the input list.
        ]
    // Close this block.
    },

    // Start the settings for this calculation.
    escapeVelocity: {
        // Set the calculation display name.
        label: "Escape Velocity",
        // Set the API route for this calculation.
        endpoint: "/api/gravity/escape-velocity",
        // Choose the result value from the API response.
        resultKey: "escape_velocity",
        // List the inputs for this calculation.
        fields: [
            // Define the mass input and its unit.
            { name: "mass", label: "Mass", unit: "kg" },
            // Define the radius input and its unit.
            { name: "radius", label: "Radius", unit: "m" }
        // Finish the input list.
        ]
    // Close this block.
    },

    // Start the settings for this calculation.
    intensity: {
        // Set the calculation display name.
        label: "Gravitational Field Intensity",
        // Set the API route for this calculation.
        endpoint: "/api/gravity/intensity",
        // Choose the result value from the API response.
        resultKey: "gravity_intensity",
        // List the inputs for this calculation.
        fields: [
            // Define the mass input and its unit.
            { name: "mass", label: "Mass", unit: "kg" },
            // Define the radius input and its unit.
            { name: "radius", label: "Radius", unit: "m" }
        // Finish the input list.
        ]
    // Close this block.
    },

    // Start the settings for this calculation.
    density: {
        // Set the calculation display name.
        label: "Average Density",
        // Set the API route for this calculation.
        endpoint: "/api/gravity/density",
        // Choose the result value from the API response.
        resultKey: "density",
        // List the inputs for this calculation.
        fields: [
            // Define the mass input and its unit.
            { name: "mass", label: "Mass", unit: "kg" },
            // Define the radius input and its unit.
            { name: "radius", label: "Radius", unit: "m" }
        // Finish the input list.
        ]
    // Close this block.
    },

    // Start the settings for this calculation.
    potentialEnergy: {
        // Set the calculation display name.
        label: "Gravitational Potential Energy",
        // Set the API route for this calculation.
        endpoint: "/api/gravity/potential-energy",
        // Choose the result value from the API response.
        resultKey: "potential_energy",
        // List the inputs for this calculation.
        fields: [
            // Define the mass 1 input and its unit.
            { name: "mass1", label: "Mass 1", unit: "kg" },
            // Define the mass 2 input and its unit.
            { name: "mass2", label: "Mass 2", unit: "kg" },
            // Define the distance input and its unit.
            { name: "distance", label: "Distance", unit: "m" }
        // Finish the input list.
        ]
    // Close this block.
    },

    // Start the settings for this calculation.
    potentialDifference: {
        // Set the calculation display name.
        label: "Gravitational Potential Difference",
        // Set the API route for this calculation.
        endpoint: "/api/gravity/potential-difference",
        // Choose the result value from the API response.
        resultKey: "potential_difference",
        // List the inputs for this calculation.
        fields: [
            // Define the mass input and its unit.
            { name: "mass", label: "Mass", unit: "kg" },
            // Define the radius input and its unit.
            { name: "radius", label: "Radius", unit: "m" },
            // Define the height input and its unit.
            { name: "height", label: "Height", unit: "m" }
        // Finish the input list.
        ]
    // Close this block.
    },

    // Start the settings for this calculation.
    potentialGradient: {
        // Set the calculation display name.
        label: "Gravitational Potential Gradient",
        // Set the API route for this calculation.
        endpoint: "/api/gravity/potential-gradient",
        // Choose the result value from the API response.
        resultKey: "potential_gradient",
        // List the inputs for this calculation.
        fields: [
            // Define the mass input and its unit.
            { name: "mass", label: "Mass", unit: "kg" },
            // Define the radius input and its unit.
            { name: "radius", label: "Radius", unit: "m" },
            // Define the height input and its unit.
            { name: "height", label: "Height", unit: "m" }
        // Finish the input list.
        ]
    // Close this block.
    },

    // Start the settings for this calculation.
    angularVelocity: {
        // Set the calculation display name.
        label: "Orbital Angular Velocity",
        // Set the API route for this calculation.
        endpoint: "/api/gravity/angular-velocity",
        // Choose the result value from the API response.
        resultKey: "angular_velocity",
        // List the inputs for this calculation.
        fields: [
            // Define the central body mass input and its unit.
            { name: "mass", label: "Central Body Mass", unit: "kg" },
            // Define the orbital radius input and its unit.
            { name: "orbital_radius", label: "Orbital Radius", unit: "m" }
        // Finish the input list.
        ]
    // Close this block.
    }
// Close this block.
};
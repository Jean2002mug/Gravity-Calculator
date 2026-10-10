//import the Router class from the express module and the callPythonGravityService function from the pythonGravityService.js file
import { Router } from "express";
import { callPythonGravityService } from "../services/pythonGravityService.js";
import { saveCalculation } from "../services/calculationHistoryService.js";
 // The file gravityRouter
const router = Router();

// Define request interfaces for type safety
interface ForceRequest {
    mass1: number;
    mass2: number;
    distance: number;
}


interface BodyRequest {
    mass: number;
    radius: number;
}


interface HeightRequest {
    mass: number;
    radius: number;
    height: number;
}


interface AngularVelocityRequest {
    mass: number;
    orbital_radius: number;
}


// Gravitational Force
router.post("/force", async (req, res) => {

    const {
        mass1,
        mass2,
        distance
    } = req.body as ForceRequest;

    try {

        const result = await callPythonGravityService(
            "/gravity/force",
            {
                mass1,
                mass2,
                distance
            }
        );
        if (result.status >= 200 && result.status < 300) {
            await saveCalculation(
                "gravitational_force",
                { mass1, mass2, distance },
                result.data
            );
        }

        res.status(result.status).json(result.data);

    } catch (error) {

        console.error(
            "Error calculating gravitational force:",
            error
        );

        res.status(500).json({
            error: "Failed to communicate with Python gravity service"
        });
    }
});


// Acceleration Due to Gravity
router.post("/acceleration", async (req, res) => {

    const {
        mass,
        radius
    } = req.body as BodyRequest;

    try {

        const result = await callPythonGravityService(
            "/gravity/acceleration",
            {
                mass,
                radius
            }
        );
        if (result.status >= 200 && result.status < 300) {
            await saveCalculation(
                "acceleration_due_to_gravity",
                { mass, radius },
                result.data
            );
        }

        res.status(result.status).json(result.data);

    } catch (error) {

        console.error(
            "Error calculating acceleration:",
            error
        );

        res.status(500).json({
            error: "Failed to communicate with Python gravity service"
        });
    }
});


// Escape Velocity
router.post("/escape-velocity", async (req, res) => {

    const {
        mass,
        radius
    } = req.body as BodyRequest;

    try {

        const result = await callPythonGravityService(
            "/gravity/escape-velocity",
            {
                mass,
                radius
            }
        );

        if (result.status >= 200 && result.status < 300) {
            await saveCalculation(
                "escape_velocity",
                { mass, radius },
                result.data
            );
        }

        res.status(result.status).json(result.data);

    } catch (error) {

        console.error(
            "Error calculating escape velocity:",
            error
        );

        res.status(500).json({
            error: "Failed to communicate with Python gravity service"
        });
    }
});


// Gravitational Field Intensity
router.post("/intensity", async (req, res) => {

    const {
        mass,
        radius
    } = req.body as BodyRequest;

    try {

        const result = await callPythonGravityService(
            "/gravity/gravity-intensity",
            {
                mass,
                radius
            }
        );

        if (result.status >= 200 && result.status < 300) {
            await saveCalculation(
                "gravitational_field_intensity",
                { mass, radius },
                result.data
            );
        }

        res.status(result.status).json(result.data);

    } catch (error) {

        console.error(
            "Error calculating gravity intensity:",
            error
        );

        res.status(500).json({
            error: "Failed to communicate with Python gravity service"
        });
    }
});


// Density
router.post("/density", async (req, res) => {

    const {
        mass,
        radius
    } = req.body as BodyRequest;

    try {

        const result = await callPythonGravityService(
            "/gravity/density",
            {
                mass,
                radius
            }
        );

         if (result.status >= 200 && result.status < 300) {
            await saveCalculation(
                "density",
                { mass, radius },
                result.data
            );
        }


        res.status(result.status).json(result.data);

    } catch (error) {

        console.error(
            "Error calculating density:",
            error
        );

        res.status(500).json({
            error: "Failed to communicate with Python gravity service"
        });
    }
});


// Gravitational Potential Energy
router.post("/potential-energy", async (req, res) => {

    const {
        mass1,
        mass2,
        distance
    } = req.body as ForceRequest;

    try {

        const result = await callPythonGravityService(
            "/gravity/potential-energy",
            {
                mass1,
                mass2,
                distance
            }
        );

         if (result.status >= 200 && result.status < 300) {
            await saveCalculation(
                "potential_energy",
                { mass1,mass2,distance },
                result.data
            );
        }


        res.status(result.status).json(result.data);

    } catch (error) {

        console.error(
            "Error calculating potential energy:",
            error
        );

        res.status(500).json({
            error: "Failed to communicate with Python gravity service"
        });
    }
});


// Gravitational Potential Difference
router.post("/potential-difference", async (req, res) => {

    const {
        mass,
        radius,
        height
    } = req.body as HeightRequest;

    try {

        const result = await callPythonGravityService(
            "/gravity/potential-difference",
            {
                mass,
                radius,
                height
            }
        );
         if (result.status >= 200 && result.status < 300) {
            await saveCalculation(
                "potential_difference",
                { mass, radius, height },
                result.data
            );
        }


        res.status(result.status).json(result.data);

    } catch (error) {

        console.error(
            "Error calculating potential difference:",
            error
        );

        res.status(500).json({
            error: "Failed to communicate with Python gravity service"
        });
    }
});


// Gravitational Potential Gradient
router.post("/potential-gradient", async (req, res) => {

    const {
        mass,
        radius,
        height
    } = req.body as HeightRequest;

    try {

        const result = await callPythonGravityService(
            "/gravity/potential-gradient",
            {
                mass,
                radius,
                height
            }
        );

         if (result.status >= 200 && result.status < 300) {
            await saveCalculation(
                "potential_gradient",
                { mass, radius, height },
                result.data
            );
        }


        res.status(result.status).json(result.data);

    } catch (error) {

        console.error(
            "Error calculating potential gradient:",
            error
        );

        res.status(500).json({
            error: "Failed to communicate with Python gravity service"
        });
    }
});


// Orbital Angular Velocity
router.post("/angular-velocity", async (req, res) => {

    const {
        mass,
        orbital_radius
    } = req.body as AngularVelocityRequest;

    try {

        const result = await callPythonGravityService(
            "/gravity/angular-velocity",
            {
                mass,
                orbital_radius
            }
        );

         if (result.status >= 200 && result.status < 300) {
            await saveCalculation(
                "angular_velocity",
                { mass, orbital_radius},
                result.data
            );
        }

        res.status(result.status).json(result.data);

    } catch (error) {

        console.error(
            "Error calculating angular velocity:",
            error
        );

        res.status(500).json({
            error: "Failed to communicate with Python gravity service"
        });
    }
});


export default router;
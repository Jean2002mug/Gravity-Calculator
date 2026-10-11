import { useState } from "react";

import {
    planetBiographies
} from "../data/planetBiographies";

interface PlanetBiographyPageProps {
    // Allows the biography page to change
    // the main application background.
    onCelestialBodyChange: (bodyName: string) => void;
}

function PlanetBiographyPage({
    onCelestialBodyChange
}: PlanetBiographyPageProps) {
    // Earth appears first when the page opens.
    const [selectedPlanet, setSelectedPlanet] =
        useState("Earth");

    // Find the complete biography for the selected planet.
    const planet =
        planetBiographies.find(
            (planet) =>
                planet.name === selectedPlanet
        ) ?? planetBiographies[2];

    function handlePlanetChange(name: string) {
        // Change the selected biography.
        setSelectedPlanet(name);

        // Change the website background too.
        onCelestialBodyChange(name);
    }

    return (
        <main className="page-content">
            <header className="page-header">
                <p className="hero-label">
                    Explore the Solar System
                </p>

                <h1>Planet Biography</h1>

                <p>
                    Select a planet to learn about its
                    physical properties and characteristics.
                </p>
            </header>

            <section className="panel planet-biography">
                <div className="form-group">
                    <label htmlFor="planet-selection">
                        Planet
                    </label>

                    <select
                        id="planet-selection"
                        value={selectedPlanet}
                        onChange={(event) =>
                            handlePlanetChange(
                                event.target.value
                            )
                        }
                    >
                        {planetBiographies.map((planet) => (
                            <option
                                key={planet.name}
                                value={planet.name}
                            >
                                {planet.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="planet-title">
                    <p>{planet.type}</p>

                    <h2>{planet.name}</h2>
                </div>

                {/* Main description */}
                <p className="planet-summary">
                    {planet.summary}
                </p>

                {/* Important physical information */}
                <div className="planet-stats">
                    <div>
                        <span>Mass</span>
                        <strong>{planet.mass}</strong>
                    </div>

                    <div>
                        <span>Radius</span>
                        <strong>{planet.radius}</strong>
                    </div>

                    <div>
                        <span>Surface Gravity</span>
                        <strong>
                            {planet.surfaceGravity}
                        </strong>
                    </div>

                    <div>
                        <span>Orbital Period</span>
                        <strong>{planet.yearLength}</strong>
                    </div>
                </div>

                <div className="planet-facts">
                    <h3>Key Facts</h3>

                    <ul>
                        {planet.facts.map((fact) => (
                            <li key={fact}>
                                {fact}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}

export default PlanetBiographyPage;
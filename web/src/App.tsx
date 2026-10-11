import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import NavigationMenu from "./components/NavigationMenu";

import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import PlanetBiographyPage from "./pages/PlanetBiographyPage";

import {
    celestialBackgrounds,
    defaultBackground
} from "./config/celestialBackgrounds";

import "./App.css";

function App() {
    // Tells History that another calculation was saved.
    const [historyRefreshKey, setHistoryRefreshKey] =
        useState(0);

    // Earth is the default visual background.
    const [backgroundImage, setBackgroundImage] =
        useState(defaultBackground);

    function refreshHistory() {
        setHistoryRefreshKey(
            (previousValue) => previousValue + 1
        );
    }

    function changeCelestialBackground(
        bodyName: string
    ) {
        // Use the matching planet image.
        // If one is unavailable, fall back to Earth.
        const image =
            celestialBackgrounds[bodyName] ??
            defaultBackground;

        setBackgroundImage(image);
    }

    return (
        <div
            className="app-background"
            style={{
                backgroundImage: `
                    linear-gradient(
                        rgba(0, 0, 0, 0.48),
                        rgba(0, 0, 0, 0.84)
                    ),
                    url("${backgroundImage}")
                `
            }}
        >
            <div className="app">
                {/* Menu appears on every page */}
                <NavigationMenu />

                <Routes>
                    {/* Main calculator */}
                    <Route
                        path="/"
                        element={
                            <HomePage
                                onCalculationComplete={
                                    refreshHistory
                                }
                                onCelestialBodyChange={
                                    changeCelestialBackground
                                }
                            />
                        }
                    />

                    {/* Calculation history */}
                    <Route
                        path="/history"
                        element={
                            <HistoryPage
                                refreshKey={
                                    historyRefreshKey
                                }
                            />
                        }
                    />

                    {/* Planet information */}
                    <Route
                        path="/planets"
                        element={
                            <PlanetBiographyPage
                                onCelestialBodyChange={
                                    changeCelestialBackground
                                }
                            />
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
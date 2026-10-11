import GravityCalculator from "../components/GravityCalculator";

interface HomePageProps {
    // Called when a calculation is successfully completed.
    onCalculationComplete: () => void;

    // Changes the background when a celestial body is selected.
    onCelestialBodyChange: (bodyName: string) => void;
}

function HomePage({
    onCalculationComplete,
    onCelestialBodyChange
}: HomePageProps) {
    return (
        <>
            <header className="hero">
                <div className="brand">
                    {/* Temporary logo.
                        We will replace this with our custom icon. */}
                    <div className="brand-icon">
                        ✦
                        <span>=</span>
                    </div>

                    <div>
                        <p className="hero-label">
                            Gravity and Orbital Physics
                        </p>

                        <h1>Gravity Calculator</h1>
                    </div>
                </div>

                <p className="hero-description">
                    Explore gravity, planetary physics,
                    and orbital calculations using
                    celestial body data.
                </p>
            </header>

            {/* Calculator is now the main focus of the home page */}
            <main className="single-page-content">
                <GravityCalculator
                    onCalculationComplete={onCalculationComplete}
                    onCelestialBodyChange={onCelestialBodyChange}
                />
            </main>
        </>
    );
}

export default HomePage;
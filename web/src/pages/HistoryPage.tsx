import CalculationHistory from "../components/CalculationHistory";

interface HistoryPageProps {
    // Changes whenever a new calculation has been saved.
    refreshKey: number;
}

function HistoryPage({
    refreshKey
}: HistoryPageProps) {
    return (
        <main className="page-content">
            <header className="page-header">
                <p className="hero-label">
                    Saved Calculations
                </p>

                <h1>Calculation History</h1>

                <p>
                    Review calculations previously completed
                    with Gravity Calculator.
                </p>
            </header>

            {/* Reuse the component we already built */}
            <CalculationHistory
                refreshKey={refreshKey}
            />
        </main>
    );
}

export default HistoryPage;
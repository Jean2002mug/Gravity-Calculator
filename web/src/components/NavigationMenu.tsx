import { useState } from "react";
import { Link } from "react-router-dom";

function NavigationMenu() {
    // Controls whether the dropdown menu is open.
    const [menuOpen, setMenuOpen] = useState(false);

    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <nav className="navigation">
            {/* Button in the top right corner */}
            <button
                className="menu-button"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Open navigation menu"
            >
                ☰
            </button>

            {/* Only show the menu when menuOpen is true */}
            {menuOpen && (
                <div className="menu-dropdown">
                    <Link to="/" onClick={closeMenu}>
                        Calculator
                    </Link>

                    <Link to="/history" onClick={closeMenu}>
                        History
                    </Link>

                    <Link to="/planets" onClick={closeMenu}>
                        Planet Biography
                    </Link>
                </div>
            )}
        </nav>
    );
}

export default NavigationMenu;
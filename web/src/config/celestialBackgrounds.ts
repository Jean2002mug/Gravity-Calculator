// Connects each celestial body name to its background image.
//
// Earth is also our fallback background when:
// 1. Nothing has been selected.
// 2. A custom body does not have its own image.

export const celestialBackgrounds: Record<string, string> = {
    Earth: "/backgrounds/earth.webp",
    Moon: "/backgrounds/moon.webp",
    Mercury: "/backgrounds/mercury.webp",
    Venus: "/backgrounds/venus.webp",
    Mars: "/backgrounds/mars.webp",
    Jupiter: "/backgrounds/jupiter.webp",
    Saturn: "/backgrounds/saturn.webp",
    Uranus: "/backgrounds/uranus.webp",
    Neptune: "/backgrounds/neptune.webp"
};


// Default visual background.
// This does NOT select Earth in the calculator.
export const defaultBackground =
    celestialBackgrounds.Earth;
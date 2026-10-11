// Information displayed on the Planet Biography page.

export interface PlanetBiography {
    name: string;
    type: string;
    mass: string;
    radius: string;
    surfaceGravity: string;
    yearLength: string;
    summary: string;
    facts: string[];
}

export const planetBiographies: PlanetBiography[] = [
    {
        name: "Mercury",
        type: "Terrestrial Planet",
        mass: "3.3011 × 10²³ kg",
        radius: "2,439.7 km",
        surfaceGravity: "3.7 m/s²",
        yearLength: "About 88 Earth days",

        summary:
            "Mercury is the smallest planet in the Solar System and the closest planet to the Sun. Its heavily cratered surface resembles the Moon and records billions of years of impacts.",

        facts: [
            "Mercury has almost no substantial atmosphere.",
            "It experiences extreme temperature differences between day and night.",
            "Despite being closest to the Sun, Mercury is not the hottest planet."
        ]
    },

    {
        name: "Venus",
        type: "Terrestrial Planet",
        mass: "4.8675 × 10²⁴ kg",
        radius: "6,051.8 km",
        surfaceGravity: "8.87 m/s²",
        yearLength: "About 224.7 Earth days",

        summary:
            "Venus is similar in size to Earth but has an extremely dense carbon dioxide atmosphere. Its powerful greenhouse effect makes its surface hotter than that of any other planet.",

        facts: [
            "Venus rotates very slowly.",
            "Its rotation is opposite to that of most planets.",
            "Its surface is hidden beneath thick clouds."
        ]
    },

    {
        name: "Earth",
        type: "Terrestrial Planet",
        mass: "5.972 × 10²⁴ kg",
        radius: "6,371 km",
        surfaceGravity: "9.81 m/s²",
        yearLength: "About 365.25 days",

        summary:
            "Earth is the third planet from the Sun and the only world currently known to support life. Liquid water covers most of its surface and its atmosphere helps maintain conditions suitable for complex ecosystems.",

        facts: [
            "Earth has one natural satellite, the Moon.",
            "Its magnetic field helps protect the surface from charged solar particles.",
            "Earth's active geology continually reshapes its surface."
        ]
    },

    {
        name: "Mars",
        type: "Terrestrial Planet",
        mass: "6.4171 × 10²³ kg",
        radius: "3,389.5 km",
        surfaceGravity: "3.71 m/s²",
        yearLength: "About 687 Earth days",

        summary:
            "Mars is a cold desert world known for its iron rich red surface. Evidence from spacecraft shows that liquid water existed on its surface in the distant past.",

        facts: [
            "Mars has two small moons: Phobos and Deimos.",
            "Olympus Mons is an enormous shield volcano on Mars.",
            "Valles Marineris is one of the largest canyon systems in the Solar System."
        ]
    },

    {
        name: "Jupiter",
        type: "Gas Giant",
        mass: "1.8982 × 10²⁷ kg",
        radius: "69,911 km",
        surfaceGravity: "24.79 m/s²",
        yearLength: "About 11.86 Earth years",

        summary:
            "Jupiter is the largest planet in the Solar System. It is composed mainly of hydrogen and helium and possesses an enormous atmosphere filled with powerful storms.",

        facts: [
            "The Great Red Spot is a giant long lived storm.",
            "Jupiter has an extremely strong magnetic field.",
            "Its major moons include Io, Europa, Ganymede and Callisto."
        ]
    },

    {
        name: "Saturn",
        type: "Gas Giant",
        mass: "5.6834 × 10²⁶ kg",
        radius: "58,232 km",
        surfaceGravity: "10.44 m/s²",
        yearLength: "About 29.45 Earth years",

        summary:
            "Saturn is a gas giant best known for its spectacular ring system. The rings consist primarily of countless pieces of ice and rocky material orbiting the planet.",

        facts: [
            "Saturn is the second largest planet.",
            "Its average density is lower than that of water.",
            "Titan is one of Saturn's most scientifically interesting moons."
        ]
    },

    {
        name: "Uranus",
        type: "Ice Giant",
        mass: "8.681 × 10²⁵ kg",
        radius: "25,362 km",
        surfaceGravity: "8.69 m/s²",
        yearLength: "About 84 Earth years",

        summary:
            "Uranus is an ice giant with a blue green appearance caused mainly by methane in its atmosphere. Its unusual rotation makes the planet appear to orbit the Sun almost on its side.",

        facts: [
            "Uranus has a faint ring system.",
            "Its axial tilt is approximately 98 degrees.",
            "Its atmosphere contains hydrogen, helium and methane."
        ]
    },

    {
        name: "Neptune",
        type: "Ice Giant",
        mass: "1.02413 × 10²⁶ kg",
        radius: "24,622 km",
        surfaceGravity: "11.15 m/s²",
        yearLength: "About 164.8 Earth years",

        summary:
            "Neptune is the most distant major planet from the Sun. It is a cold blue ice giant with extremely fast atmospheric winds and large storm systems.",

        facts: [
            "Neptune was discovered through mathematical predictions before direct observation.",
            "Its largest moon is Triton.",
            "Some of the fastest planetary winds measured in the Solar System occur on Neptune."
        ]
    }
];
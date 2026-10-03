from app.models import CelestialBody
from app.gravity import  *

def main():
    earth = CelestialBody(mass=5.972e24, radius=6.371e6)  # Mass in kg, radius in meters
    moon = CelestialBody(mass=7.348e22, radius=1.737e6)   # Mass in kg, radius in meters

    distance =  384_400_000 # Distance between the centers of the two bodies

    force = gravitational_force(earth, moon, distance)
    print(f"Gravitational Force between Earth and Moon: {force} N")

    earth_gravity = acc_due_gravity(earth)
    print(f"Acceleration due to gravity on Earth: {earth_gravity} m/s^2")
    print()
    print(f"Gravitational Intensity on Earth: {gravity_intensity(earth)} N/kg")
    print()
    moon_gravity = acc_due_gravity(moon)
    print(f"Acceleration due to gravity on Moon: {moon_gravity} m/s^2")
    print()
    print(f"Gravitational Intensity on Moon: {gravity_intensity(moon)} N/kg")
    print()
    print(f"Escape velocity from Earth: {escape_velocity(earth)} m/s")
    print()
    print(f"Escape velocity from Moon: {escape_velocity(moon)} m/s")
    print()
    print(f"Gravitational Potential Energy between Earth and Moon: {potential_energy(earth, moon, distance)} J")
    print()
    height=1000 # height above the surface of the planet in meters
    print(f" Potential difference between the surface and {height} m above: {round(potential_difference(earth,height),2)} J/kg")
    print()
    print(f"Gravitational potential gradient at {height} m above the surface: {round(potential_gradient(moon,height),2)} N/kg")
    print()
    print(f"Gravitational potential gradient at {height} m above the surface: {round(potential_gradient(earth,height),2)} N/kg")
    print()
    print(f"Density of Earth: {density_4_planet(earth)} kg/m^3")
    print()
    print(f"Density of Moon: {density_4_planet(moon)} kg/m^3" )
    print()
    print(f"Angular velocity of Earth: {angular_velocity(earth,earth.radius)} rad/s")
    print()
    print(f"Angular velocity of Moon: {angular_velocity(moon,moon.radius)} rad/s")
if __name__ == "__main__":
    main()

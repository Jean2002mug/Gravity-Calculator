# Author : Jean Mugabe
# This script is used to calculate the gravity and its related attributes like gravitational force, potential energy, escape velocity, etc.

import math # importing the math module to use mathematical functions like sqrt, pi, etc.
from app.models import CelestialBody # importing the CelestialBody class from the main module to represent the attributes of a celestial body.
G = 6.67430e-11 # This is the universal gravitational constant, which is used in the calculation of gravitational force and other related attributes.

def particle_dimension(p: CelestialBody) -> None: 
    '''This will print the mass and the distance of
    the particle from the earth or other objects'''
   
    print('%gkg\n%gm'  % (p.mass, p.radius))

# The function gravitational_force calculates the gravitational force between two particles based on their masses and the distance between them using Newton's law of universal gravitation.
def gravitational_force(p1: CelestialBody, p2: CelestialBody, R: float) -> float:
    validate_positive(R, "distance")
    gravity_force=(G*p1.mass*p2.mass)/R**2
    return gravity_force
    
# The function gravity_intensity calculates the gravitational intensity at a point due to a particle.
def gravity_intensity(p: CelestialBody) -> float:
    G_intensity=(G*p.mass)/(p.radius**2)
    return G_intensity
# The function acc_due_gravity calculates the acceleration due to gravity at a point due to a particle.
def acc_due_gravity(p: CelestialBody) -> float:
    g_m2=(G*p.mass)/(p.radius**2)
    
    return g_m2
# The function escape_velocity calculates the escape velocity from a particle based on its mass and distance.
def escape_velocity(p: CelestialBody) -> float:
    U_e=math.sqrt(2* acc_due_gravity(p)*p.radius)
    return U_e
# The function potential_energy calculates the gravitational potential energy between two particles based on their masses and the distance between them.
def potential_energy(p1: CelestialBody, p2: CelestialBody, R: float) -> float:
    validate_positive(R, "distance")
    P=-(G*p1.mass*p2.mass/R)
    return P
def validate_positive(value: float, name: str, allow_zero: bool = False) -> None:
    if not allow_zero and value <= 0:
        raise ValueError(f"{name} must be greater than 0")
    if allow_zero and value < 0:
        raise ValueError(f"{name} must be greater than or equal to 0")
# The function potential_difference calculates the potential difference between the Planet and the height above the planet's surface based on their masses and distances.
def potential_difference(p1: CelestialBody, height: float) -> float:
    validate_positive(height, "height", allow_zero=True)
    R = p1.radius
    h = height

    V = G * p1.mass * ((1 / R) - (1 / (R + h)))
    return V

# The function potential_gradient calculates the gravitational potential gradient between two particles based on their masses and distances.
def potential_gradient(p1: CelestialBody, height: float) -> float:
    validate_positive(height, "height")
    P_G = potential_difference(p1, height) / height
    return P_G

# The function density_4_planet calculates the density of a planet based on its mass and radius using the formula for density.
def density_4_planet(p: CelestialBody) -> float:
    volume = (4 / 3) * math.pi * (p.radius ** 3)
    density = p.mass / volume
    return density

# The function angular_velocity calculates the angular velocity of a particle based on its acceleration due to gravity and radius.
def angular_velocity(p: CelestialBody, R: float) -> float:
    validate_positive(R, "distance")
    w = math.sqrt((G * p.mass) / (R ** 3))
    return w


#Author: Jean Mugabe

from dataclasses import dataclass

# The class CelestialBody is defined to represent the attributes of a celestial body, which include the masses of the particles and the distance/radius between them.
@dataclass
class CelestialBody:
    '''The attrubutes of gravity are
    masses of the particles and distance/radius'''
    mass: float
    radius: float

    def __post_init__(self) -> None:
        if self.mass <=0:
            raise ValueError("mass must be greater than 0")
        elif self.radius <=0:
            raise ValueError("radius must be greater than 0")

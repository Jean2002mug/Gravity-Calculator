from pydantic import BaseModel, Field 

class ForceRequest(BaseModel):
    mass1: float = Field(..., gt=0)
    mass2:float = Field(..., gt=0)
    distance:float = Field(..., gt=0)

class ForceResponse(BaseModel):
    force: float
    unit: str = "N"

class BodyRequest(BaseModel):
    mass: float = Field(..., gt=0)
    radius: float = Field(..., gt=0)

class AccelerationResponse(BaseModel):
    acceleration: float
    unit: str = "m/s²"

class EscapeVelocityResponse(BaseModel):
    escape_velocity:float
    unit: str = "m/s"

class GravityIntensityResponse(BaseModel):
    gravity_intensity: float
    unit: str = "N/kg"

class DensityResponse(BaseModel):
    density: float
    unit: str = "kg/m³"

class PotentialEnergyResponse(BaseModel):
    potential_energy: float
    unit: str = "J"

class PotentialDifferenceRequest(BaseModel):
    mass: float = Field(..., gt=0)
    radius: float = Field(..., gt=0)
    height: float = Field(..., ge=0)

class PotentialDifferenceResponse(BaseModel):
    potential_difference: float
    unit: str = "J/kg"

class PotentialGradientRequest(BaseModel):
    mass: float = Field(..., gt=0)
    radius: float = Field(..., gt=0)
    height: float = Field(..., gt=0)

class PotentialGradientResponse(BaseModel):
    potential_gradient: float
    unit: str = "N/kg"

class AngularVelocityRequest(BaseModel):
    mass: float = Field(..., gt=0)
    orbital_radius: float = Field(..., gt=0)
class AngularVelocityResponse(BaseModel):
    angular_velocity: float
    unit: str = "rad/s"
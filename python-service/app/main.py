from fastapi import FastAPI  # type: ignore[reportMissingImports]
from app.gravity import gravitational_force, acc_due_gravity, escape_velocity, gravity_intensity, density_4_planet, potential_energy, potential_difference, potential_gradient, angular_velocity
from app.schemas import ForceRequest, ForceResponse, BodyRequest, AccelerationResponse, EscapeVelocityResponse, GravityIntensityResponse, DensityResponse, PotentialEnergyResponse, PotentialDifferenceRequest, PotentialDifferenceResponse, PotentialGradientRequest, PotentialGradientResponse,AngularVelocityRequest,AngularVelocityResponse
from app.models import CelestialBody

app = FastAPI()

@app.post("/gravity/force", response_model=ForceResponse)
def calculate_gravitational_force(request: ForceRequest) -> ForceResponse:
    force= gravitational_force(request.mass1, request.mass2, request.distance)
    return ForceResponse(force=force)

@app.post("/gravity/acceleration", response_model=AccelerationResponse)
def calculate_acceleration(request: BodyRequest) -> AccelerationResponse:
    body = CelestialBody(mass=request.mass, radius=request.radius)
    acceleration = acc_due_gravity(body)
    return AccelerationResponse(acceleration=acceleration)

@app.post("/gravity/escape-velocity", response_model=EscapeVelocityResponse)
def calculate_escape_velocity(request: BodyRequest) -> EscapeVelocityResponse:
    body= CelestialBody(mass=request.mass, radius=request.radius)
    escape_velocity_value = escape_velocity(body)
    return EscapeVelocityResponse(escape_velocity=escape_velocity_value)

@app.post("/gravity/gravity-intensity", response_model=GravityIntensityResponse)
def calculate_gravity_intensity(request: BodyRequest) -> GravityIntensityResponse:
    body = CelestialBody(mass=request.mass, radius=request.radius)
    gravity_intensity_value = gravity_intensity(body)
    return GravityIntensityResponse(gravity_intensity=gravity_intensity_value)

@app.post("/gravity/density", response_model=DensityResponse)
def calculate_density(request: BodyRequest) -> DensityResponse:
    body = CelestialBody(mass=request.mass, radius=request.radius)
    density_value = density_4_planet(body)
    return DensityResponse(density=density_value)

@app.post("/gravity/potential-energy", response_model=PotentialEnergyResponse)
def calculate_potential_energy(request: ForceRequest) -> PotentialEnergyResponse:
    potential_energy_value = potential_energy(request.mass1, request.mass2, request.distance)
    return PotentialEnergyResponse(potential_energy=potential_energy_value)

@app.post("/gravity/potential-difference", response_model=PotentialDifferenceResponse)
def calculate_potential_difference(request: PotentialDifferenceRequest) -> PotentialDifferenceResponse:
    body = CelestialBody(mass=request.mass, radius=request.radius)
    potential_difference_value = potential_difference(body, request.height)
    return PotentialDifferenceResponse(potential_difference=potential_difference_value)

@app.post("/gravity/potential-gradient", response_model=PotentialGradientResponse)
def calculate_potential_gradient(request: PotentialGradientRequest) -> PotentialGradientResponse:
    body = CelestialBody(mass=request.mass, radius=request.radius)
    potential_gradient_value = potential_gradient(body, request.height)
    return PotentialGradientResponse(potential_gradient=potential_gradient_value)

@app.post("/gravity/angular-velocity", response_model=AngularVelocityResponse)
def calculate_angular_velocity(request: AngularVelocityRequest) -> AngularVelocityResponse:
    body = CelestialBody(mass=request.mass, radius=request.orbital_radius)
    angular_velocity_value = angular_velocity(body.mass, body.radius)
    return AngularVelocityResponse(angular_velocity=angular_velocity_value)
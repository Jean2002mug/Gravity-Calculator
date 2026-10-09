# Gravity Calculator

A gravity and orbital physics calculator built with Python.

This project originally started as a Python script for calculating gravitational quantities between celestial bodies. I am currently expanding it into a full stack application that will eventually include a web application, mobile application, TypeScript and Node.js backend, and PostgreSQL database.

The current version provides a Python REST API built with FastAPI.

## Current Features

The Python API currently supports:

1. Gravitational force
2. Acceleration due to gravity
3. Escape velocity
4. Gravitational field intensity
5. Average density of a celestial body
6. Gravitational potential energy
7. Gravitational potential difference
8. Gravitational potential gradient
9. Orbital angular velocity

## Technologies Currently Used

| Technology | Purpose |
| --- | --- |
| Python | Physics calculations and application logic |
| FastAPI | REST API |
| Pydantic | Request and response validation |
| Dataclasses | Celestial body data model |
| Uvicorn | Local API server |

## Project Structure

```text
Gravity-Calculator/
│
├── python-service/
│   │
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── gravity.py
│   │   ├── models.py
│   │   └── schemas.py
│   │
│   └── requirements.txt
│
├── backend/
├── mobile/
├── web/
│
└── README.md

Python Files
models.py
Contains the CelestialBody dataclass and validation for celestial body properties such as mass and radius.
gravity.py
Contains the physics calculation functions and calculation level validation.
schemas.py
Contains Pydantic request and response models used by the API.
main.py
Contains the FastAPI application and API endpoints.
API Endpoints
Method	Endpoint	Calculation
POST	/gravity/force	Gravitational force
POST	/gravity/acceleration	Acceleration due to gravity
POST	/gravity/escape_velocity	Escape velocity
POST	/gravity/gravity_intensity	Gravitational field intensity
POST	/gravity/density	Average density
POST	/gravity/potential_energy	Gravitational potential energy
POST	/gravity/potential_difference	Gravitational potential difference
POST	/gravity/potential_gradient	Gravitational potential gradient
POST	/gravity/angular_velocity	Orbital angular velocity


Example
Gravitational force request:
{
  "mass1": 5.972e24,
  "mass2": 7.342e22,
  "distance": 384400000
}

Example response:
{
  "force": 1.981107290729252e20,
  "unit": "N"
}

Input Validation
API requests are validated with Pydantic before calculations are performed.
For example, mass, radius, and distance values that must be positive are rejected when they are less than or equal to zero.
The physics calculation layer also contains its own validation so that the functions can safely be reused outside the FastAPI application.
Running the Python API
Navigate to the Python service:
cd python-service

Install the required packages:
python -m pip install -r requirements.txt

Start the FastAPI development server:
python -m uvicorn app.main:app --reload

The API will run at:
http://127.0.0.1:8000

Interactive FastAPI documentation is available at:
http://127.0.0.1:8000/docs

Testing
The current API endpoints have been manually tested through FastAPI's interactive documentation.
Tests include valid physics inputs as well as invalid inputs to verify request validation.
Automated unit and API tests will be added as the project develops.
Planned Architecture
The project is being expanded into a full stack application.
Web Application
React / TypeScript
        |
        v
Node.js / TypeScript Backend
        |
        +--------------------+
        |                    |
        v                    v
PostgreSQL            Python FastAPI
Database              Physics Service

A React Native mobile application is also planned and will communicate with the same backend.
Planned Technologies
Technology	Planned Role
TypeScript	Shared application development
Node.js	Main backend service
PostgreSQL	Persistent application data
React	Web interface
React Native	Mobile application
Python	Scientific calculation service
FastAPI	Python service API


Development Roadmap
Current stage:
Python physics engine
        ✓

Python data models and validation
        ✓

FastAPI service
        ✓

Nine calculation endpoints
        ✓

API validation and manual testing
        ✓

Next stages:
Node.js + TypeScript backend
        ↓
Connect Node.js to Python FastAPI
        ↓
PostgreSQL integration
        ↓
Web application
        ↓
Mobile application
        ↓
Advanced orbital and gravitational calculations

Future Physics Features
Future versions may include more advanced calculations and simulations such as orbital velocity, orbital period, satellite altitude calculations, geostationary orbit calculations, two body simulations, N body simulations, orbital trajectories, Kepler's laws, and Lagrange point calculations.
Author
Jean Mugabe

There are two things I especially like about this version for your portfolio.

First, it **does not claim that TypeScript, Node.js, PostgreSQL, React, or React Native are already implemented**. They are explicitly identified as planned work.

Second, it shows that the project is no longer just a small formula script. It now demonstrates Python structure, dataclasses, type hints, validation, Pydantic, FastAPI, REST APIs, request and response schemas, and modular application design.

I would commit this README together with the completed Python API before we touch Node.js. A sensible commit message would be:

```text
Complete Python gravity API and update documentation

Then the next commit can cleanly begin the Node.js + TypeScript backend phase.
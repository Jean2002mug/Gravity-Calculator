# Gravity Calculator

Gravity Calculator is a full stack gravity and orbital physics project built with Python, TypeScript, Node.js, FastAPI, and PostgreSQL.

The project originally started in 2023 as a Python program for calculating gravitational quantities between celestial bodies. It is now being expanded into a web and mobile application with a modular backend architecture.

Python is responsible for the scientific and physics calculations, while the Node.js and TypeScript backend acts as the main application API. PostgreSQL stores celestial body data and calculation history.

## Current Features

The application currently supports nine physics calculations:

1. Gravitational force
2. Acceleration due to gravity
3. Escape velocity
4. Gravitational field intensity
5. Average density of a celestial body
6. Gravitational potential energy
7. Gravitational potential difference
8. Gravitational potential gradient
9. Orbital angular velocity

The backend also supports:

* Storing celestial bodies in PostgreSQL
* Retrieving all celestial bodies
* Retrieving a celestial body by ID
* Creating custom celestial bodies
* Automatically storing successful calculations
* Retrieving calculation history
* Input validation
* Communication between Node.js and the Python physics service

## Technologies

| Technology | Purpose |
| --- | --- |
| Python | Physics and scientific calculations |
| FastAPI | Python REST API |
| Pydantic | Python request and response validation |
| Dataclasses | Celestial body data model |
| Uvicorn | Python development server |
| TypeScript | Main backend development |
| Node.js | Main application backend |
| Express | Node.js REST API |
| PostgreSQL | Persistent application data |
| `pg` | PostgreSQL connection from Node.js |
| dotenv | Environment variable management |

## Project Architecture

```text
                     Web Application
                    React / TypeScript
                           |
                           v
                  Node.js / TypeScript
                     Express API
                    /           \
                   /             \
                  v               v
           PostgreSQL        Python FastAPI
              Database       Physics Service
```

A React Native mobile application is also planned and will communicate with the same Node.js backend.

## Project Structure

```text
Gravity-Calculator/
│
├── backend/
│   │
│   ├── src/
│   │   ├── database/
│   │   │   └── db.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── gravityRoutes.ts
│   │   │   ├── celestialBodyRoutes.ts
│   │   │   └── calculationHistoryRoutes.ts
│   │   │
│   │   ├── services/
│   │   │   ├── pythonGravityService.ts
│   │   │   └── calculationHistoryService.ts
│   │   │
│   │   └── server.ts
│   │
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
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
├── mobile/
├── web/
│
├── .gitignore
└── README.md
```

## Python Physics Service

### `models.py`

Contains the `CelestialBody` dataclass and validation for properties such as mass and radius.

### `gravity.py`

Contains the physics calculation functions and calculation level validation.

### `schemas.py`

Contains the Pydantic request and response models used by FastAPI.

### `main.py`

Contains the FastAPI application and physics API endpoints.

## Python API Endpoints

| Method | Endpoint | Calculation |
| --- | --- | --- |
| POST | `/gravity/force` | Gravitational force |
| POST | `/gravity/acceleration` | Acceleration due to gravity |
| POST | `/gravity/escape-velocity` | Escape velocity |
| POST | `/gravity/gravity-intensity` | Gravitational field intensity |
| POST | `/gravity/density` | Average density |
| POST | `/gravity/potential-energy` | Gravitational potential energy |
| POST | `/gravity/potential-difference` | Gravitational potential difference |
| POST | `/gravity/potential-gradient` | Gravitational potential gradient |
| POST | `/gravity/angular-velocity` | Orbital angular velocity |

## Node.js API

The Node.js and TypeScript backend communicates with the Python FastAPI service and acts as the main API for future web and mobile clients.

### Gravity Endpoints

| Method | Endpoint |
| --- | --- |
| POST | `/api/gravity/force` |
| POST | `/api/gravity/acceleration` |
| POST | `/api/gravity/escape-velocity` |
| POST | `/api/gravity/intensity` |
| POST | `/api/gravity/density` |
| POST | `/api/gravity/potential-energy` |
| POST | `/api/gravity/potential-difference` |
| POST | `/api/gravity/potential-gradient` |
| POST | `/api/gravity/angular-velocity` |

### Celestial Body Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/celestial-bodies` | Retrieve all celestial bodies |
| GET | `/api/celestial-bodies/:id` | Retrieve one celestial body |
| POST | `/api/celestial-bodies` | Create a celestial body |

### Calculation History

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/calculations/history` | Retrieve calculation history |

### Database Health Check

| Method | Endpoint |
| --- | --- |
| GET | `/api/health/db` |

## PostgreSQL Database

The application currently uses two PostgreSQL tables.

### `celestial_bodies`

Stores celestial body information such as:

* Name
* Mass
* Radius
* Creation time

Example bodies currently used during development include Earth, Moon, and Mars.

### `calculation_history`

Stores successful physics calculations.

Each record contains:

* Calculation type
* Input data
* Result data
* Creation time

The input and result values are stored using PostgreSQL `JSONB`, allowing different physics calculations to store different data structures.

## Example Calculation

Gravitational force request:

```json
{
  "mass1": 5.972e24,
  "mass2": 7.342e22,
  "distance": 384400000
}
```

Example response:

```json
{
  "force": 1.9804922390990566e20,
  "unit": "N"
}
```

## Input Validation

FastAPI requests are validated using Pydantic before physics calculations are performed.

Values such as mass, radius, distance, and orbital radius must satisfy the requirements of their respective calculations.

For example, values that must be positive are rejected when they are less than or equal to zero.

The Python physics layer also performs its own validation so the calculation functions can safely be reused outside the FastAPI application.

The PostgreSQL database also contains constraints for stored values such as mass and radius.

## Running the Python Service

Navigate to the Python service:

```bash
cd python-service
```

Install the required packages:

```bash
python -m pip install -r requirements.txt
```

Start FastAPI:

```bash
python -m uvicorn app.main:app --reload
```

The Python API runs at:

```text
http://127.0.0.1:8000
```

FastAPI documentation is available at:

```text
http://127.0.0.1:8000/docs
```

## Running the Node.js Backend

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file based on `.env.example`.

Example:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@127.0.0.1:5432/gravity_calculator
PYTHON_SERVICE_URL=http://127.0.0.1:8000
PORT=3000
```

Never commit the real `.env` file.

Start the backend:

```bash
npm run dev
```

The Node.js API runs at:

```text
http://localhost:3000
```

## Current Data Flow

A physics calculation currently follows this flow:

```text
Client Request
      |
      v
Node.js / TypeScript
      |
      v
Python FastAPI
      |
      v
Physics Calculation
      |
      v
Node.js
      |
      +------> Return result to client
      |
      v
PostgreSQL
Calculation History
```

## Testing

The nine Python physics endpoints have been manually tested using FastAPI documentation.

The Node.js proxy endpoints have also been tested directly.

Testing currently includes:

* Valid physics calculations
* Invalid physics inputs
* Python request validation
* Node.js to Python communication
* PostgreSQL connectivity
* Celestial body creation and retrieval
* Retrieval by celestial body ID
* Calculation history storage
* Calculation history retrieval

Automated unit and integration tests are planned for a future stage.

## Development Progress

Completed:

```text
Python physics engine
        ✓

Python data models and validation
        ✓

FastAPI physics service
        ✓

Nine physics endpoints
        ✓

Node.js + TypeScript backend
        ✓

Node.js to Python communication
        ✓

PostgreSQL integration
        ✓

Celestial body storage
        ✓

Calculation history storage
        ✓

Calculation history API
        ✓
```

Current stage:

```text
Web application
        ↓
React + TypeScript interface
```

Future stages:

```text
Web interface
        ↓
Mobile application
        ↓
Additional backend features
        ↓
Automated testing
        ↓
Advanced physics calculations
        ↓
AI powered physics explanations
```

## Future AI Features

A future version of Gravity Calculator may include an AI assisted learning feature.

The AI layer will not replace the Python physics engine. Python will remain responsible for numerical calculations.

The AI feature may be used to:

* Explain physics formulas
* Define physics concepts
* Explain calculation results
* Explain the steps used to solve a problem
* Answer questions about gravitational and orbital physics

This keeps the numerical calculations deterministic while allowing the application to provide educational explanations.

## Future Physics Features

Future versions may include:

* Orbital velocity
* Orbital period
* Satellite altitude calculations
* Geostationary orbit calculations
* Kepler's laws
* Two body simulations
* N body simulations
* Orbital trajectories
* Lagrange point calculations

## Planned Frontend Technologies

| Technology | Role |
| --- | --- |
| React | Web interface |
| TypeScript | Web application development |
| React Native | Mobile application |
| Expo | Mobile development |

## Author

Jean Mugabe
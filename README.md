# Gravity Calculator

Gravity Calculator is a full stack gravity and orbital physics application built with Python, TypeScript, Node.js, React, FastAPI, and PostgreSQL.

The project originally started in 2023 as a Python program for calculating gravitational quantities between celestial bodies. It has since grown into a deployed full stack web application with a modular architecture separating scientific calculations, application logic, persistent data, and the user interface.

The production application is available at:

**https://gravitykalkilateri2023.com**

Python is responsible for the scientific calculations. Node.js and TypeScript provide the main application API. PostgreSQL stores celestial body information and calculation history. React and TypeScript provide the web interface.

---

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

Additional application features include:

* Celestial body selection
* Automatic mass and radius population
* Scientific number formatting
* Dynamic celestial body backgrounds
* Calculation history
* Planet biography page
* PostgreSQL calculation storage
* Production API communication
* Automatic retry handling for temporarily unavailable cloud services
* Responsive web interface
* Client side navigation with React Router
* Custom production domain
* Input validation in both the API and physics layer

---

## Celestial Bodies

The application currently includes:

* Mercury
* Venus
* Earth
* Moon
* Mars
* Jupiter
* Saturn
* Uranus
* Neptune

Selecting a celestial body automatically populates relevant physical values such as mass and radius.

The selected celestial body can also change the background image of the application.

Earth is used as the default visual background when no celestial body has been selected.

---

## Planet Biography

The Planet Biography section provides information about the major planets of the Solar System.

Users can select a planet and view information such as:

* Planet type
* Mass
* Radius
* Surface gravity
* Orbital period
* General description
* Key facts

The page also changes its background to match the selected planet.

---

## Calculation History

Successful calculations are automatically stored in PostgreSQL.

The History page displays recent calculations including:

* Calculation type
* Input values
* Result
* Unit
* Date and time

Large and very small values are formatted using scientific notation for readability.

---

## Technologies

| Technology | Purpose |
| --- | --- |
| Python | Physics and scientific calculations |
| FastAPI | Python REST API |
| Pydantic | Request and response validation |
| Dataclasses | Celestial body data model |
| Uvicorn | Python API server |
| TypeScript | Backend and frontend development |
| Node.js | Main application backend |
| Express | Node.js REST API |
| React | Web application interface |
| React Router | Client side navigation |
| PostgreSQL | Persistent application data |
| `pg` | PostgreSQL connection from Node.js |
| dotenv | Environment variable management |
| Vite | React development and production build |
| Render | Production hosting |
| pgAdmin | PostgreSQL database administration |

---

## Production Architecture

```text
gravitykalkilateri2023.com
            |
            v
    React + TypeScript
       Web Application
            |
            v
    Node.js + Express
      TypeScript API
       /          \
      /            \
     v              v
PostgreSQL      Python FastAPI
 Database       Physics Service
                    |
                    v
              Physics Engine
```

The frontend, Node.js API, Python FastAPI service, and PostgreSQL database are deployed separately.

---

## Application Data Flow

A typical calculation follows this flow:

```text
User enters or selects values
            |
            v
React Web Application
            |
            v
Node.js / TypeScript API
            |
            v
Python FastAPI
            |
            v
Physics Calculation
            |
            v
Node.js
       /           \
      v             v
Return result    PostgreSQL
to React         history storage
      |
      v
Display result
```

The Python service remains the source of truth for physics calculations.

---

## Project Structure

```text
Gravity-Calculator/
│
├── backend/
│   │
│   ├── src/
│   │   ├── databases/
│   │   │   ├── db.ts
│   │   │   └── schema.sql
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
├── web/
│   │
│   ├── public/
│   │   └── backgrounds/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── GravityCalculator.tsx
│   │   │   ├── CalculationHistory.tsx
│   │   │   ├── NavigationMenu.tsx
│   │   │   └── ScientificNumber.tsx
│   │   │
│   │   ├── config/
│   │   │   ├── api.ts
│   │   │   ├── calculations.ts
│   │   │   └── celestialBackgrounds.ts
│   │   │
│   │   ├── data/
│   │   │   └── planetBiographies.ts
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── HistoryPage.tsx
│   │   │   └── PlanetBiographyPage.tsx
│   │   │
│   │   ├── utils/
│   │   │   └── apiFetch.ts
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── .env.example
│   └── package.json
│
├── mobile/
├── .gitignore
└── README.md
```

---

## Python Physics Service

### `models.py`

Contains the `CelestialBody` dataclass and validation for celestial body properties such as mass and radius.

### `gravity.py`

Contains the gravitational and orbital physics functions.

The calculations are kept separate from the web API so they can be reused independently.

### `schemas.py`

Contains Pydantic request and response models used by FastAPI.

### `main.py`

Contains the FastAPI application and physics API endpoints.

---

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

---

## Node.js API

The Node.js and TypeScript service acts as the main backend for the web application.

It communicates with:

* Python FastAPI for physics calculations
* PostgreSQL for persistent data

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
| GET | `/api/calculations/history` | Retrieve recent calculation history |

### Database Health Check

| Method | Endpoint |
| --- | --- |
| GET | `/api/health/db` |

---

## PostgreSQL Database

The application currently uses two primary tables.

### `celestial_bodies`

Stores celestial body information including:

* Name
* Mass
* Radius
* Creation time

### `calculation_history`

Stores successful physics calculations.

Each record contains:

* Calculation type
* Input data
* Result data
* Creation time

Input and result values are stored using PostgreSQL `JSONB`.

This allows different physics calculations to store different input and result structures without requiring a separate table for every calculation type.

---

## Example Calculation

### Gravitational Force Request

```json
{
  "mass1": 5.972e24,
  "mass2": 7.342e22,
  "distance": 384400000
}
```

### Example Response

```json
{
  "force": 1.9804922390990566e20,
  "unit": "N"
}
```

The React frontend formats large values into a more readable scientific form such as:

```text
1.98049 × 10²⁰ N
```

---

## Input Validation

FastAPI requests are validated using Pydantic before calculations are performed.

Values such as:

* Mass
* Radius
* Distance
* Height
* Orbital radius

must satisfy the requirements of their respective calculations.

The Python calculation layer also performs validation independently of FastAPI.

PostgreSQL adds another layer of protection using database constraints for stored values such as mass and radius.

---

## Production Reliability

The production application includes retry logic between services.

This is particularly useful when a hosted service takes time to become available after inactivity.

The frontend can retry requests to the Node.js API, and the Node.js service can retry communication with the Python physics service.

The application also handles unexpected non JSON responses from infrastructure without immediately crashing the calculation flow.

---

## Running the Python Service Locally

Navigate to:

```bash
cd python-service
```

Install dependencies:

```bash
python -m pip install -r requirements.txt
```

Start FastAPI:

```bash
python -m uvicorn app.main:app --reload
```

The API runs at:

```text
http://127.0.0.1:8000
```

FastAPI documentation is available at:

```text
http://127.0.0.1:8000/docs
```

---

## Running the Node.js Backend Locally

Navigate to:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file using `.env.example`.

Example:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@127.0.0.1:5432/gravity_calculator
PYTHON_SERVICE_URL=http://127.0.0.1:8000
FRONTEND_URL=http://localhost:5173
PORT=3000
```

Never commit the real `.env` file.

Start the backend:

```bash
npm run dev
```

The backend runs at:

```text
http://localhost:3000
```

---

## Running the React Web Application Locally

Navigate to:

```bash
cd web
```

Install dependencies:

```bash
npm install
```

Create a `.env` file using `.env.example`.

Example:

```env
VITE_API_URL=http://localhost:3000
```

Start Vite:

```bash
npm run dev
```

The web application runs at:

```text
http://localhost:5173
```

---

## Production Deployment

The application is deployed using Render.

Production consists of separate services for:

```text
React Static Site
        |
Node.js Web Service
       / \
      /   \
PostgreSQL  Python FastAPI
```

The production website is available at:

**https://gravitykalkilateri2023.com**

The custom domain points to the deployed React application.

Environment variables are used to connect the production frontend, Node.js API, Python API, and PostgreSQL database without committing credentials to Git.

---

## Git Workflow

The project uses two primary branches.

```text
dev
 |
 | development
 | testing
 | new features
 |
 v
Pull Request
 |
 v
main
 |
 v
Production deployment
```

### `dev`

Used for:

* Feature development
* Bug fixes
* Testing
* Experiments

### `main`

Used for:

* Stable code
* Production deployments

Changes are developed and tested on `dev` before being merged into `main`.

---

## Testing

The project has been manually tested across the complete application stack.

Testing currently includes:

* Valid physics calculations
* Invalid physics inputs
* Python request validation
* Node.js to Python communication
* PostgreSQL connectivity
* Production PostgreSQL connectivity
* Celestial body creation and retrieval
* Celestial body selection in React
* Dynamic celestial body backgrounds
* Calculation history storage
* Calculation history retrieval
* Scientific number formatting
* React Router navigation
* Direct navigation to `/history`
* Direct navigation to `/planets`
* Production deployment
* Custom domain access
* Production calculations

Automated unit and integration tests are planned for a future stage.

---

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

Calculation history
        ✓

React + TypeScript web application
        ✓

Dynamic planet backgrounds
        ✓

Scientific number formatting
        ✓

Navigation and multiple pages
        ✓

Planet biography section
        ✓

Production PostgreSQL database
        ✓

Production Python service
        ✓

Production Node.js API
        ✓

Production React application
        ✓

Custom production domain
        ✓
```

Current stage:

```text
Production web application
        ✓

Continue improving features
        ↓
Automated testing
        ↓
Advanced physics
        ↓
AI assisted explanations
        ↓
Mobile application
```

---

## Future AI Features

A future version of Gravity Calculator may include an AI assisted learning system.

The AI layer will not replace the Python physics engine.

Python will remain responsible for numerical calculations and scientific results.

The AI feature may be used to:

* Explain physics formulas
* Define physics concepts
* Explain calculation results
* Explain solution steps
* Answer questions about gravitational physics
* Answer questions about orbital physics
* Provide educational context about celestial bodies

This architecture keeps numerical calculations deterministic while allowing AI to provide educational explanations.

---

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

---

## Planned Mobile Application

A React Native mobile application is planned.

The mobile application will reuse the same Node.js API, PostgreSQL database, and Python physics service used by the web application.

Possible technologies include:

| Technology | Role |
| --- | --- |
| React Native | Mobile interface |
| TypeScript | Mobile development |
| Expo | Mobile development and testing |

---

## Project Status

**Production**

Gravity Calculator is now deployed and operational as a full stack web application.

**Live application:**

https://gravitykalkilateri2023.com

Further development will continue through the `dev` branch before stable changes are merged into `main`.

---

## Author

Jean Mugabe
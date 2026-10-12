// URL of the Python FastAPI physics service.
//
// Local development:
// http://127.0.0.1:8000
//
// Production:
// Render Python service URL from PYTHON_SERVICE_URL.
const PYTHON_SERVICE_URL =
    process.env.PYTHON_SERVICE_URL ||
    "http://127.0.0.1:8000";


// Wait for a short amount of time before retrying.
//
// This is useful because a free cloud service may need
// a moment to wake up after being inactive.
function wait(milliseconds: number) {
    return new Promise((resolve) =>
        setTimeout(resolve, milliseconds)
    );
}


export async function callPythonGravityService(
    endpoint: string,
    payload: unknown
) {
    // Try the Python request up to two times.
    //
    // Normally the first request succeeds.
    // The second attempt helps if the Python service
    // temporarily returns an infrastructure error.
    for (let attempt = 1; attempt <= 2; attempt++) {

        const response = await fetch(
            `${PYTHON_SERVICE_URL}${endpoint}`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(payload)
            }
        );

        // Read text first instead of immediately calling
        // response.json().
        //
        // FastAPI normally returns JSON, but a hosting
        // platform may occasionally return an HTML page
        // during a temporary infrastructure problem.
        const responseText = await response.text();

        try {
            // Convert the response into JSON.
            const data = JSON.parse(responseText);

            return {
                status: response.status,
                data
            };

        } catch {
            console.error(
                "Python service returned non-JSON:",
                {
                    status: response.status,
                    endpoint,
                    attempt,

                    // Only log a small amount of the response.
                    response: responseText.slice(0, 150)
                }
            );

            // If this is the first failed attempt,
            // wait briefly and try one more time.
            if (attempt === 1) {
                await wait(2000);
                continue;
            }

            // Both attempts failed.
            throw new Error(
                "Python physics service returned an invalid response"
            );
        }
    }

    // TypeScript expects every possible code path
    // to either return or throw.
    throw new Error(
        "Unable to communicate with Python physics service"
    );
}
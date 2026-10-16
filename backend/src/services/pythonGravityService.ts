// Python FastAPI physics service.
const PYTHON_SERVICE_URL =
    process.env.PYTHON_SERVICE_URL ||
    "http://127.0.0.1:8000";

// Wait before retrying.
function wait(milliseconds: number) {
    return new Promise((resolve) =>
        setTimeout(resolve, milliseconds)
    );
}

export async function callPythonGravityService(
    endpoint: string,
    payload: unknown
) {
    /*
        A free Render Python service can be asleep.

        Try several times so a user does not immediately
        receive "Unable to complete calculation".
    */
    for (let attempt = 1; attempt <= 6; attempt++) {
        try {
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

            /*
                Read text first.

                FastAPI normally returns JSON, but Render
                can temporarily return an HTML loading/error
                page while the service wakes up.
            */
            const responseText = await response.text();

            try {
                const data = JSON.parse(responseText);

                /*
                    If FastAPI returned a real response,
                    including validation errors such as 422,
                    send it back to Node normally.
                */
                if (
                    response.status < 500 ||
                    response.ok
                ) {
                    return {
                        status: response.status,
                        data
                    };
                }

            } catch {
                console.warn(
                    `Python service is not ready yet. Attempt ${attempt}/6`
                );
            }

        } catch (error) {
            console.warn(
                `Python request failed. Attempt ${attempt}/6`,
                error
            );
        }

        if (attempt < 6) {
            // Give the sleeping service ten seconds to wake.
            await wait(10000);
        }
    }

    throw new Error(
        "Python physics service did not become available"
    );
}
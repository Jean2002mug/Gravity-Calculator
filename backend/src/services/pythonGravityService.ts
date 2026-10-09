const PYTHON_SERVICE_URL =
    process.env.PYTHON_SERVICE_URL || "http://127.0.0.1:8000";

export async function callPythonGravityService(
    endpoint: string,
    payload: unknown
) {
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

    const data = await response.json();

    return {
        status: response.status,
        data: data
    };
}
import { API_URL } from "../config/api";

// Wait before trying the API again.
function wait(milliseconds: number) {
    return new Promise((resolve) =>
        setTimeout(resolve, milliseconds)
    );
}

/*
    Fetch data from our Node API.

    Free Render services can be asleep.
    If the server is temporarily unavailable,
    try again instead of forcing the user
    to refresh the whole browser.
*/
export async function apiFetch(
    path: string,
    options?: RequestInit
) {
    let lastError: unknown;

    // Try for roughly one minute.
    for (let attempt = 1; attempt <= 6; attempt++) {
        try {
            const response = await fetch(
                `${API_URL}${path}`,
                options
            );

            /*
                4xx errors such as 400 or 422 are real
                application errors, so don't retry them.
            */
            if (
                response.ok ||
                (response.status >= 400 &&
                    response.status < 500)
            ) {
                return response;
            }

            lastError = new Error(
                `API returned ${response.status}`
            );

        } catch (error) {
            lastError = error;
        }

        // Give a sleeping server time to wake up.
        if (attempt < 6) {
            await wait(10000);
        }
    }

    throw lastError ?? new Error(
        "Unable to reach the API"
    );
}
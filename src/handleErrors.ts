export function handleErrors(response: Response): Response {
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response;
}
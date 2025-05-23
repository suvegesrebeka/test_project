import test, { expect } from "@playwright/test"
import putApi from "../data/api/post-api.json"


//PUT
test('PUT', async ({ request }) => {
    const response = await request.put(`${putApi.url}/2`, {
        data: putApi.payload,
        headers: {
            "x-api-key": putApi.apiKey
        }
    });

    const responseBody = await response.json();
    console.log("PUT:", await response.status(), responseBody);

    expect(response.status()).toBe(200);
    expect(responseBody.name).toBe(putApi.payload.name);
    expect(responseBody.job).toBe(putApi.payload.job);
});


// https://reqres.in/
import test, { expect } from "@playwright/test"
import postApi from "../data/api/post-api.json"

// POST
test('POST', async ({ request }) => {
    const response = await request.post(postApi.url, {
        data: postApi.payload,
        headers: {
            "x-api-key": postApi.apiKey
        }
    });


    const responseBody = await response.json();
    console.log("Response body:", responseBody);

    // Verify response
    expect(response.status()).toBe(201);
    expect(responseBody.name).toBe(postApi.payload.name);
    expect(responseBody.job).toBe(postApi.payload.job);
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('name');
});

// https://reqres.in/

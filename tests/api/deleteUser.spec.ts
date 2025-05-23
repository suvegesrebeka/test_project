import test, { expect } from "@playwright/test";
import deleteApi from "../data/api/post-api.json"


//DELETE
test('DELETE', async ({ request }) => {
    const response = await request.delete(`${deleteApi.url}/2`, {
        headers: {
            "x-api-key": deleteApi.apiKey
        }
    })
    console.log("DELETE:", response.status());
    expect(await response.status()).toBe(204)
})

// https://reqres.in/
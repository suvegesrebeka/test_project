import { test, expect, request } from '@playwright/test';
import getApi from "../data/api/get-api.json"




//GET
test('GET', async ({ request }) => {
    const response = await request.get(getApi.url);
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body);

    expect(body).toHaveProperty('drinks');
    expect(body.drinks.length).toBeGreaterThan(0);
    const drink = body.drinks[0];
    expect(drink).toHaveProperty('strDrink'); //name
})


//https://www.thecocktaildb.com/api.php



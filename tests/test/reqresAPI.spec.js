const { test, expect } = require('@playwright/test');

// Base URL for the API
const baseUrl = "https://reqres.in/api";

// Sample data for POST (valid user)
const validUserData = {
  email: "george.bluth@reqres.in", // Valid user from the mock API
  first_name: "George",
  last_name: "Bluth",
  avatar: "https://reqres.in/img/faces/1-image.jpg"
};


test.describe("API: User Registration and Update API Tests", () => {
  test("POST /users - should create a new user with valid data", async ({ request }) => {
    const response = await request.post(`${baseUrl}/users`, {
      data: validUserData
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
  });

  test("API: Validate users data are expected", async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/1');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    const expectedUserData = {
      id: 1,
      email: "george.bluth@reqres.in",
      first_name: "George",
      last_name: "Bluth",
      avatar: "https://reqres.in/img/faces/1-image.jpg"
    };
    expect(responseBody).toHaveProperty('data');
    expect(responseBody.data).toMatchObject(expectedUserData);
  });


  test('API: Update user data using PUT request and verify response', async ({ request }) => {
    const updatedUserData = {
      email: "george.updated@reqres.in",
      first_name: "George",
      last_name: "Updated",
      avatar: "https://reqres.in/img/faces/1-updated.jpg"
    };
  
    const response = await request.put('https://reqres.in/api/users/1', {
      data: updatedUserData
    });
    expect(response.status()).toBe(200); // Typically, 200 or 204 for a successful PUT request
    const responseBody = await response.json();
  
    expect(responseBody).toMatchObject({
      email: updatedUserData.email,
      first_name: updatedUserData.first_name,
      last_name: updatedUserData.last_name,
      avatar: updatedUserData.avatar
    });
    console.log('Response body:', responseBody);
  });

  test('API: Delete user and verify response', async ({ request }) => {
    const response = await request.delete('https://reqres.in/api/users/1');
    expect(response.status()).toBe(204); 
  });


});

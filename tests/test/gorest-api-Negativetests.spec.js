const { test, expect } = require('@playwright/test');

let userId; // Global variable to store userId for sharing across tests
let AUTH_TOKEN;
test.beforeAll(() => {
    AUTH_TOKEN = "Bearer 690d4f1e6f81eb438fbadde15bb0104ea1ab2fce15bdf8082fe06bd5a6026f7d";  
    console.log('Authorization token is set up before all tests');
  });

// Negative Test Case - Unauthorized (Invalid Bearer Token)
test('API: Negative Test - Unauthorized request with invalid token', async ({ request }) => {
    const invalidToken = "Bearer 87dd23efe5fe5658b1139a1d024a81eff99ba8ed5af8ca32970f9d7ca90579e2";  
    const response = await request.get('https://gorest.co.in/public/v2/users', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': invalidToken,
      }
    });
  
    // Assert that the response status is 401 (Unauthorized)
    expect(response.status()).toBe(401);
    const body = await response.json();
    console.log(body);
    expect(body.message).toBe('Invalid token');  // Check for error message
  
  });

  // Negative Test Case - Missing Required Field (POST)
test('API Negative Test - Missing required field in POST request', async ({ request }) => {
  const response = await request.post('https://gorest.co.in/public/v2/users', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 690d4f1e6f81eb438fbadde15bb0104ea1ab2fce15bdf8082fe06bd5a6026f7d',
    },
    data: {
      name: "Dee" ,
     // email: "john.dee@example.com", 
      gender: "female",
      status: "active",
    },
  });

  const body = await response.json();
  expect(response.status()).toBe(422);


  });

  // Negative Test Case - Invalid User ID in PUT
test('API Negative Test - Invalid User ID in PUT request', async ({ request }) => {
  const invalidUserId = 9999999;  // Invalid user ID
  const updatedUser = {
    name: "John Invalid",
    email: "john.invalid@example.com",
    gender: "male",
    status: "active"
  };

  const response = await request.put(`https://gorest.co.in/public/v2/users/9999999`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': AUTH_TOKEN,
    },
    data: updatedUser
  });

  // Assert that the response status is 404 (Not Found) for an invalid user
 
  const body = await response.json();
  expect(response.status()).toBe(404);
  expect(body.message).toBe('Resource not found');  
});
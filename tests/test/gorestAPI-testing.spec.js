const { test, expect } = require('@playwright/test');
const ApiPageObject = require('../page/gorestObjectPAge');
const SchemaValidator = require('../utils/schemaValidator');
const userData = require('../../data/request_payloads/user.json');
let userId;
let apiPageObject;
const timestamp = Math.floor(Date.now() / 1000);



// Global variable to store userId for sharing across tests
test.describe('GoRest API Positive testcases', () => {
    test.beforeAll(async ({ request  }) => {
        apiPageObject = new ApiPageObject(request );
        // Update the name and email with the timestamp so can create unique user can avoid duplicate  
        const uniqueUserData = {
          ...userData,
          name: `${userData.name} ${timestamp}`,             // Append timestamp to name
          email: `test.user.${timestamp}@example.com`        // Create a unique email
        };
        // Send a POST request
       const response = await apiPageObject.createUser(uniqueUserData.name, uniqueUserData.email, userData.gender, userData.status);
       const responseBody = await response.json(); // Ensure responseBody is defined here
       console.log("ID:"+ responseBody.id);
       userId = responseBody.id;
       expect(response.status()).toBe(201);
    });
    

// Test to verify if the created user data matches the expected values
test('API: Verify that adding, retrieving, and deleting user data works as expected', async ({ request }) => {
    const response = await request.get(`https://gorest.co.in/public/v2/users/${userId}`, {
        headers: {
          'Authorization': 'Bearer 690d4f1e6f81eb438fbadde15bb0104ea1ab2fce15bdf8082fe06bd5a6026f7d',
        },
      });
    
      const body = await response.json();
      expect(response.status()).toBe(200); // Validate that user details are fetched successfully
      expect(body.id).toBe(userId); // Ensure that the fetched user ID matches
      console.log('Verify created user data:', body);

      //////update data 
      const updatedUser = {
        name: "JohnDee Updated",
        email: "john.dee.updated@example.com",
      };

      const updatedResponse = await request.put(`https://gorest.co.in/public/v2/users/${userId}`, {
        headers: {
          'Authorization': 'Bearer 690d4f1e6f81eb438fbadde15bb0104ea1ab2fce15bdf8082fe06bd5a6026f7d',
        }, updatedUser
      });
      const responseBody = await updatedResponse.json(); // Ensure responseBody is defined here
      console.log('Verify updated user data:', responseBody.id, responseBody.name);
      expect(updatedResponse.status()).toBe(200); 

/////// Delete user data  
const responseDelet = await request.delete(`https://gorest.co.in/public/v2/users/${userId}`, {
    headers: {
      'Authorization': 'Bearer 690d4f1e6f81eb438fbadde15bb0104ea1ab2fce15bdf8082fe06bd5a6026f7d',
    }
  });
  
  // Check the status and handle empty response
  if (responseDelet.status() === 204) {
    console.log("Deleted successfully: No content returned.");
  } else if (responseDelet.ok) {
    const deleteBody = await responseDelet.json(); // Parse only if not empty
    console.log("Deleted successfully:", deleteBody, responseDelet.status());
  } else {
    console.error(`Failed to delete user with status ${responseDelet.status()}`);
  }

})

});
const fs = require('fs');
const path = require('path');

class ApiPageObject {
  constructor(request) {
    this.request = request;
    this.baseUrl = 'https://gorest.co.in/public/v2';
    this.users = '/users';
    this.authToken = '690d4f1e6f81eb438fbadde15bb0104ea1ab2fce15bdf8082fe06bd5a6026f7d'; 
    this.authHeader = {
 
        'Content-Type': 'application/json',
      };
  }

  // Method to read request payload from a file
  async getRequestPayload(fileName) {
    const filePath = path.join(__dirname, '..', '..', 'data', 'request_payloads', fileName);
    const payload = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return payload;
  }

  // Post request
  async createUser(name, email, gender, status) {
    const payload = { name, email, gender, status };  // Define payload here

    const response = await this.request.post(`${this.baseUrl}${this.users}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 690d4f1e6f81eb438fbadde15bb0104ea1ab2fce15bdf8082fe06bd5a6026f7d',
      },  data:payload,
      //data: { name, email, gender, status },
    });
    return response;
  }
    // Method to send a put request
    async sendPutRequest(name, email, userId) {
      const payload = { name, email} // Define payload here
      const response = await this.request.put(`${this.baseUrl}${this.users}${userId}`, {
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 690d4f1e6f81eb438fbadde15bb0104ea1ab2fce15bdf8082fe06bd5a6026f7d',
        },
      });
  
      return response;
    }


  // Method to send a GET request
  async sendGetRequest(userId) {
    const response = await this.request.get(`${this.baseUrl}${this.users}${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 690d4f1e6f81eb438fbadde15bb0104ea1ab2fce15bdf8082fe06bd5a6026f7d',
      }, 
    });
    console.log("url:", `${this.baseUrl}${this.users}${userId}`);
    return response;
  }



// code ends here   
}
module.exports = ApiPageObject;

const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');

class SchemaValidator {
  static validateResponse(responseBody, schemaFileName) {
    const schemaPath = path.join(__dirname, '..', '..', 'data', 'response_schemas', schemaFileName);
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
    //const ajv = new Ajv();
    const ajv = new Ajv({ allErrors: true, useDefaults: true, coerceTypes: true, formats: ['email'] }); // Enable email format support
    const validate = ajv.compile(schema);
    const valid = validate(responseBody);

    if (!valid) {
      console.error('Validation failed:', validate.errors);
      return false;
    }
    return true;
  }
}

module.exports = SchemaValidator;
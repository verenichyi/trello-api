const ApiError = require('../exceptions/ApiError');

class Validator {
  validate(schema, data) {
    const { error } = schema.validate(data);

    if (error) {
      throw ApiError.BadRequest('Validation error', error);
    }
  }
}

module.exports = new Validator();

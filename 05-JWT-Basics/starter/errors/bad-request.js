const CustomAPIError = require("./custom-error")
const status = require('http-status-codes').StatusCodes

class BadRequest extends CustomAPIError  {
    constructor(message) {
      super(message)
      this.statusCode = status.BAD_REQUEST

    }
  }
  
  module.exports = BadRequest
  
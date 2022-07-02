const CustomAPIError = require("./custom-error")
const status = require('http-status-codes').StatusCodes

class UnauthenticatedError extends CustomAPIError  {
    constructor(message) {
      super(message)
      this.statusCode = status.UNAUTHORIZED
    }
  }
  
  module.exports = UnauthenticatedError
  
const Sequelize = require('sequelize');
const { validationResult } = require('express-validator')

class ErrorHandler extends Error {
    constructor(statusCode, data, message) {
      super();
      this.statusCode = statusCode;
      this.data = data;
      this.message = message;
    }
  }
  
  
const handleError = (err, res) => {
    if(err instanceof Sequelize.ValidationError){
        const extractedErrors = []
        err.errors.map(err => extractedErrors.push({ [err.path]: err.message }))
        return res.status(422).json({ error: true, data: extractedErrors, msg : 'input validation failed' });
    }else{
        const { statusCode, data, message } = err;
        res.status(statusCode).json({
            error: true,
            data : data,
            msg : message
        });
    }  
    
};

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    throw new ErrorHandler(422, extractedErrors, 'input validation failed')
}

  module.exports = {
    ErrorHandler,
    handleError,
    validate
  }
  
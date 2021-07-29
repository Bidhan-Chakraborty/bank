const { body } = require('express-validator')
const authValidationRules = (routeName) => {

    switch(routeName) {
        case 'register':
            return [
                body('name', 'Please enter name.Alphabets only').exists(),
                body('email', 'Please enter a valid email').exists().isEmail(),
                body('password').exists().isLength({ min: 6 }),
                body('confirm_password', 'password confirmation field must have the same value as the password field').exists().custom((value, { req }) => value === req.body.password)
              ]
        break;
        case 'login':
            return [
                body('email', 'Please enter a valid email').exists().isEmail(),
                body('password').exists()
              ]
        break;
        case 'token':
            return [
                body('token', 'Token cannot be null').exists()
              ]
        break;
        case 'logout':
            return [
                body('token', 'Token cannot be null').exists()
              ]
        break;
        
        default:break;
    }
}




module.exports = {
  authValidationRules
}

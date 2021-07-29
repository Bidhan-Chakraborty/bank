const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Admin = require('../../models').admin;
const RefreshToken = require('../../models').refreshToken;
const { ErrorHandler } = require('../../helpers/error');

let refreshTokens = []

exports.register = ( req, res, next) => {
    const userData = {
        name : req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.body.image,
        password: crypto.createHash('md5').update(req.body.password).digest('hex')
    }
    Admin.create(userData)
    .then(user => {
        const sendData = {
            id : user.id,
            name : user.name,
            email: user.email,
            user_type: 'admin'
        }
        res.status(201).json({ error: false, data: sendData, msg : 'Admin created successfully' });
        
    })
    .catch(err => {
        return next(err);       
    })
}

exports.login = ( req, res, next) => {
    let email = req.body.email
    let password = crypto.createHash('md5').update(req.body.password).digest('hex')
    Admin.findOne({
        where : {
            email : email            
        }
    }).then(user => {
        if(!user){
            throw new ErrorHandler(400, [], 'User with this email does not exist')
        }else{
            if(user.password === password){
                const payload = {
                    id : user.id,
                    name : user.name,
                    email : user.email,
                    phone: user.phone,
                    image: user.image,
                    user_type: 'admin'
                };
                const accessToken = generateAccessToken(payload) 
                const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET)
                RefreshToken.create({
                    email : user.email,
                    token : refreshToken,
                    user_type : 'admin'
                }).then(result => {
                    res.status(200).json({ error: false, data: { accessToken : accessToken, refreshToken: refreshToken }, msg : 'Authenticated successfully' });
                }).catch(err => {
                    return next(err);
                })
                
            }else{
                throw new ErrorHandler(400, [], 'Entered password is wrong')
            }
            
        }
    }).catch(err => {
        return next(err); 
    })
}

exports.verifyToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    if(typeof authorizationHeader !== 'undefined') {
        const bearerToken = authorizationHeader && authorizationHeader.split(' ')[1]
        jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
            if(err){
                throw new ErrorHandler(401, [], err.message)
            }else{
                req.user = authData
                next()
            }
        })
    }else{
       throw new ErrorHandler(403, [], 'Token not found')
    }
}

exports.token = async (req, res, next) => {
    const refreshToken = req.body.token
    RefreshToken.findOne({
        where : {
            token : refreshToken,
            user_type: 'admin'
        }
    }).then( result => {
        if(result){
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, authData) => {
                if (err) throw new ErrorHandler(403, [], err.message)
                const payload = {
                    id : authData.id,
                    name : authData.name,
                    email : authData.email,
                    phone : authData.phone,
                    image : authData.image,
                    user_type: 'admin'
                }
                const accessToken = generateAccessToken(payload)
                res.status(201).json({ error: false, data: { accessToken : accessToken }, msg : 'New token created' });
            })
        }else{
            throw new ErrorHandler(403, [], 'Token not found')
        }
    }
        
    ).catch(err => {
        return next(err);
    })
    
  }

exports.logout = ( req, res, next ) => {
    RefreshToken.findOne({
        where : {
            token : req.body.token,
            user_type: 'admin'
        }
    })
    .then(refresh_token => {
        if(refresh_token){
            return refresh_token.destroy()
        }else{
            throw new ErrorHandler(403, [], 'Token not found')
        }
        
    })
    .then(result => {
        if(result)
            res.status(204).json({ error: false, data: [], msg : 'Logged out successfully' });

    })
    .catch(err => {
        return next(err);
    })
    
}

exports.getProfile = async (req, res, next) => {
    try {
        const adminProfileData = await Admin.findByPk(req.user.id);
        res.status(200).json({ error: false, data: adminProfileData, msg : 'success' });
    }catch(err){
        return next(err); 
    }
}

function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
}

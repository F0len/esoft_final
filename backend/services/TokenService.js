const jwt = require('jsonwebtoken');

class TokenService {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }

    authenticate = (req, res, next) => {
        const accessToken = req.headers['authorization'];
        const refreshToken = req.cookies['refreshToken'];
        
        if (!accessToken && !refreshToken) {
            return res.status(401).send('Access Denied. No token provided.');
        }
        
        try {
            const token = accessToken.split(' ')[1];
            const decoded = jwt.verify(token, this.secretKey);
            req.user = decoded;
            next();
        } catch (error) {
            if (!refreshToken) {
                return res.status(401).send('Access Denied. No refresh token provided.');
            }

            try {
                const decoded = jwt.verify(refreshToken, this.secretKey);
                const token = jwt.sign({ id: decoded.id, login: decoded.login  }, this.secretKey, { expiresIn: '30m' });
                req.user = decoded;
                res
                    .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict',  maxAge: 7 * 24 * 60 * 60 * 1000})
                    .header('Authorization', token);
                next();
            } catch (error) {
                return res.status(401).send('Access Denied.');
            }
        }
    };
    authorizeRoles = (roles) => {
        return (req, res, next) => {
          if (!roles.includes(req.user.role)) {
            return res.sendStatus(403);
          }
          next();
        };
      };
      
}

module.exports = TokenService;

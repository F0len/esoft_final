const jwt = require('jsonwebtoken');

class TokenService {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }

    authenticate = (req, res, next) => {
        const accessToken = req.headers['authorization'];
        const refreshToken = req.cookies['refreshToken'];
        const token = accessToken.split(' ')[1];

        if (!token && !refreshToken) {
            return res.status(401).send('Access Denied. No token provided.');
        }

        try {
            const decoded = jwt.verify(token, this.secretKey);
            req.user = decoded;
            next();
        } catch (error) {
            if (!refreshToken) {
                return res.status(401).send('Access Denied. No refresh token provided.');
            }

            try {
                const decoded = jwt.verify(refreshToken, this.secretKey);
                const token = jwt.sign({ id: decoded.user.id, login: decoded.user.login  }, this.secretKey, { expiresIn: '1h' });

                res
                    .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
                    .header('Authorization', token)
                    .send(decoded.user);
            } catch (error) {
                return res.status(400).send('Invalid refreshToken.');
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

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
            const decoded = jwt.verify(accessToken, this.secretKey);
            req.user = decoded.user;
            next();
        } catch (error) {
            if (!refreshToken) {
                return res.status(401).send('Access Denied. No refresh token provided.');
            }

            try {
                const decoded = jwt.verify(refreshToken, this.secretKey);
                const accessToken = jwt.sign({ id: decoded.user.id, login: decoded.user.login  }, this.secretKey, { expiresIn: '1h' });

                res
                    .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
                    .header('Authorization', accessToken)
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

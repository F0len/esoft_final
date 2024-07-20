class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  registerUser = async (req, res) => {
    try {
      const user = await this.authService.registerUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  loginUser = async (req, res) => {
    try {
      const { login, password } = req.body;
      const { accessToken, refreshToken, user } = await this.authService.login(login, password);
      res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'Lax', 
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000})
      .header('Authorization', accessToken)
      .header('Access-Control-Expose-Headers', 'Authorization')
      .status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

 
}

module.exports = AuthController;

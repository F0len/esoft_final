class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  registerUser = async (req, res) => {
    try {
      const user = await this.authService.register(req.body);
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
      .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
      .header('Authorization', accessToken)
      .header('Access-Control-Expose-Headers', 'Authorization')
      .status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  refreshToken = async (req, res) => {
    const refreshToken = req.cookies['refreshToken'];
  
    try {
      const { newAccessToken, user } = await this.authService.refreshToken(refreshToken);

      res
        .header('Authorization', newAccessToken)
        .status(200).json(user);
    } catch (error) {
      return res.status(400).send('Invalid refresh token.');
    }
  };
}

module.exports = AuthController;

class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    addUser = async (req, res) => {
        try {
            const user = await this.userService.addUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    updateUser = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await this.userService.updateUser(id, req.body);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    deleteUser = async (req, res) => {
        try {
            const { id } = req.params;
            await this.userService.deleteUser(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getAllUsers = async (req, res) => {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    getAllUsersSmallInfo = async (req, res) => {
        try {
            const users = await this.userService.getAllUsersSmallInfo();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    getUsersByLogin = async (req, res) => {
        try {
            const { login } = req.params;
            const users = await this.userService.getUsersByLogin(login);
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = UserController;

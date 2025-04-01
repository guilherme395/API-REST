const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel.js");

class userController {
  async createUser(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Os campos 'name', 'email' e 'password' são obrigatórios",
        data: null,
      });
    }

    try {
      const existingUser = await userModel.getUserByEmail(email);

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "O email já está em uso",
          data: null,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = await userModel.createUser({
        name,
        email,
        password: hashedPassword,
      });
      const user = await userModel.getUser(userId);

      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.status(201).json({
        success: true,
        message: "Usuário criado com sucesso",
        data: { user, token },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Erro interno no servidor. Por favor, tente novamente mais tarde.`,
        error: error.message,
        data: null,
      });
    }
  }

  async getUser(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "O campo 'id' é obrigatório",
        data: null,
      });
    }

    try {
      const user = await userModel.getUser(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado",
          data: null,
        });
      }

      res.status(200).json({
        success: true,
        message: "Usuário encontrado",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Erro interno no servidor. Por favor, tente novamente mais tarde.`,
        error: error.message,
        data: null,
      });
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!id || !name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Todos os campos são obrigatórios",
        data: null,
      });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await userModel.updateUser({
        id,
        name,
        email,
        password: hashedPassword,
      });
      const updatedUser = await userModel.getUser(id);

      res.status(200).json({
        success: true,
        message: "Usuário atualizado com sucesso",
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Erro interno no servidor. Por favor, tente novamente mais tarde.`,
        error: error.message,
        data: null,
      });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "O campo 'id' é obrigatório",
        data: null,
      });
    }

    try {
      await userModel.deleteUser(id);
      res.status(200).json({
        success: true,
        message: "Usuário deletado com sucesso",
        data: null,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Erro interno no servidor. Por favor, tente novamente mais tarde.`,
        error: error.message,
        data: null,
      });
    }
  }

  async listUsers(req, res) {
    try {
      const users = await userModel.listUsers();
      res.status(200).json({
        success: true,
        message: "Lista de usuários",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Erro interno no servidor. Por favor, tente novamente mais tarde.`,
        error: error.message,
        data: null,
      });
    }
  }

  async authenticateUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Os campos 'email' e 'password' são obrigatórios",
        data: null,
      });
    }

    try {
      const user = await userModel.authenticateUser(email, password);
      if (user) {
        const token = jwt.sign(
          { id: user.id, name: user.name, email: user.email },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({
          success: true,
          message: "Autenticação bem-sucedida",
          data: { user, token },
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Credenciais inválidas",
          data: null,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Erro interno no servidor. Por favor, tente novamente mais tarde.`,
        error: error.message,
        data: null,
      });
    }
  }
}

module.exports = new userController();

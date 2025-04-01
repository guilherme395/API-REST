require("dotenv/config");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel.js");

class authMiddleware {
  async validateToken(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Token não informado",
          data: null,
        });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      const user = await userModel.getUser(decoded.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Usuário não encontrado",
          data: null,
        });
      }

      req.user = { id: user.id, name: user.name, email: user.email };
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token inválido ou expirado",
        data: null,
      });
    }
  }
}

module.exports = new authMiddleware();

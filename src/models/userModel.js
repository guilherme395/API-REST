import conn from "./connection.js";
import bcrypt from "bcrypt";

class userModel {
  async createUser({ name, email, password, role_id = 2 }) {
    try {
      const [user] = await conn("users").insert({
        name,
        email,
        password,
        role_id,
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUser(id) {
    try {
      const user = await conn("users").where({ id }).first();
      if (user) delete user.password;
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await conn("users").where({ email }).first();
      if (user) delete user.password;
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser({ id, name, email, password }) {
    try {
      await conn("users").where({ id }).update({ name, email, password });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(id) {
    try {
      await conn("users").where({ id }).del();
    } catch (error) {
      throw new Error(error);
    }
  }

  async listUsers() {
    try {
      const users = await conn("users").select("*");
      users.forEach((user) => delete user.password);
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }

  async authenticateUser(email, password) {
    try {
      const user = await conn("users").where({ email }).first();
      if (user && (await bcrypt.compare(password, user.password))) {
        delete user.password;
        return user;
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new userModel();

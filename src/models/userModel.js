import conn from "./connection.js";

class userModel {
	async createUser({ name, email, password }) {
		try {
			await conn("users").insert({ name, email, password });
		} catch (error) {
			throw new Error(error);
		}
	}

	async getUser(id) {
		try {
			return await conn("users").where({ id }).first();
		} catch (error) {
			throw new Error(error);
		}
	}

	async getUserByEmail(email) {
		try {
			return await conn("users").where({ email }).first();
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
			return await conn("users").select("*");
		} catch (error) {
			throw new Error(error);
		}
	}
}

export default new userModel();

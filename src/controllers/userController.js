import userModel from "../models/userModel.js";

class userController {
	async createUser(req, res) {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({
				success: false,
				message:
					"Os campos 'name', 'email' e 'password' são obrigatórios",
				data: null,
			});
		}

		try {
			const existingUser = await userModel.getUserByEmail(email);

			if (existingUser) {
				return res.status(400).json({
					success: false,
					message: "O email já está em uso",
					data: null,
				});
			}

			const userId = await userModel.createUser({
				name,
				email,
				password,
			});
			const user = await userModel.getUser(userId[0]);

			res.status(201).json({
				success: true,
				message: "Usuário criado com sucesso",
				data: user,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: `Erro Interno no Servidor. Erro: ${error.message}`,
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
				message: `Erro Interno no Servidor. Erro: ${error.message}`,
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
			await userModel.updateUser({ id, name, email, password });
			const updatedUser = await userModel.getUser(id);

			res.status(200).json({
				success: true,
				message: "Usuário atualizado com sucesso",
				data: updatedUser,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: `Erro Interno no Servidor. Erro: ${error.message}`,
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
				message: `Erro Interno no Servidor. Erro: ${error.message}`,
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
				message: `Erro Interno no Servidor. Erro: ${error.message}`,
				data: null,
			});
		}
	}
}

export default new userController();

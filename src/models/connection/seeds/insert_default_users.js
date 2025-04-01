const bcrypt = require("bcrypt");

module.exports.seed = async function (knex) {
  await knex("users").del();

  const hashedPasswordForGuilherme = await bcrypt.hash("Gzz1n.glx", 10);
  const hashedPasswordForGuilhermy = await bcrypt.hash("Guilzin", 10);

  await knex("users").insert([
    {
      name: "Guilherme Lima Leite",
      email: "guilhermelimaleite06@gmail.com",
      password: hashedPasswordForGuilherme,
      role_id: 1,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      name: "Guilhermy Rodrigues da Silva",
      email: "developerguilhermy@gmail.com",
      password: hashedPasswordForGuilhermy,
      role_id: 1,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
};

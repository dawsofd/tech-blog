const { User } = require('../models');

const userData =
[
    {
      username: "Sal",
      email: "sal@hotmail.com",
      password: "password12345",
      user_id: 1
    },
    {
      username: "Lernantino",
      email: "lernantino@gmail.com",
      password: "54321password",
      user_id: 2
    },
    {
      username: "Amiko",
      email: "amiko2k20@aol.com",
      password: "password54321",
      user_id: 3
    },
    {
      username: "dawsofd",
      email: "d.dohlen@pm.me",
      password: "12345password",
      user_id: 4
    },
    {
      username: "mickeym",
      email: "1mouse@gmail.com",
      password: "password1111",
      user_id: 5
    }
  ]
  
  const seedUsers = () => User.bulkCreate(userData);

  module.exports = seedUsers;
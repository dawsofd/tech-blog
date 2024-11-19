const { User } = require('../models');

const userData =
[
    {
      username: "Sal",
      email: "sal@hotmail.com",
      password: "password12345"
    },
    {
      username: "Lernantino",
      email: "lernantino@gmail.com",
      password: "54321password"
    },
    {
      username: "Amiko",
      email: "amiko2k20@aol.com",
      password: "password54321"
    },
    {
      username: "dawsofd",
      email: "d.dohlen@pm.me",
      password: "12345password"
    },
    {
      username: "mickeym",
      email: "1mouse@gmail.com",
      password: "password1111"
    }
  ]
  
  const seedUsers = () => User.bulkCreate(userData);

  module.exports = seedUsers;
const { User } = require('../models');

const userData =
[
    {
      "name": "Sal",
      "email": "sal@hotmail.com",
      "password": "password12345"
    },
    {
      "name": "Lernantino",
      "email": "lernantino@gmail.com",
      "password": "54321password"
    },
    {
      "name": "Amiko",
      "email": "amiko2k20@aol.com",
      "password": "password54321"
    },
    {
      "name": "dawsofd",
      "email": "d.dohlen@pm.me",
      "password": "12345password"
    },
    {
      "name": "mickeym",
      "email": "1mouse@gmail.com",
      "password": "password1111"
    }
  ]
  
  const seedUsers = () => User.bulkCreate(userData);

  module.exports = seedUsers;
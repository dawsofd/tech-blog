const { Post } = require('../models');

const postData = [
    {
      "title": "Why MVC is so important",
      "post_body": "MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.",
      "user_id" : 1
    },
    {
      "title": "Authentication vs. Authorization",
      "post_body": "There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system.",
      "user_id" : 2
    },
    {
      "title": "Object-Relational Mapping",
      "post_body": "I have really loved learning about ORMs. It's really simplified the way I create queries in SQL!",
      "user_id": 2
    },
    {
      "title": "Favorite AI Assistant",
      "post_body": "Nothing beats ChatGBT",
      "user_id": 4
    },
    {
      "title": "Mousing Around",
      "post_body": "The best mouse for coders is the Logitech MX Master 3",
      "user_id": 5
    }
  ]
  
const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
const { Comment } = require('../models');

const commentData = [
    {
      comment_body: "I just learned about this in my class!",
      user_id: 2,
      post_id: 3,
    },
    {
      comment_body: "Absolutely NOT",
      user_id: 2,
      post_id: 5,
    },
    {
      comment_body: "I still don't understand this topic very well :(",
      user_id: 4,
      post_id: 3,
    },
    {
      comment_body: "Agreed",
      user_id: 3,
      post_id: 1,
    },
    {
      comment_body: "I really like Microsoft Copilot",
      user_id: 3,
      post_id: 4,
    },
    {
      comment_body: "Who cares??!? Lol",
      user_id: 2,
      post_id: 5,
    },
    {
      comment_body: "Exactly!",
      user_id: 5,
      post_id: 1,
    },
    {
      comment_body: "+100000",
      user_id: 2,
      post_id: 3,
    },

]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
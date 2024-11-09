const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


// Creates a relationship between User and Post model, with the User having a "has many" relationship with Post model.
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Creates a relationship between User and Comment model, with the User having a "has many" relationship with Comment model.
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });

// Creates a relationship between User and Post model, with a "belongs to" relationship of the Post to the User.
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// Creates a relationship between User and Comment model, with a "belongs to" relationship of the Comment to the User.
Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });

module.exports = { User, Post, Comment };

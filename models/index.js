const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


// Creates a relationship between User and Post model, with the User having a "has many" relationship with Post model.
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Creates a relationship between User and Comment model, with the User having a "has many" relationship with Comment model.
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Creates a relationship between Post and Comment model, with the Post having a "has many" relationship with Comment model.
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

  // Creates a relationship between User and Comment model, with a "belongs to" relationship of the Comment to the User.
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Post, Comment };

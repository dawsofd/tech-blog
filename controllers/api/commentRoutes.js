const router = require('express').Router();
// Import the Post model from the models folder
const { Comment } = require('../../models');

// If a POST request is made to /api/comment, a new comment is created. If there is an error, the function returns with a 400 error. 
router.post('/comment', async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // If a DELETE request is made to /api/comments/:id, that comment is deleted. 
  router.delete('/comments/:id', async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
const router = require('express').Router();
// Import the Post model from the models folder
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// GET request for all posts
router.get('/', (req, res) => {
  console.log('=========POSTS=========');
  Post.findAll({
    attributes: ['id','title','content','created_at'],
    order: [
        ['created_at', 'DESC']
    ],
    include: [{
            model: User,
            attributes: ['user_name']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['user_name']
            }
        }
    ]
  })
  .then(postData => res.json(postData.reverse()))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


// GET request for post id 
router.get('/:id', (req, res) => {
  Post.findOne({
          where: {
            id: req.params.id
          },
          attributes: ['id', 'post_body', 'title', 'created_at'],
          include: [{
                  model: User,
                  attributes: ['user_name']
              },
              {   
                  model: Comment,
                  attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
                  include: {
                    model: User,
                    attributes: ['user_name']
                  }
                }
          ]
  })
  .then(postData => {
    if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
    }
    res.json(postData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// POST request to create a new post
router.post('/', withAuth, (req, res) => {
  Post.create({
          title: req.body.title,
          post_body: req.body.post_body,
          user_id: req.session.user_id,
  })
  .then(postData => res.json(postData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// PUT request to update post by id
router.put('/:id', withAuth, (req, res) => {
  Post.update({
        title: req.body.title,
        post_body: req.body.post_body
    }, {
        where: {
          id: req.params.id
        }
    }).then(postData => {
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.json(postData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE request for post by id
router.delete('/:id', withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  }).then(postData => {
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.json(postData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
  
  module.exports = router;
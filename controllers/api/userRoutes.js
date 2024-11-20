const router = require('express').Router();
// Import the User, Post, Comment models from the models folder
const { User, Post, Comment } = require('../../models');

// GET route for all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
  .then(userData => res.json(userData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// GET route for single user by id
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [{
          model: Post,
          attributes: ['id', 'title', 'post_body', 'created_at']
            
      },
      {
          model: Comment,
          attributes: ['id', 'comment_body', 'created_at'],
          include: {
            model: Post,
            attributes: ['title']
          }
      }
    ]
  })
  .then(userData => {
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id! '});
      return;
    }
    res.json(userData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// POST request for new user
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  .then(userData => {
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.json(userData);
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// POST route for user log in
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// POST route for user log out
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// PUT route for updating user by id
router.put('/:id', (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: { id: req.params.id }
  })
  .then(userData => {
    if (!userData) {
      res.status(404).json({ message: 'No user with this id found!' });
      return;
    }
    res.json(userData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// DELETE route for user by id
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(userData => {
    if (!userData) {
      res.status(404).json({ message: 'No user with this id found!' });
      return;
    }
    res.json(userData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET route for all of logged in user posts 
router.get('/', withAuth, (req,res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'title', 'post_body', 'created_at'],
        include: [{
                model: Comment,
                attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            { 
                model: User,
                attributes: ['username']
            },
        ]
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({ message: 'No post with this id found!' });
            return;
        }
        
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET route for edit post for logged in user
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'title', 'post_body', 'created_at'],
        include: [{ 
                model: User, 
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({ message: 'No post with this id found!' });
            return;
        }

        const post = postData.get({ plain: true });
        res.render('edit-post', { post, loggedIn: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})
router.get('/new', (req, res) => {
    res.render('new-post');
});

module.exports = router;
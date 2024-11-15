const { Post, User, Comment } = require('../models');
const router = require('express').Router();

// GET route to show all posts on homepage
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'post_body', 'created_at'],
        include: [{
                model: Comment,
                attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['user_name']
                }
            },
            {   
                model: User,
                attrinutes: ['user_name']
            }
        ]
    })
    .then(postData => {
        const posts = postsData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET route for log in from homepage
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// GET route for signup from homepage
router.get('/signup', (req, res) => {
    res.render('signup');
});

// GET route for post by id 
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_body', 'title', 'created_at'],
        include: [{
                model: Comment,
                attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['user_name']
                }
        },
        {
            model: User,
            attributes: ['user_name']
        }
    ]
})
.then(postData => {
    if (!postData) {
        res.status(404).json({ message: 'No post with this id found!' });
        return;
    }
    const post = postData.get({ plain: true });
    console.log(post);
    res.render('single-post', { post, loggedIn: req.session.loggedIn });
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

// GET route for posts and comments
router.get('/posts-comments', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_body', 'title', 'created_at'],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['user_name']
            }
        },
        {
            model: User,
            attributes: ['user_name']
        }
    ]
})
.then(postData => {
    if (!postData) {
        res.status(404).json({ message: 'No post with this id found!' });
        return;
    }
    const post = postData.get({ plain: true });
    res.render('posts-comments', { post, loggedIn: req.session.loggedIn });
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

module.exports = router;
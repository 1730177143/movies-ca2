import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.SECRET || 'default_secret';
const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password||!req.body.email) {
            return res.status(400).json({success: false, msg: 'Username, email and password are required.'});
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({success: false, msg: 'Internal server error.'});
    }
}));

/// 更新用户，但不接受ID更改
router.put('/:id', async (req, res) => {
    const updatedData = req.body;
    delete updatedData._id; // 不接受用户提交的ID

    try {
        const result = await User.updateOne({_id: req.params.id}, updatedData);
        if (result.matchedCount) {
            res.status(200).json({success: true, message: 'User Updated Successfully'});
        } else {
            res.status(404).json({success: false, message: 'User Not Found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
});

async function registerUser(req, res) {
    // Add input validation logic here
    await User.create(req.body);
    res.status(201).json({success: true, msg: 'User successfully created.'});
}

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({success: false, msg: 'Authentication failed. User not found.'});
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({username: user.username}, jwtSecret);
        res.status(200).json({success: true, token: 'Bearer ' + token});
    } else {
        res.status(401).json({success: false, msg: 'Wrong password.'});
    }
}

router.post('/playlist/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const movieId = req.body.movieId;
        if (!movieId) {
            return res.status(400).json({success: false, message: 'Movie ID is required.'});
        }
        const user = await User.findById(userId);
        if (user) {
            await user.addToPlaylist(movieId);
            res.status(200).json({success: true, message: 'Movie added to playlist.'});
        } else {
            res.status(404).json({success: false, message: 'User not found.'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Internal server error.'});
    }
});
router.delete('/playlist/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const movieId = req.body.movieId;
        if (!movieId) {
            return res.status(400).json({success: false, message: 'Movie ID is required.'});
        }
        const user = await User.findById(userId);
        if (user) {
            await user.removeFromPlaylist(movieId);
            res.status(200).json({success: true, message: 'Movie removed from playlist.'});
        } else {
            res.status(404).json({success: false, message: 'User not found.'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Internal server error.'});
    }
});
router.post('/favourites/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const movieId = req.body.movieId;
        if (!movieId) {
            return res.status(400).json({success: false, message: 'Movie ID is required.'});
        }
        const user = await User.findById(userId);
        if (user) {
            await user.addToFavourites(movieId);
            res.status(200).json({success: true, message: 'Movie added to favourites.'});
        } else {
            res.status(404).json({success: false, message: 'User not found.'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Internal server error.'});
    }
});
router.delete('/favourites/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const movieId = req.body.movieId;
        if (!movieId) {
            return res.status(400).json({success: false, message: 'Movie ID is required.'});
        }
        const user = await User.findById(userId);
        if (user) {
            await user.removeFromFavourites(movieId);
            res.status(200).json({success: true, message: 'Movie removed from favourites.'});
        } else {
            res.status(404).json({success: false, message: 'User not found.'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Internal server error.'});
    }
});
router.post('/follows/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const personId = req.body.personId;
        if (!personId) {
            return res.status(400).json({success: false, message: 'Person ID is required.'});
        }
        const user = await User.findById(userId);
        if (user) {
            await user.followPerson(personId);
            res.status(200).json({success: true, message: 'Person followed.'});
        } else {
            res.status(404).json({success: false, message: 'User not found.'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Internal server error.'});
    }
});
router.delete('/follows/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const personId = req.body.personId;
        if (!personId) {
            return res.status(400).json({success: false, message: 'Person ID is required.'});
        }
        const user = await User.findById(userId);
        if (user) {
            await user.unfollowPerson(personId);
            res.status(200).json({success: true, message: 'Person unfollowed.'});
        } else {
            res.status(404).json({success: false, message: 'User not found.'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Internal server error.'});
    }
});

export default router;
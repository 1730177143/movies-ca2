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
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({success: false, msg: 'Username and password are required.'});
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else if (req.query.action === 'googleLogin') {
            await googleUser(req, res);
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

async function googleUser(req, res) {
    let user = await User.findByUserName(req.body.username);
    if (!user) {
        await User.create(req.body);
        user = await User.findByUserName(req.body.username);
    }
    res.status(202).json({success: true, userId: user._id, msg: 'User successfully created.'});
}

async function registerUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (user) {
        return res.status(401).json({success: false, msg: 'Registration failed. User\'s name has been used.'});
    }
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
        res.status(200).json({success: true, userId: user._id, token: 'Bearer ' + token});
    } else {
        res.status(401).json({success: false, msg: 'Wrong password.'});
    }
}

router.get('/playlist/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({msg: "User not found"});
        }
        res.status(200).json({playlist: user.playlist});
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({msg: "Error fetching user"});
    }
});

router.post('/playlist/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const movieId = req.body.movieId;
        if (!movieId) {
            return res.status(400).json({success: false, message: 'Movie ID is required.'});
        }
        await User.findOneAndUpdate(
            {_id: userId},
            {$addToSet: {playlist: movieId}},
            {new: true}
        );
        res.status(200).json({success: true, message: 'Movie added to playlist.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Internal server error.'});
    }
})
;
router.delete('/playlist/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const movieId = req.body.movieId;
        if (!movieId) {
            return res.status(400).json({success: false, message: 'Movie ID is required.'});
        }
        await User.findOneAndUpdate(
            {_id: userId},
            {$pull: {playlist: movieId}},
            {new: true}
        );
        res.status(200).json({success: true, message: 'Movie removed from playlist.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Internal server error.'});
    }
});
router.get('/favourites/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({msg: "User not found"});
        }
        res.status(200).json({favourites: user.favourites});
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({msg: "Error fetching user"});
    }
});
router.post('/favourites/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const movieId = req.body.movieId;
        if (!movieId) {
            return res.status(400).json({success: false, message: 'Movie ID is required.'});
        }
        await User.findOneAndUpdate(
            {_id: userId},
            {$addToSet: {favourites: movieId}},
            {new: true}
        );
        res.status(200).json({success: true, message: 'Movie added to favourites.'});

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
        await User.findOneAndUpdate(
            {_id: userId},
            {$pull: {favourites: movieId}},
            {new: true}
        );
        res.status(200).json({success: true, message: 'Movie removed from favourites.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Internal server error.'});
    }
});

router.get('/follows/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({msg: "User not found"});
        }
        res.status(200).json({follows: user.follows});
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({msg: "Error fetching user"});
    }
});
router.post('/follows/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const personId = req.body.personId;
        if (!personId) {
            return res.status(400).json({success: false, message: 'Person ID is required.'});
        }

        await User.findOneAndUpdate(
            {_id: userId},
            {$addToSet: {follows: personId}},
            {new: true}
        );
        res.status(200).json({success: true, message: 'Person followed.'});
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
        await User.findOneAndUpdate(
            {_id: userId},
            {$pull: {follows: personId}},
            {new: true}
        );
        res.status(200).json({success: true, message: 'Person unfollowed.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Internal server error.'});
    }
});

export default router;
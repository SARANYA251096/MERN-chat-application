const express = require('express');
const { requireSignin, isAuth } = require('../utils/authentication');

const router = express.Router();

router.get('/:userId/chat', requireSignin, isAuth, (req, res) => {
    res.send({message:"Welcome to Chat Room"})
})

module.exports = router;
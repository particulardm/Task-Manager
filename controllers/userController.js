const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const bcryptSalt = 10;


const registration = async function(req, res) {
    const { username, email, password } = req.body;

    try {
        const hash = await bcrypt.hash(password, bcryptSalt);
        console.log(hash);

        const user = await User.create({ username, email, password: hash });
        console.log('new user:', user);
        res.json({message: 'registration successful,', user});
    } catch(error) {
        console.error(error);
        return res.status(400).json({ message: "couldn't finish the registration" });
    } finally {
    }
};

const login = async function(req, res) {
    const { username, password } = req.body;

    try {
        const userExists = await User.exists({ username });
        if (!userExists) {
            console.error('The client sends incorrect login');
            return res.status(400).json({ message: "This login doesn't exist"})
        }

        const user = await User.findOne({ username });
        console.log(user);
        const userPassword = user.password;

        const passwordMatches = await bcrypt.compare(password, userPassword);
        if (!passwordMatches) {
            console.error('The client sends incorrect password');
            return res.status(400).json({ message: "Wrong password"})
        }

        const secretKey = process.env.SECRET;
        const id = String(user._id);
        console.log(id);
        const token = jwt.sign({ username, id }, secretKey, { expiresIn: '24h' });
        console.log(token);

        res.setHeader('Authorization', `Bearer ${token}`);
        res.json({message: 'login successful,', username: user.username});
    } catch(error) {
        console.error(error);
        return res.status(400).json({ message: "can't login" });
    } finally {
    }
};

module.exports = { registration, login }
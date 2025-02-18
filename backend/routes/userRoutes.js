const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

require('dotenv').config();

const router = express.Router();

router.post('/register', async (req, res)=>{
    const {name, role, email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if (user){
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({name, role, email, password});

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = { user: { id: user._id } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token)=>{
            if (err) throw err;
            res.json({ token });
        });

    }catch(err){
        res.send(500).status(err)
    }

});

router.post('/login', async (req, res)=>{

    const {email, password}= req.body;

    try{
        let user = await User.findOne({email});
        console.log(user)
        if (!user){
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
            });



    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;





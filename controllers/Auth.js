// controllers/Auth.js
const bcrypt = require('bcrypt');
const User = require('../models/User'); // ⬅️ Import the User model
const jwt = require('jsonwebtoken');
require('dotenv').config();


// Signup route handler
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Error in hashing password" });
        }

        const user = await User.create({ name, email, password: hashedPassword, role });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Something went wrong while signing up" });
    }
}

// Placeholder for Login
exports.login = async (req, res) => {
    try {
        //data fetch from the body
        const { email, password } = req.body;
        //valiadation on Email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the details carefully',
            });
        }
        //check for register user
        let user = await User.findOne({ email });

        //if not a registerd 
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registerd"
            });

        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,

        };
        //verify password and generate  jwt a token 
        if (await bcrypt.compare(password, user.password)) {
            //password match
            let token = jwt.sign(payload, process.env.JWT_SECRET,
                {
                    expiresIn: '2h',
                }
            );
            user=user.toObject(); //convert mongoose document to plain object

            user.token = token; //store token in user
            console.log(user);
            user.password = undefined; //hide password
            console.log(user);

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            res.cookie('token', token, options).status(200).json({
                success: true,
                message: "User logged in successfully",
                user,
            });

        }
        else {
            //password do not match
            return res.status(403).json({
                success: false,
                message: "Password Incorrect",
            });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while logging in",
        });

    }
}
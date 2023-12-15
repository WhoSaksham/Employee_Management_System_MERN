const UserAuth = require("../models/auth.model");
const bcrypt = require('bcryptjs');
const { generateToken } = require("../utils/functions");

const signupController = async (req, res) => {
    try {
        // Check for unique email
        const userExists = await UserAuth.findOne({ email: req.body.email });

        if (userExists) return res.status(400).json({ success: false, message: 'Another User already exists with this Email.' });

        // Signup user
        const user = UserAuth({
            fullName: req.body.fullName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10) // Secure password
        });

        const response = await user.save();

        // res.set("access_token", `Bearer ${generateToken({ user: { email: req.body.email } })}`);

        res.status(201).json({ success: true, message: "New User Created Successfully.", response, token: `Bearer ${generateToken({ user: { email: req.body.email } })}` });
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
        console.log("Error =>", error);
    }
}

const loginController = async (req, res) => {
    // check if user really exists
    const userExists = await UserAuth.findOne({ email: req.body.email });

    if (!userExists) return res.status(400).json({ success: false, message: "Invalid Email or Password" })

    try {
        // Verify Password
        if (!bcrypt.compareSync(req.body.password, userExists.password)) return res.status(400).json({ success: false, message: "Invalid Email or Password" });

        // res.set("access_token", `Bearer ${generateToken({ user: { email: req.body.email } })}`);

        res.status(200).json({ success: true, message: "User Login Success.", response: userExists, token: `Bearer ${generateToken({ user: { email: req.body.email } })}` });
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
        console.log("Error =>", error);
    }
}

module.exports = { signupController, loginController }
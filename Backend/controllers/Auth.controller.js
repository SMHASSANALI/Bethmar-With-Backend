const USER = require("../modals/User.schema.js");
const generateTokenAndSetCookie = require("../utils/generateToken.js");

const SALT_ROUNDS = parseInt(process.env.SALT) || 10;
const PEPPER = process.env.PEPPER || 'default_pepper';

const addSaltAndPepper = async (password) => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password + PEPPER, salt);
    return hashedPassword;
};

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await USER.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await addSaltAndPepper(password);

        const newUser = await USER.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({ message: "User registered successfully", data: newUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await USER.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password + PEPPER, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateTokenAndSetCookie(user._id, res);

        return res.status(200).json({ message: "User logged in successfully", data: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
const resetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const user = await USER.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const resetLink = Math.random().toString(36).slice(-8);
        user.resetLink = resetLink;
        await user.save();
        return res.status(200).json({ message: "Reset link sent successfully", data: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
const logout = (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    register,
    login,
    resetPassword,
    logout
};

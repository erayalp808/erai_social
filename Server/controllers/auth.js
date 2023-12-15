import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTERING */
export const register = async (request, response) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = request.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        })
        const savedUser = await newUser.save();
        response.status(201).json(savedUser);
    } catch (error) {
        response.status(500).json({ errorMessage: error.message });
    }
}

/* LOGGING IN */
export const login = async (request, response) => {
    try {
        const { email, password } = request.body;
        const user = await User.findOne({ email: email });
        if (!user) return response.status(400).json({ errorMessage: "User does not exist."});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return response.status(400).json({ errorMessage: "Invalid password."});

        const token = jwt.sign({ id: user._id }, process.env)
        delete user.password;
        response.status(200).json({ token, user });
    } catch (error) {
        response.status(500).json({ errorMessage: error.message });
    }
}
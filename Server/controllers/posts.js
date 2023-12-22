import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (request, response) => {
    try {
        const { userId, description, picturePath } = request.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save();

        const posts = await Post.find();

        response.status(201).json(posts);
    } catch (error) {
        response.status(409).json({ errorMessage: error.message });
    }
}

/* READ */
export const getFeedPosts = async (request, response) => {
    try {
        const posts = await Post.find();

        response.status(200).json(posts);
    } catch (error) {
        response.status(404).json({ errorMessage: error.message });
    }
}

export const getUserPosts = async (request, response) => {
    try {
        const { userId } = request.params;
        const posts = await Post.find({ userId });
        response.status(200).json(posts);
    } catch (error) {
        response.status(404).json({ errorMessage: error.message });
    }
}

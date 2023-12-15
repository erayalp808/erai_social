import User from "../models/User";

/* READ */
export const getUser = async (request, response) => {
    try {
        const { id } = request.params;
        const user = await User.findById(id);
        response.status(200).json(user);
    } catch (error) {
        response.status(404).json({ errorMessage: error.message });
    }
}

export const getUserFriends = async (request, response) => {
    try {
        const { id } = request.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            });
        response.status(200).json(formattedFriends);
    } catch (error) {
        response.status(404).json({ errorMessage: error.message });
    }
}
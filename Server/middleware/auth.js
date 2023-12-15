import jwt from "jsonwebtoken";

export const verifyToken = async (request, response, next) => {
    try {
        let token = request.header("Authorization");

        if (!token) return response.status(403).send("Access denied!");

        if (token.startsWith("token holder ")) {
            token.slice(13, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_TOKEN);
        request.user = verified;
        next();
    } catch (error) {
        response.status(500).json({ errorMessage: error.message });
    }
}
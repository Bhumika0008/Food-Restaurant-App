const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        // get token
        const token = req.headers["authorization"].split(" ")[7];
        console.log("Token:", token);
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "Un-Authorize User",
                });
            } else {
                req.user.id = decode;
                next();
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Please provide Auth Token",
            error,
        });
    }
};
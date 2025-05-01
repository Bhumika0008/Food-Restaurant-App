const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// GET USER INFO
const getUserController = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find user by ID
        const user = await userModel.findById(userId);

        // Validation: If user is not found, return an error
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found",
            });
        }

        // Hide the password before sending response
        user.password = undefined;

        // Send response with user data
        res.status(200).send({
            success: true,
            message: "User fetched successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get User API",
            error: error.message,
        });
    }
};

// UPDATE USER
const updateUserController = async (req, res) => {
    try {
        //Find User
        const user = await userModel.findById(req.user.id);
        //Validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found'
            })
        }
        //Update
        const { userName, address, phone } = req.body
        if (userName) user.userName = userName
        if (address) user.address = address
        if (phone) user.phone = phone
        // Save User
        await user.save()
        res.status(200).send({
            success: true,
            message: 'User Updated Successfully'
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Update User API',
            error
        })
    }
};
// Reset Password
const resetPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body
        if (!email || !newPassword || !answer) {
            return res.status(500).send({
                success: false,
                message: 'Please Provide All Fields'
            })
        }
        const user = await userModel.findOne({ email, answer })
        if (!user) {
            return res.status(500).send({
                success: false,
                message: 'User Not Found Or Invalid Answer'
            })
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password Reset Sucessfully",
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Password Reset API',
            error
        })
    }
}
// UPDATE USER PASSWORD
const updatePasswordController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById(req.body.id);
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found",
            });
        }
        // get data from user
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).send({
                success: false,
                message: "Please Provide Old and New Password",
            });
        }
        //check user password  | compare password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid old password",
            });
        }
        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password Updated!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Password Update API",
        });
    }
};

// DELETE USER ACCOUNT
const deleteUserController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            message: "Your Account has been deleted",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Delete User API",
            error
        });
    }
};
module.exports = {
    getUserController,
    updateUserController,
    resetPasswordController,
    updatePasswordController,
    deleteUserController
};
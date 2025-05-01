const mongoose = require('mongoose')

//schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'user name is required']
    },

    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'password is required']
    },

    address: {
        type: Array
    },

    phone: {
        type: String,
        required: [true, 'phone number is required']
    },

    usertype: {
        type: String,
        required: [true, 'user type is required'],
        default: 'client',
        enum: ['client', 'admin', 'vendor', 'driver']
    },

    profile: {
        type: String,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw37FKuQYhSzwPepHXV-g8J4&ust=1744567504584000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMiFk82K04wDFQAAAAAdAAAAABAE'
    },
    // answer: {
    //     type: String,
    //     required: [true, "Answer is Required"],
    // }
}, { timestamps: true })

//export
module.exports = mongoose.model("User", userSchema)
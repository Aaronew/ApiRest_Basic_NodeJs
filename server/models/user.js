// Packages
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let Validroles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: ' {VALUE} Invalid Role'
}

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required ']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: Validroles
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Skip password of body
userSchema.methods.toJSON = function () {

    let user_data = this
    let userObject = user_data.toObject();

    delete userObject.password;

    return userObject;
}


userSchema.plugin(uniqueValidator, {
    message: '{PATH} is already in use'
});

module.exports = mongoose.model('User', userSchema);
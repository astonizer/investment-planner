const mongoose = require('mongoose');
const { isAlpha, isEmail } = require('validator');
const bcrypt = require('bcrypt');

// schema for a user's investments
const investmentSchema = new mongoose.Schema({
    asset: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    time: {
        type: Number
    }
});

// schema for the user itself
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        validate: [isAlpha, 'Please enter a valid username']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Please enter a password with atleast 6 characters']
    },
    investments : [investmentSchema]
});

// hashing passwords before saving to db
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// user defined login function
userSchema.statics.login = async function(email, password) {
    // find if specified user exists
    const user = await this.findOne({ email });
    if(user) {
        // compare the specified password with original password
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
}

const User = mongoose.model('user', userSchema);

module.exports = User;
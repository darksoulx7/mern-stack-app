const User = require('../models/UserModel');
const Review = require('../models/ReviewModel');
const { hashPassword} = require('../../utils/hashPassword');

exports.getUsers = async () => {
    return await User.find({}).select('-password');
}

exports.createUser = async (userObj) => {
    return await User.create(userObj);
}

exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
}

exports.updateUserProfile = async (body, user) => {

    user.name = body.name || user.name;
    user.lastName = body.lastName || user.lastName;
    user.email = body.email || user.email;
    user.phoneNumber = body.phoneNumber;
    user.address = body.address;
    user.country = body.country;
    user.zipCode = body.zipCode;
    user.city = body.city;
    user.state = body.state;

    if (body.password !== user.password) {
        user.password = hashPassword(body.password);
    }
    await user.save();

}

exports.getUserProfile = async (id) => {
    return await User.findById(id).orFail();
}

exports.createReview = async(obj) => {
    return await Review.create(obj);
}
const User = require('../models/UserModel');
const Review = require('../models/ReviewModel');
const Product = require('../models/ProductModel');
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

exports.createReview = async (review) => {
    return await Review.create(review);
}

exports.findProductById = async (id) => {
    return await Product.findById(id).populate('reviews');
}

exports.insertRevInProdct = async (product, reviewId, rating) => {
  let prc = [...product.reviews];
  prc.push({ rating: rating });
  product.reviews.push(reviewId);

  if (product.reviews.length === 1) {
    product.rating = Number(rating);
    product.reviewsNumber = 1;
  } else {
    product.reviewsNumber = product.reviews.length;
    product.rating =
      prc
        .map((item) => Number(item.rating))
        .reduce((sum, item) => sum + item, 0) / product.reviews.length;
  }
  await product.save();
};

exports.findUserById = async (id) => {
    return await User.findById(id).select("name lastName email isAdmin").orFail();
}

exports.saveUser = async(user, body) => {
    user.name = body.name || user.name;
    user.lastName = body.lastName || user.lastName;
    user.email = body.email || user.email;
    user.isAdmin = body.isAdmin || user.isAdmin;

    await user.save()
}

exports.deleteUser = async(user) => {
    await user.remove();
}
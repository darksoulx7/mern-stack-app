const yup = require('yup');

const reviewSchema = yup.object({
    comment: yup.string().required(),
    rating: yup.number().min(1).max(5).required()
});

module.exports = { reviewSchema };
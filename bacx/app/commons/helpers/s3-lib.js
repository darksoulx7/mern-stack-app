require("dotenv").config({ path: '../../../.env' });
const S3 = require("aws-sdk/clients/s3");

// s3 config
const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION
});
s3.config.update({ signatureVersion: 'v4' });

// actual function for uploading file
exports.uploadFileToS3 = async (images) => {

    const params = images.map(image => {
        return {
            Bucket: process.env.AWS_BUCKET, // bucket you want to upload to
            Key: `images/${Date.now()}-${image.name}`, // put all image to fileupload folder with name images-${Date.now()}${file.name}`
            Body: image.data,
        };
    })
    return await Promise.all(params.map(param => s3.upload(param).promise()))
}

exports.getPreSignedUrl = (key) => {
    return s3.getSignedUrl('getObject', {
        Bucket: process.env.AWS_BUCKET,
        Key: key,
        Expires: 60 * 5 * 24
    })
}
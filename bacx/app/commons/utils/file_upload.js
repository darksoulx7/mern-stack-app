// const multer = require('multer');

// const song_storage = multer.diskStorage({
//   destination: './assets/images/songs',
//   filename(req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const song_upload = multer({
//   storage: song_storage,
//   limits: {
//     fileSize: 100000000,
//   },
// });

// const playlist_storage = multer.diskStorage({
//   destination: './assets/images/playlist/',

//   filename(req, file, cb) {
//     cb(null, file.originalname);
//     console.log(req.file);
//   },
// });

// const playlist_upload = multer({
//   storage: playlist_storage,
//   limits: {
//     fileSize: 100000000,
//   },
// });

// const album_storage = multer.diskStorage({
//   destination: './assets/images/album',
//   filename(req, file, cb) {
//     const epochtime = Math.floor(Date.now() / 1000);
//     console.log(epochtime);
//     cb(null, epochtime + file.originalname);
//   },
// });

// const album_upload = multer({
//   storage: album_storage,
//   limits: {
//     fileSize: 100000000,
//   },
// });

// const user_storage = multer.diskStorage({
//   destination: './assets/images/user',
//   filename(req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const user_upload = multer({
//   storage: user_storage,
//   limits: {
//     fileSize: 100000000,
//   },
// });


// module.exports = {
//   song_upload,
//   playlist_upload,
//   album_upload,
//   user_upload,
// };


const multer = require('multer');
const { v4 } = require('uuid');
const docFilter = (req, file, cb) => {
  cb(null, true);
  // if (
  //   file.mimetype === 'application/pdf' ||
  //   file.mimetype === 'image/png' ||
  //   file.mimetype === 'image/jpg' ||
  //   file.mimetype === 'image/jpeg'
  // ) {
  //   cb(null, true);
  // } else {
  //   cb('Please upload only selected formats', false);
  // }
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${v4()}-${file.originalname}`);
  }
});
const uploadFile = multer({ storage, fileFilter: docFilter });



// // var storage = multer.diskStorage({
// //   destination: function (request, file, callback) {
// //       //tag and path are 2 function to set the name and path directory

// //       //tag example = ['IV190', '207401_SITRASB', '7738_IV19001G10101']
// //       var tag = file.originalname.split('-');

// //       //path example = "C:/progetti/sios4_nodejs/SIOS4_siosnew/Documentale/
// //                      //Commesse/207401_SITRASB/Opere/IV190/foto"
// //       var path = commons.getImagesPath(tag[0], tag[1], false);

// //       mkdirp.sync(path)

// //       return callback(null, path);
// //   },
// //   filename: function (request, file, callback) {
// //       //Example filename: 7738_IV19001G111.jpg
// //       var tag = file.originalname.substr(file.originalname.lastIndexOf('-') + 1);
// //       return callback(null, tag)
// //   }
// // });


// // var upload = multer({storage: storage});

// const uploads = multer({ storage: storage }).array('files', 5);


// module.exports =  uploadFile;

// const multer = require('multer');
// const { v4 } = require('uuid');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

module.exports = uploadFile;


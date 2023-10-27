const multer = require("multer");
const _storege = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("ðŸš€ ~ file: upload.ts:11 ~ file", process.cwd());
        cb(null, `${process.cwd()}`);
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now());
      },
});
const upload = multer({ storage: _storege });

module.exports = upload
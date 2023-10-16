const multer = require("multer");
const _storege = multer.diskStorage({});
  const upload = multer({ storage: _storege });

  module.exports = upload
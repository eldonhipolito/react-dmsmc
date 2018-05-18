const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const multer  = require('multer');
const fs = require("fs");

const crypto = require('crypto');

var upload = multer({ dest: 'tmp/'});

app.post('/api/computeChecksum', upload.single('file'), (req, res) => {
    console.log(req.files);
    console.log(req.file);
    var sha256Inst = crypto.createHash("sha256");
  fs.readFile(req.file.path, function(err, data) {
    sha256Inst.update(data);
    res.send(sha256Inst.digest('hex'));
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
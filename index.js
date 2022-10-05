const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors')
const bodyParser = require('body-parser')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
var ImageKit = require("imagekit");


var imagekit = new ImageKit({
  publicKey: "public_Xjr44zYRtbg+tTKE/SvZsHK73Wg=",
  privateKey: "private_YazBLCewcUdMlWADIVQCjqT8aPQ=",
  urlEndpoint: "https://ik.imagekit.io/v41d7arf6/"
});

app.use(express.json({ extended: false }));
app.use(cors());
app.use(bodyParser.json());


app.post('/upload-photo', upload.single('file'), (req, res) => {
  console.log("adsasd");
  fs.readFile(req.file.path, function (err, imageBuffer) {
    imagekit.upload({
      file: imageBuffer, //required
      fileName: req.file.filename,
    }, function (error, result) {
      if (error) console.log(error);
      else {
        res.status(200).send({ result });
      }
    })
  })
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

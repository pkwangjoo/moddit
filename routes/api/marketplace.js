const express = require('express');
const router = express.Router();
const fs = require('fs');
// const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const isLoggedIn = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Marketplace = require('../../models/Marketplace');
// const methodOverride = require('method-override');
const db = require('../../config/default.json')
const mongoURI = db.mongoURI;

// Create Mongo Connection
const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Init gfs
let gfs;

conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Create Storage
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage })

// @router GET
// @desc Get all Marketplace Posts
// router.get('/', async (req, res) => {
//     try {
//         let marketplace = await Marketplace.find();
//         res.json(marketplace);
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).send('Server Error');
//     }
// });

router.post('/', isLoggedIn, async (req, res) => {
    try {
        const title = req.body.title;
        let newMarketplace = new Marketplace({
            title,
        });

        await newMarketplace.save();
        res.json(newMarketplace);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route POST 
// @desc Uploads file to DB
router.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
    res.redirect('/');
});


// router.post('/upload', (req, res) => {
//     req.pipe(gfs.createWriteStream({
//         filename: req.body.name
//     }).once('close', function(savedFile) {
//         console.log('File Saved', savedFile);
//         console.log(savedFile);
//         return res.json({ file: savedFile })
//     }));
// });

router.get('/', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if files exist
        if (!files || files.length === 0) {
            return res.status(404).json('Files do not exist');
        };
        return res.json(files);
    });

});

router.get('/:filename', (req,res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json('File does not exists');
        };
        return res.json(file);
    });
});

router.get('/:filename/download', (req, res) => {
    // Check file exists on DB
    var filename = req.params.filename;
    gfs.files.findOne({ filename: filename }, (err, file) => {
        if (!file || file.length === 0 ) {
            return res.status(404).send('File Not Found');
        }
        var readstream = gfs.createReadStream({ filename: filename });
        readstream.pipe(res);
    });
});

// router.post("/", isLoggedIn, async (req, res) => {
//     try {
//       const title = req.body.title;
  
//       let newForum = new Forum({
//         title,
//       });
  
//       await newForum.save();
//       res.json(newForum);
//     } catch (err) {
//       console.log(err.message);
//       res.status(500).send("server error");
//     }
//   });

module.exports = router;
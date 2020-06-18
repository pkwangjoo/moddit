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
// const File = require('../../models/File');
// const methodOverride = require('method-override');
const db = require('../../config/default.json')
const mongoURI = db.mongoURI;
const { check, validationResult } = require('express-validator');

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

// @router GET
// @desc Gets all the posts
router.get('/', isLoggedIn, async (req, res) => {
    try {
        let marketplace = await Marketplace.find()
            .sort({ date: -1 });
        console.log(marketplace);
        res.json(marketplace);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

// @router POST
// @desc Creates a new marketplace
router.post(
    '/', 
    [
        isLoggedIn,
        [
            check("text", "text is require").not().isEmpty(),
            check("title", "title is require").not().isEmpty(),
            check("file", "file is required").not().isEmpty(),
        ],
        upload.single('file'),
    ],

    async (req, res) => {
        try {
            const { title, text } = req.body;

            const formData = req.body;

            console.log( title );
            console.log( text );
            console.log( req.file )
            console.log( req.user.id )

            let newMarketplace = new Marketplace({
                title: title,
                text: text,
                file: req.file.filename, 
                author: req.user.id,
            });
            await newMarketplace.save();
            res.json(newMarketplace);
            res.redirect('/')
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    }
);


// @route POST 
// @desc Uploads file to DB
// router.post('/upload', upload.single('file'), (req, res) => {
//     res.json({ file: req.file });
//     res.redirect('/');
// });


// router.post('/upload', (req, res) => {
//     req.pipe(gfs.createWriteStream({
//         filename: req.body.name
//     }).once('close', function(savedFile) {
//         console.log('File Saved', savedFile);
//         console.log(savedFile);
//         return res.json({ file: savedFile })
//     }));
// });

// router.get('/', (req, res) => {
//     gfs.files.find().toArray((err, files) => {
//         // Check if files exist
//         if (!files || files.length === 0) {
//             return res.status(404).json('Files do not exist');
//         };
//         return res.json(files);
//     });

// });

//@router DELETE
//@desc Deletes a marketplace
router.delete('/:marketplace_id', async (req, res) => {
    try {
        const marketplace = await Marketplace.findById(req.params.marketplace_id);

        if (!marketplace.author._id === req.user.id) {
            return res.status(401).send('Not allowed to delete');
        }

        await marketplace.remove();
        res.json({ msg: 'Post was deleted' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//@router PUT
//@desc Add likes to a marketplace
router.put('/:marketplace_id/like', isLoggedIn, async (req, res) => {
    try {
        const marketplace = await Marketplace.findById(req.params.marketplace_id);

        if (marketplace.likes.some((like) => like.user.equals(req.user.id))) {
            return res.status(400).json({ msg: 'Post already liked' });
        }

        marketplace.likes.unshift({ user: req.user.id });

        await marketplace.save();

        return res.json(marketplace.likes);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//@router PUT
//@desc Removes likes from a marketplace
router.put('/:marketplace_id/unlike', isLoggedIn, async(req, res) => {
    try {
        const marketplace = await Marketplace.findById(req.params.marketplace_id);

        if (marketplace.likes.some((like) => like.user.equals(req.user.id))) {
            return res.status(400).json({ msg: 'Post not liked yet' });
        }

        marketplace.likes = marketplace.likes.filter(({ user }) => !user.equals(req.user.id));

        await marketplace.save();

        return res.json(marketplace.likes);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


router.get('/:marketplace_id', (req,res) => {
    gfs.files.findOne({ filename: req.params.marketplace_id }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json('File does not exists');
        };
        return res.json(file);
    });
});

router.get('/:marketplace_id/download', (req, res) => {
    // Check file exists on DB
    var filename = req.params.marketplace_id;
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
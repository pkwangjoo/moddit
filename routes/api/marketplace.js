const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
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
})

// @route POST 
// @desc Uploads file to DB
router.post('/upload', (req, res) => {
    req.pipe(gfs.createWriteStream({
        filename: 'test'
    }).once('close', function(savedFile) {
        console.log('File Saved', savedFile);
        return res.json({ file: savedFile })
    }));
});

module.exports = router;
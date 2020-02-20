
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');
var streamifier = require('streamifier');
const path = require('path');

const DIR = './docs/';
module.exports = function(router) {
    router
    .post('/applciant_document/:userId', uploadApplicantDocument)
    .get('/applicant_document/:filename', getDocuments)
    .post('/payment_upload/:userId', uploadEreceipt)
    .get('/zip/:userId', downalodZip)
         
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        // console.log(file)
        cb(null, 'userdoc')
    }
})



var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jepg' || file.mimetype === 'pdf') {

            // console.log(req.mimetype)
       cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
    }
}).array('docs', 12)




function uploadApplicantDocument (req, res) {
     let userId = req.params.userId

    var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        chunkSizeBytes: 1024,
        bucketName: 'filesBucket'
    });
    streamifier.createReadStream(req.files.attachment.data).
        pipe(gridfsbucket.openUploadStream(userId +'_'+ req.files.attachment.name, {contentType: req.files.attachment.mimetype})).
        on('error', function (error) {
            assert.ifError(error);
        }).
        on('finish', function () {
            console.log('done!');
            getDocuments(userId)
            res.status(200).json({
                success: true,
                msg: 'File Uploaded successfully..'
            });
        });

        
}


function uploadEreceipt(req, res) {
    let userId = req.params.userId;
    var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        chunkSizeBytes: 1024,
        bucketName: 'paymentsBucket'
    });

    streamifier.createReadStream(req.files.attachment.data).
    pipe(gridfsbucket.openUploadStream(userId +'_payment_'+ req.files.attachment.name, {contentType: req.files.attachment.mimetype})).
    on('error', function (error) {
        assert.ifError(error);
    }).
    on('finish', function () {
        console.log('done!');
        writeEreceipt(userId)
        res.status(200).json({
            success: true,
            msg: 'File Uploaded successfully..'
        });
    });
}


function getDocuments (filename) {

    var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        chunkSizeBytes: 1024,
        bucketName: 'filesBucket'
    });
    gridfsbucket.find({}).toArray((err, files) => {
        // Error checking
        if(!files || files.length === 0){
            console.log('error on files length found');
        }
     //    console.log(files)

         files.forEach(doc => {
            gridfsbucket.openDownloadStreamByName(doc.filename).
            pipe(fs.createWriteStream(path.join(__dirname, `/docs/${doc.filename}`))).
                on('error', function (error) {
                    console.log("error" + error);
                 
                }).
                on('finish', function () {
                    console.log('done!');
                    generateZip(filename)
                    
                });
         })

         return;

    });
}

function writeEreceipt(filename) {
    var gridfsbucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        chunkSizeBytes: 1024,
        bucketName: 'paymentsBucket'
    });
    gridfsbucket.find({}).toArray((err, files) => {
        // Error checking
        if(!files || files.length === 0){
            console.log('error on files length found');
        }
     //    console.log(files)

         files.forEach(doc => {
            gridfsbucket.openDownloadStreamByName(doc.filename).
            pipe(fs.createWriteStream(path.join(__dirname, `/docs/${doc.filename}`))).
                on('error', function (error) {
                    console.log("error" + error);
                 
                }).
                on('finish', function () {
                    console.log('done!');
                  //  generateZip(filename)
                    
                });
         })

         return;

    });
}

function downalodZip(req, res) {
    let userId = req.params.userId;
    res.download(path.join(__dirname, `/${userId}.zip`), (err) => {
        if (err) {
            next(err)
        } else {
            // console.log(customer_email)
            return ;
        }
    })
}


function generateZip(userId) {
    var fs = require('fs');
    var archiver = require('archiver');
   
   // create a file to stream archive data to.
   var output = fs.createWriteStream(__dirname + `/${userId}.zip`);
   var archive = archiver('zip', {
     zlib: { level: 9 } // Sets the compression level.
   });
   



   // listen for all archive data to be written
   // 'close' event is fired only when a file descriptor is involved
   output.on('close', function() {
    //  console.log(archive.pointer() + ' total bytes');
     // console.log('archiver has been finalized and the output file descriptor has closed.');
   });
   
   // This event is fired when the data source is drained no matter what was the data source.
   // It is not part of this library but rather from the NodeJS Stream API.
   // @see: https://nodejs.org/api/stream.html#stream_event_end
   output.on('end', function() {
    // console.log('Data has been drained');
   });
   
   // good practice to catch warnings (ie stat failures and other non-blocking errors)
   archive.on('warning', function(err) {
     if (err.code === 'ENOENT') {
       // log warning
     } else {
       // throw error
       throw err;
     }
   });
   
   // good practice to catch this error explicitly
   archive.on('error', function(err) {
     throw err;
   });
   
   // pipe archive data to the file
   archive.pipe(output);
   
   // append a file from stream


   const dirpath = path.join(__dirname, '/docs')
   fs.readdir(dirpath, function(err, files) {
       const pdfile = files.filter(item =>  item.includes(userId));
       
       pdfile.forEach(item => {
         //  archive.append(fs.createReadStream(item), { name: item });
         archive.append(fs.createReadStream(dirpath+`/${item}`), { name: item });

       })

       archive.finalize();

       
   })
}
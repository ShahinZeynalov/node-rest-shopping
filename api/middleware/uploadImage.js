const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    //defaultly name of file hashing with unknown symbols
    //and in order to we customize filename functuion
    filename: function(req,file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 4
    },
    fileFilter: fileFilter
})



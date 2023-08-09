const Multer = require('multer');



const upload = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
});

export default upload;


// this was not supposed to be used yet
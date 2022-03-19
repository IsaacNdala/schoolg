const fs = require('fs');
const path = require('path');

exports.deleteFile = (fileName) => {
    let filePath = path.join(__dirname, '../', 'public', 'img', fileName);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.log(err)
        }
    })
}
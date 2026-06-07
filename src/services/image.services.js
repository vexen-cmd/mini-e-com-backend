const ImageKit = require("@imagekit/nodejs");
// const Imagekit = require("imagekit")
require("dotenv").config()

const client = new ImageKit({
  privateKey: process.env.PRIVATE_KEY,
});

async function uploadFile(file) {
    const result = await client.files.upload({
        file,
        fileName: "image_" + Date.now(),
        folder: "/product",
    });
    
    return result;
}

module.exports =  uploadFile ;

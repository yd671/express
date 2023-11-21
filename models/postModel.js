const mongoose = require('mongoose');
const multer = require('multer');
const postPath = '/upload/postImage';
const path = require('path');
const PostSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    PostImage : {
        type : String,
        required : true
    }
});

const StoragePath = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,"..",postPath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now())
    }
})
PostSchema.statics.uploadImagePath = multer({storage : StoragePath}).single("PostImage");
PostSchema.statics.imgFolderpath = postPath;

const Post_Data = mongoose.model('Post_Detail',PostSchema);
module.exports = Post_Data;
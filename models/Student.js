const multer = require('multer');
const imgPath = '/upload';
const path = require('path');
const mongoose= require('mongoose');
const StudentSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    hobby : {
        type : Array,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    AdminImages : {
        type : String,
        require : true
    },
    message : {
        type : String,
        required : true
    },
    // isActive : {
    //     type : Boolean,
    //     required : true
    // }
});

const StoragePath = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,"..",imgPath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now())
    }
})
StudentSchema.statics.uploadImagePath = multer({storage : StoragePath}).single("adminImg");
StudentSchema.statics.imgFolderpath = imgPath;

const Student = mongoose.model('StDetails',StudentSchema)
module.exports = Student;
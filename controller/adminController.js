const Student = require('../models/Student');
const fs = require('fs');
const path = require('path');

module.exports.add_details = async (req,res)=>{
    return res.render('add_details')
}
module.exports.insertRecord = async (req,res)=>{
    var ImagePath = '';
    if(req.file){
        ImagePath = Student.imgFolderpath+"/"+req.file.filename;
    }
    req.body.AdminImages = ImagePath;
    // await Student.create(req.body);
    let data = await Student.create(req.body);
    return res.redirect('/');
    // req.body.isActive=true;
}
module.exports.view_details = async (req,res)=>{
    let data = await Student.find({});
    return res.render('view_details',{
        stdata : data
    })
}
module.exports.deleteRecords = async(req,res)=>{
    let oldData = await Student.findById(req.params.id);
    if(oldData.AdminImages){
        let fullPath = path.join(__dirname,"..",oldData.AdminImages);
        console.log(fullPath);
        await fs.unlinkSync(fullPath);
    }
    await Student.findByIdAndDelete(req.params.id);
    return res.redirect("/view_details");
}
module.exports.updateRecords = async(req,res)=>{
    let record = await Student.findById(req.params.id);
    return res.render('update',{
        oldSt : record
    });
}
module.exports.editRecord = async (req,res)=>{
    if(req.file){
        let oldImg = await Student.findById(req.body.editId);
        if(oldImg.AdminImages){
            let fullPath = path.join(__dirname,'..',oldImg.AdminImages);
            await fs.unlinkSync(fullPath);
        }
        var ImagePath = '';
        ImagePath = Student.imgFolderpath+"/"+req.file.filename;
        req.body.AdminImages = ImagePath;
        await Student.findByIdAndUpdate(req.body.editId,req.body);
        return res.redirect('/view_details');
    }
    else{
        let oldImg = await Student.findById(req.body.editId);
        req.body.AdminImages = oldImg.AdminImages;
        await Student.findByIdAndUpdate(req.body.editId,req.body);
        return res.redirect('/view_details');
    }
}
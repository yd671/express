const { log } = require('console');
const post = require('../models/postModel');
const fs = require('fs');
const path = require('path');

module.exports.post = async(req,res)=>{
    return res.render('post');
}
module.exports.post_data = async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
    var ImagePath = '';
    if(req.file){
        ImagePath = post.imgFolderpath+"/"+req.file.filename;
    }
    req.body.PostImage = ImagePath;
    let data = await post.create(req.body);
    return res.redirect('back');
}
module.exports.view_post = async (req,res)=>{
    let data = await post.find({});
    return res.render('view_post',{
        pdData : data
    })
}
module.exports.deletePost = async(req,res)=>{
    let data = await post.findById(req.params.id)
    if(data.PostImage){
        let fullPath = path.join(__dirname,'..',data.PostImage);
        // console.log(fullPath);
        await fs.unlinkSync(fullPath);
    }
    await post.findByIdAndDelete(req.params.id)
    return res.redirect('back');
}
module.exports.updatePost = async(req,res)=>{
    var updataId = await post.findById(req.params.id)
    return res.render('update_post',{
        oldPost : updataId
    })
}
module.exports.edit_post = async(req,res)=>{
    if(req.file){
        let oldImg = await post.findById(req.body.postId);
        if(oldImg.PostImage){
            let fullPath = path.join(__dirname,'..',oldImg.PostImage);
            await fs.unlinkSync(fullPath);
        }
        var ImagePath = '';
        ImagePath = post.imgFolderpath+"/"+req.file.filename;
        req.body.PostImage = ImagePath;
        await post.findByIdAndUpdate(req.body.postId,req.body);
        return res.redirect('/post/view_post');
    }
    else{
        let oldImg = await post.findById(req.body.postId);
        req.body.PostImage = oldImg.PostImage;
        await post.findByIdAndUpdate(req.body.postId,req.body);
        return res.redirect('/post/view_post');
    }
}
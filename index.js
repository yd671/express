const express = require('express');
const port = 9001;
const app = express();
const path = require('path');
const fs = require('fs')
const mongoose = require('mongoose');
mongoose.connect(("mongodb+srv://yd046762:Dubey671@cluster0.yrpen2n.mongodb.net/Node-12"),
{
    useUnifiedTopology: true ,
    useNewUrlParser: true
})
.then(()=> console.log("dp connected"))
.catch((err)=> console.log(err))

app.use(express.urlencoded());
const Student = require('./models/Student');

app.set('view engine', 'ejs');
app.set('views',(path.join(__dirname,'views')));
app.use("/upload",express.static(path.join(__dirname,'upload')));


// app.get('/', function(req,res){
//     return res.render('add_details');
// });

// app.post('/insertRecord', Student.uploadImagePath, async function(req,res){
//     var ImagePath = '';
//     if(req.file){
//         ImagePath =Student.imgFolderpath+"/"+req.file.filename
//     }
//     req.body.AdminImages = ImagePath;
//     // await Student.create(req.body);
//     let data = await Student.create(req.body);
//     // console.log(data);
//     return res.redirect('/');
//     // req.body.isActive=true;
// });

// app.get('/view_details', async function(req,res){
//     let data = await Student.find({});
//     return res.render('view_details',{
//         stdata : data
//     })
// });

// Delete Records
// app.get('/deleteRecords/:id', async (req,res)=>{
//     let oldData = await Student.findById(req.params.id);
//     if(oldData.AdminImages){
//         let fullPath = path.join(__dirname,oldData.AdminImages);
//         console.log(fullPath);
//         await fs.unlinkSync(fullPath);
//     }
//     // console.log(req.params.id);
//     await Student.findByIdAndDelete(req.params.id)
//     return res.redirect("/view_details");
// })

// Update Records 
// app.get('/updateRecords/:id', async (req,res)=>{
//     // console.log(req.params.id);
//     let record = await Student.findById(req.params.id);
//     // console.log(record);
//     return res.render('update',{
//         oldSt : record
//     });
// });

// app.post('/editRecord',Student.uploadImagePath, async (req,res)=>{
//     if(req.file){
//         let oldImg = await Student.findById(req.body.editId);
//         if(oldImg.AdminImages){
//             let fullPath = path.join(__dirname,oldImg.AdminImages);
//             // console.log(fullPath);
//             await fs.unlinkSync(fullPath);
//         }
//         var ImagePath = '';
//         ImagePath = Student.imgFolderpath+"/"+req.file.filename;
//         req.body.AdminImages = ImagePath;
//         await Student.findByIdAndUpdate(req.body.editId,req.body);
//         return res.redirect('/view_details');
//     }
//     else{
//         let oldImg = await Student.findById(req.body.editId)
//         req.body.AdminImages = oldImg.AdminImages
//         await Student.findByIdAndUpdate(req.body.editId,req.body);
//         return res.redirect('/view_details');
//     }
// })

app.use('/', require('./routes'));
app.use('/post', require('./routes/post'));

app.listen(port, function(err){
    if(err){
        console.log("Error");
    }
    console.log("Connected on port :",port);
});
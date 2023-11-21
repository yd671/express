const express = require('express');
const routes = express.Router();
const fs = require('fs');
const Student = require('../models/Student');
const adminController = require('../controller/adminController')

routes.get('/',adminController.add_details);
routes.post('/insertRecord',Student.uploadImagePath,adminController.insertRecord);
routes.get('/view_details',adminController.view_details);
routes.get('/deleteRecords/:id',adminController.deleteRecords);
routes.get('/updateRecords/:id',adminController.updateRecords);
routes.post('/editRecord',Student.uploadImagePath,adminController.editRecord);

module.exports = routes;
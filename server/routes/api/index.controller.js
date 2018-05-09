const express = require('express');
const router  = express.Router();

const authRoutes = require('./authentication.controller');
const crudRoutes  = require('./crud.controller');

const Degree = require("../../models/Degree");
const Reply = require("../../models/Reply");
const Subject = require("../../models/Subject");
const Thread = require("../../models/Thread");



router.use('/', authRoutes);
router.use('/degree', crudRoutes(Degree));
router.use('/reply', crudRoutes(Reply));
router.use('/subject', crudRoutes(Subject));
router.use('/thread', crudRoutes(Thread));


module.exports = router;
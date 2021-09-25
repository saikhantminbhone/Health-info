const express = require('express');
const patientController = require('./../controllers/patientController')
const patientRoutes = express.Router();

patientRoutes.post('/createPatient', patientController.createPatient)
patientRoutes.post('/updateSymptoms', patientController.updateSymptoms)
patientRoutes.post('/updatePhysican', patientController.updatePhysican)
patientRoutes.post('/createHomeBase', patientController.createHomeBase)
patientRoutes.post('/createOutcome', patientController.createOutcome)


module.exports = patientRoutes;
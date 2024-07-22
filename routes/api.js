const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const doctorController = require('../controllers/doctorController');
const appointmentController = require('../controllers/appointmentController');

// Patient routes
router.post('/patient/addPatient', patientController.addPatient);
router.get('/patients', patientController.getAllPatients);

// Doctor routes
router.post('/doctor/addDoctor', doctorController.addDoctor);
router.get('/doctors', doctorController.getAllDoctors);

// Appointment routes
router.post('/appointment', appointmentController.addAppointment);
router.get('/allAppointments', appointmentController.getAllAppointments);
router.get('/appointmentsByPatient', appointmentController.getAppointmentsByPatientId);
router.get('/getAppointments', appointmentController.getAppointmentsByQuery);
router.put('/appointments/:id',appointmentController.updateAppointmentSatusByDoctor);
router.delete('/appointment/:id', appointmentController.deleteAppointmentByPatient);

module.exports = router;
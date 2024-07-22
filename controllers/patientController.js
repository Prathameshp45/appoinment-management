const patientService = require('../services/patientService');

const addPatient = async (req, res) => {
  try {
    // console.log("req.body patientController",req.body);
    const result = await patientService.addPatient(req.body);
    res.status(result.status).send(result.task || { message: result.message });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const result = await patientService.getAllPatients();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = {
  addPatient,
  getAllPatients
};
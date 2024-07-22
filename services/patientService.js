const mongoose = require("mongoose");
const Patient = require('../models/patient');
const constants = require('../config/constants');


async function addPatient(patient) {
    // console.log("addPatient patientService",patient);
  try {
    const patientDetails = {
      name: patient.patientName,
      phoneNumber: patient.phoneNumber,
      gender: patient.gender,
      age: patient.age,
      dateOfbirth: patient.dateOfbirth,
      bloodGroup: patient.bloodGroup,
      email: patient.email,
      password: patient.password,
      address: patient.address
    };
    console.log(patientDetails);
    const newPatient = new Patient(patientDetails);
    const result = await newPatient.save();
    return { status: 200, task: result };
  } catch (error) {
    throw { status: 500, message: "Internal server error" };
  }
}

async function getAllPatients() {
  try {
    const patients = await Patient.find({}, {__v: 0 });
    return patients;
  } catch (error) {
    throw { status: 500, message: "Internal server error" };
  }
}

module.exports = {
  addPatient,
  getAllPatients
};
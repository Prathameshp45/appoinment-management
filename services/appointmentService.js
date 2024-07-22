const mongoose = require("mongoose");
const Appointment = require('../models/appointment');
const constants = require('../config/constants');



async function addAppointment(appointment) {
  console.log('appointment Service',appointment)
  try {
    const appointmentDetails = {
      doctorId: appointment.doctorId,
      patientId: appointment.patientId,
      appointmentDateTime: appointment.appointmentDateTime,
      status: appointment.status
    };
    const newAppointment = new Appointment(appointmentDetails);
    const result = await newAppointment.save();
    return { status: 200, task: result };
  } catch (error) {
    throw { status: 500, message: "Internal server Error" };
  }
}

async function getAllAppointments() {
  try {
    const appointments = await Appointment.find({}, { __v: 0 });
    return appointments;
  } catch (error) {
    throw { status: 500, message: "Internal server error" };
  }
}

async function getAppointmentsByPatientId(patientId) {
    try {
      const appointments = await Appointment.find({ patientId }, { __v: 0 });
      return { status: 200, task: appointments };
    } catch (error) {
      throw { status: 500, message: "Internal server error" };
    }
  }
  

  async function getAppointmentsByQuery(query) {
    try {
      const appointments = await Appointment.find(query, { _id: 0, __v: 0 });
      return appointments;
    } catch (error) {
      throw { status: 500, message: "Internal server error" };
    }
  }

  async function updateAppointmentStatusByDoctor(appointmentId, status) {
    try {
      const updatedDoc = await Appointment.findByIdAndUpdate(
        appointmentId,
        { status },
        { new: true }
      );
      return updatedDoc;
    } catch (error) {
      throw error;
    }
  }

  async function deleteAppointmentByPatient(appointmentId){
    try {
      const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);
      return deletedAppointment;
    } catch (error) {
      throw new Error('Error deleting appointment');
    }
  };
  
  module.exports = {
    addAppointment,
    getAllAppointments,
    getAppointmentsByPatientId,
    getAppointmentsByQuery,
    updateAppointmentStatusByDoctor,
    deleteAppointmentByPatient
  };
  
const appointmentService = require('../services/appointmentService');

const addAppointment = async (req, res) => {
  console.log('addApoointment Controller',req.body)
  try {
    const result = await appointmentService.addAppointment(req.body);
    res.status(result.status).send(result.task || { message: result.message });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const result = await appointmentService.getAllAppointments();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

const getAppointmentsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.query;
    const result = await appointmentService.getAppointmentsByPatientId(patientId);
    res.status(result.status).send(result.task || { message: result.message });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

const getAppointmentsByQuery = async (req, res) => {
  try {
    const result = await appointmentService.getAppointmentsByQuery(req.query);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

const updateAppointmentSatusByDoctor = async (req, res) => {
  console.log("req.params for update status", req.params);
  console.log('req.body for update status', req.body);
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedAppointment = await appointmentService.updateAppointmentStatusByDoctor(id, status);
    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({ message: 'Validation error', details: error.errors });
    } else if (error instanceof mongoose.Error.CastError) {
      res.status(400).json({ message: 'Invalid ID format', details: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

const deleteAppointmentByPatient =async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const deletedAppointment = await appointmentService.deleteAppointmentByPatient(appointmentId);

    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ message: 'Server error. Failed to delete appointment.' });
  }
};


module.exports = {
  addAppointment,
  getAllAppointments,
  getAppointmentsByPatientId,
  getAppointmentsByQuery,
  updateAppointmentSatusByDoctor,
  deleteAppointmentByPatient
};
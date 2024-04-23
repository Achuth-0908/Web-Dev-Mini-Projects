const doctors = [
  { id: 1, name: 'Dr. Johnny', specialty: 'General Practitioner', available_slots_per_day: 12 },
  { id: 2, name: 'Dr. Mark', specialty: 'Gynaecologist', available_slots_per_day: 10 },
  { id: 3, name: 'Dr. Dinesh', specialty: 'Pediaetician', available_slots_per_day: 8 }
];

const patients = [];

const appointments = [];

const docSlot = document.getElementById('doctor-slots');
const regform = document.getElementById('registration-form');
const booking = document.getElementById('booking-container');
const summ = document.getElementById('summary-container');

function displayDoctor() {
  docSlot.innerHTML = '';

  doctors.forEach((doctor) => {
    const doctorCard = document.createElement('div');
    doctorCard.className = 'doctor-card';
    doctorCard.innerHTML = `
      <h3>${doctor.name}</h3>
      <p>${doctor.specialty}</p>
      <button class="book-appointment" data-doctor-id="${doctor.id}">
        View Available Slots
      </button>
      <button class="view-summary" data-doctor-id="${doctor.id}">
        View Appointment Summary
      </button>
    `;
    docSlot.appendChild(doctorCard);

    const bookAppointmentButton = doctorCard.querySelector('.book-appointment');
    bookAppointmentButton.addEventListener('click', () => {
      displayAvailable(doctor.id);
    });

    const viewSummaryButton = doctorCard.querySelector('.view-summary');
    viewSummaryButton.addEventListener('click', () => {
      generateSummary(doctor.id);
    });
  });
}

function displayAvailable(doctorId) {
  const doctor = doctors.find((d) => d.id === doctorId);
  const availableSlots = getAvailable(doctor);

  booking.innerHTML = '';
  availableSlots.forEach((slot) => {
    const slotElement = document.createElement('div');
    slotElement.className = 'appointment-slot';
    slotElement.innerHTML = `
      <p>Date: ${slot.date}</p>
      <p>Time: ${slot.time}</p>
      <button class="book-slot" data-slot-id="${slot.id}">Book Appointment</button>
    `;
    slotElement.querySelector('.book-slot').addEventListener('click', () => {
      bookAppointment(slot.id, doctor.id);
    });
    booking.appendChild(slotElement);
  });
}

function getAvailable(doctor) {
  const slots = [];
  for (let i = 0; i < doctor.available_slots_per_day; i++) {
    slots.push({
      id: i,
      date: '2023-04-17', 
      time: `${9 + i}:00 AM`     });
  }

  const bookedSlots = appointments.filter((appointment) => appointment.doctor_id === doctor.id);
  bookedSlots.forEach((bookedSlot) => {
    const index = slots.findIndex((slot) => slot.date === bookedSlot.appointment_date && slot.time === bookedSlot.appointment_time);
    if (index !== -1) {
      slots.splice(index, 1);
    }
  });

  return slots;
}

function registerPatient() {
  const formData = new FormData(regform);
  const patient = {
    id: patients.length + 1,
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    registration_fee: 50  };

  patients.push(patient);
  console.log('Patient registered:', patient);
  return patient;
}

function bookAppointment(slotId, doctorId) {
  const patient = registerPatient();
  const appointment = {
    id: appointments.length + 1,
    doctor_id: doctorId,
    patient_id: patient.id,
    appointment_date: '2023-04-17',
    appointment_time: '10:00 AM', 
    notes: 'Patient has a tonsils issues and a history of sinuses.'
  };

  appointments.push(appointment);
  console.log('Appointment booked:', appointment);
  displayDoctor();
}

function generateSummary(doctorId) {
  const doctorAppointments = appointments.filter((appointment) => appointment.doctor_id === doctorId);
  const doctor = doctors.find((d) => d.id === doctorId);

  summ.innerHTML = '';
  const summaryElement = document.createElement('div');
  summaryElement.innerHTML = `
    <h2>Appointment Summary for ${doctor.name}</h2>
  `;
  summ.appendChild(summaryElement);

  doctorAppointments.forEach((appointment) => {
    const patient = patients.find((p) => p.id === appointment.patient_id);
    const appointmentElement = document.createElement('div');
    appointmentElement.className = 'appointment-summary';
    appointmentElement.innerHTML = `
      <h3>Patient: ${patient.name}</h3>
      <p>Appointment Date: ${appointment.appointment_date}</p>
      <p>Appointment Time: ${appointment.appointment_time}</p>
      <p>Notes: ${appointment.notes}</p>
    `;
    summ.appendChild(appointmentElement);
  });
}

displayDoctor();
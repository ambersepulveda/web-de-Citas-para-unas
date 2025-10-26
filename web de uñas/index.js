document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    // Obtener datos del formulario
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // Crear objeto de cita
    const appointment = {
        name,
        phone,
        date,
        time
    };

    // Obtener citas del LocalStorage
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    // Agregar nueva cita
    appointments.push(appointment);

    // Guardar citas en el LocalStorage
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Mostrar mensaje de confirmación
    document.getElementById('confirmation').classList.remove('hidden');

    // Ocultar el formulario
    document.getElementById('appointmentForm').classList.add('hidden');
});

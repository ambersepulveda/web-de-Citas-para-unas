document.addEventListener('DOMContentLoaded', function() {
    // Obtener citas del LocalStorage
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    // Seleccionar el cuerpo de la tabla de citas
    const appointmentTableBody = document.querySelector('#appointmentTable tbody');

    // Función para renderizar la tabla
    function renderTable() {
        appointmentTableBody.innerHTML = ''; // Limpiar la tabla antes de renderizar

        // Agregar cada cita a la tabla
        appointments.forEach((appointment, index) => {
            const row = document.createElement('tr');
            
            const nameCell = document.createElement('td');
            nameCell.textContent = appointment.name;
            row.appendChild(nameCell);
            
            const phoneCell = document.createElement('td');
            phoneCell.textContent = appointment.phone;
            row.appendChild(phoneCell);
            
            const dateCell = document.createElement('td');
            dateCell.textContent = appointment.date;
            row.appendChild(dateCell);
            
            const timeCell = document.createElement('td');
            timeCell.textContent = appointment.time;
            row.appendChild(timeCell);
            
            const actionsCell = document.createElement('td');
            const editIcon = document.createElement('i');
            editIcon.classList.add('fas', 'fa-edit', 'action-icon');
            editIcon.addEventListener('click', () => editAppointment(index));
            actionsCell.appendChild(editIcon);

            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('fas', 'fa-trash-alt', 'action-icon');
            deleteIcon.addEventListener('click', () => deleteAppointment(index));
            actionsCell.appendChild(deleteIcon);

            row.appendChild(actionsCell);
            appointmentTableBody.appendChild(row);
        });
    }

    // Función para editar una cita
    function editAppointment(index) {
        const appointment = appointments[index];
        const newName = prompt('Editar Nombre', appointment.name);
        const newPhone = prompt('Editar Teléfono', appointment.phone);
        const newDate = prompt('Editar Fecha', appointment.date);
        const newTime = prompt('Editar Hora', appointment.time);

        if (newName && newPhone && newDate && newTime) {
            appointments[index] = { name: newName, phone: newPhone, date: newDate, time: newTime };
            localStorage.setItem('appointments', JSON.stringify(appointments));
            renderTable();
        }
    }

    // Función para eliminar una cita
    function deleteAppointment(index) {
        if (confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
            appointments.splice(index, 1);
            localStorage.setItem('appointments', JSON.stringify(appointments));
            renderTable();
        }
    }

    // Añadir evento al botón de enviar a WhatsApp
    document.getElementById('sendWhatsAppBtn').addEventListener('click', function() {
        let message = "Clientes Agendados:\n\n";
        appointments.forEach(appointment => {
            message += `Nombre: ${appointment.name}\nTeléfono: ${appointment.phone}\nFecha: ${appointment.date}\nHora: ${appointment.time}\n\n`;
        });

        // Codificar el mensaje para URL
        const encodedMessage = encodeURIComponent(message);

        // Abrir WhatsApp con el mensaje prellenado
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    });

    // Renderizar la tabla al cargar la página
    renderTable();
});

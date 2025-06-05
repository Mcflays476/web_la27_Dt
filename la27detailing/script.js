function openModal(tipo) {
  document.getElementById(`modal-${tipo}`).style.display = 'flex';
}
function closeModal(tipo) {
  document.getElementById(`modal-${tipo}`).style.display = 'none';
}
function toggleContact() {
  const contact = document.getElementById("contact");
  contact.style.display = contact.style.display === "block" ? "none" : "block";
}
window.onclick = function(e) {
  ['lavado', 'pulidos', 'interior'].forEach(tipo => {
    const modal = document.getElementById(`modal-${tipo}`);
    if (e.target === modal) modal.style.display = "none";
  });
};

// Calendario y reservas
const reservas = JSON.parse(localStorage.getItem("reservas") || "{}");

flatpickr("#fecha-turno", {
  minDate: "today",
  disable: Object.keys(reservas),
  dateFormat: "Y-m-d"
});

function reservarTurno() {
  const fecha = document.getElementById("fecha-turno").value;
  const nombre = document.getElementById("nombre-cliente").value.trim();
  const telefono = document.getElementById("telefono-cliente").value.trim();
  const estado = document.getElementById("estado-reserva");

  if (!fecha || !nombre || !telefono) {
    estado.textContent = "⚠️ Todos los campos son obligatorios.";
    return;
  }

  if (reservas[fecha]) {
    estado.textContent = "⛔ Ese turno ya está reservado.";
    return;
  }

  reservas[fecha] = { nombre, telefono };
  localStorage.setItem("reservas", JSON.stringify(reservas));
  estado.textContent = `✅ Turno reservado para el ${fecha}. ¡Gracias ${nombre}!`;

  flatpickr("#fecha-turno", {
    minDate: "today",
    disable: Object.keys(reservas),
    dateFormat: "Y-m-d"
  });

  document.getElementById("nombre-cliente").value = "";
  document.getElementById("telefono-cliente").value = "";
}

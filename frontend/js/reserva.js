document.addEventListener("DOMContentLoaded", () => {
    const tabla = document.querySelector("#tablaReservas");
    if (tabla) {
        tabla.classList.add("table", "table-bordered", "table-hover", "align-middle", "table-success");
    }

    fetch("http://localhost:8080/api/reservas")
        .then(response => response.json())
        .then(data => {
            const elemento = document.getElementById("tablaReservas");
            if (!elemento) return;
            elemento.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
                let reserva = data[i];
                let fecha = new Date(reserva.fechaHoraInicio).toLocaleString();
                let fila = `
                    <tr>
                        <td>${reserva.id}</td>
                        <td>${reserva.canchaNombre}</td>
                        <td>${reserva.clienteNombre}</td>
                        <td>${fecha}</td>
                        <td>
                            <button class="btn btn-outline-primary btn-editar-reserva me-1" data-id="${reserva.id}" data-cancha="${reserva.canchaNombre}" data-cliente="${reserva.clienteNombre}" data-fecha="${reserva.fechaHoraInicio}">
                                <i class="fa-solid fa-pen-to-square"></i> Editar
                            </button>
                            <button class="btn btn-outline-danger btn-eliminar-reserva" data-id="${reserva.id}">
                                <i class="fa-solid fa-trash-can"></i> Eliminar
                            </button>
                        </td>
                    </tr>
                `;
                elemento.innerHTML += fila;
            }
        })
        .catch(error => console.error("Error al cargar reservas:", error));
});

document.addEventListener("click", function(e) {
    const btnEliminar = e.target.closest(".btn-eliminar-reserva");
    if (btnEliminar) {
        const id = btnEliminar.getAttribute("data-id");
        if (confirm("¿Eliminar esta reserva?")) {
            fetch(`http://localhost:8080/api/reservas/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    alert("Reserva eliminada correctamente");
                    location.reload();
                } else {
                    alert("Error al eliminar la reserva");
                }
            })
            .catch(error => console.error("Error en DELETE:", error));
        }
    }
});
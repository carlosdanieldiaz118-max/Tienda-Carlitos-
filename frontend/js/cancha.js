document.addEventListener("DOMContentLoaded", () => {
    const tabla = document.querySelector("#tablaCanchas");
    if (tabla) {
        tabla.classList.add("table", "table-bordered", "table-hover", "align-middle", "table-success");
    }

    fetch("http://localhost:8080/api/canchas")
        .then(response => response.json())
        .then(data => {
            const elemento = document.getElementById("tablaCanchas");
            if (!elemento) return;
            elemento.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
                let cancha = data[i];
                let estadoTexto = cancha.estado === "disponible" 
                    ? '<span style="color: #2d6a4f; font-weight: 500;">Disponible</span>' 
                    : '<span style="color: #b91c1c; font-weight: 500;">Mantenimiento</span>';
                let fila = `
                    <tr>
                        <td>${cancha.id}</td>
                        <td>${cancha.nombre}</td>
                        <td>S/ ${cancha.precioHora}</td>
                        <td>${estadoTexto}</td>
                        <td>
                            <button class="btn btn-outline-primary btn-editar-canchas me-1" data-id="${cancha.id}" data-nombre="${cancha.nombre}" data-precio="${cancha.precioHora}" data-estado="${cancha.estado}">
                                <i class="fa-solid fa-pen-to-square"></i> Editar
                            </button>
                            <button class="btn btn-outline-danger btn-eliminar-canchas" data-id="${cancha.id}">
                                <i class="fa-solid fa-trash-can"></i> Eliminar
                            </button>
                        </td>
                    </tr>
                `;
                elemento.innerHTML += fila;
            }
        })
        .catch(error => console.error("Error al cargar canchas:", error));
});

document.addEventListener("click", function(e) {
    const btnEliminar = e.target.closest(".btn-eliminar-canchas");
    if (btnEliminar) {
        const id = btnEliminar.getAttribute("data-id");
        if (confirm("¿Eliminar esta cancha?")) {
            fetch(`http://localhost:8080/api/canchas/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    alert("Cancha eliminada correctamente");
                    location.reload();
                } else {
                    alert("Error al eliminar la cancha");
                }
            })
            .catch(error => console.error("Error en DELETE:", error));
        }
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const tabla = document.querySelector("#table-cliente");
    if (tabla) {
        tabla.classList.add("table", "table-bordered", "table-hover", "align-middle", "table-success");
    }

    fetch("http://localhost:8080/api/clientes")
        .then(response => response.json())
        .then(data => {
            const elemento = document.getElementById("table-cliente");
            if (!elemento) return;
            elemento.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
                let cliente = data[i];
                let fila = `
                    <tr>
                        <td>${cliente.id}</td>
                        <td>${cliente.nombre}</td>
                        <td>${cliente.telefono || ''}</td>
                        <td>${cliente.email || ''}</td>
                        <td>
                            <button class="btn btn-outline-primary btn-editar-cliente me-1" data-id="${cliente.id}" data-nombre="${cliente.nombre}" data-telefono="${cliente.telefono}" data-email="${cliente.email}">
                                <i class="fa-solid fa-pen-to-square"></i> Editar
                            </button>
                            <button class="btn btn-outline-danger btn-eliminar-cliente" data-id="${cliente.id}">
                                <i class="fa-solid fa-trash-can"></i> Eliminar
                            </button>
                        </td>
                    </tr>
                `;
                elemento.innerHTML += fila;
            }
        })
        .catch(error => console.error("Error al cargar clientes:", error));
});

document.addEventListener("click", function(e) {
    const btnEliminar = e.target.closest(".btn-eliminar-cliente");
    if (btnEliminar) {
        const id = btnEliminar.getAttribute("data-id");
        if (confirm("¿Eliminar este cliente?")) {
            fetch(`http://localhost:8080/api/clientes/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    alert("Cliente eliminado correctamente");
                    location.reload();
                } else {
                    alert("Error al eliminar el cliente");
                }
            })
            .catch(error => console.error("Error en DELETE:", error));
        }
    }
});
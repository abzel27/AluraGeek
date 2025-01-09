import { conexionApi } from "./conexionApi.js";
import { accionFormulario } from "./accionFormulario.js";

const lista = document.querySelector("[data-cards-productos]");
const elFormulario = document.querySelector("[data-formulario]");

function crearProducto(name, price, imagen, id) {
    const producto = document.createElement("div");
    producto.classList.add("card");
    producto.innerHTML = `
        <figure>
            <img class="producto-img" src="${imagen}" alt="${imagen}" />
            <figcaption class="card-container--info">${name}</figcaption>
        </figure>
        <div class="card-container--value">
            <p>L. ${price}</p>
            <button class="delete-button" data-id="${id}">
                <img src="imagenes/trash-can.png" alt="eliminar" />
            </button>
        </div>`;

    const deleteButton = producto.querySelector("[data-id]");
    deleteButton.addEventListener("click", () => {
        Swal.fire({
            title: '¿Desea Borrar este Producto?',
            text: "¡No podra devolverlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await conexionApi.borrarProducto(id);
                producto.remove();
                Swal.fire(
                    '¡Borrado!',
                    'El producto ha sido borrado.',
                    'success'
                );
            }
        });
    });

    lista.appendChild(producto);
    return producto;
}

const render = async () => {
    try {
        const listado = await conexionApi.listaDeProductos();
        lista.innerHTML = ''; // Limpiar la lista antes de renderizar
        listado.forEach(producto => {
            lista.appendChild(crearProducto(
                producto.name,
                producto.price,
                producto.imagen,
                producto.id
            ));
        });
    } catch (error) {
        console.log(error);
    }
};

elFormulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const name = document.querySelector("[data-nombre-producto]").value;
    const price = document.querySelector("[data-precio-producto]").value;
    const imagen = document.querySelector("[data-imagen-producto]").value;

    try {
        await conexionApi.nuevoProducto(name, price, imagen);
        render(); // Volver a renderizar la lista de productos
        Swal.fire(
            '¡Agregado!',
            'Tu producto ha sido agregado.',
            'success'
        );
        elFormulario.reset(); // se limpia el formulario después de agregar el producto
    } catch (err) {
        console.log(err);
    }
});

render();
accionFormulario();

export const mostrarProducto = { render };
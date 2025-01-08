export async function listaDeProductos() {
    const conexion = await fetch("https://alura-geek-mauve-xi.vercel.app");
    const conexionConvertida = await conexion.json(); // Esperar la conversión a JSON
    return conexionConvertida;
}

const nuevoProducto = async (name, price, imagen) => {
    try {
        const res = await fetch("https://alura-geek-mauve-xi.vercel.app", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, price, imagen }),
        });
        return await res.json();
    } catch (err) {
        console.log(err);
    }
};

const borrarProducto = async (id) => {
    try {
        const res = await fetch(`https://alura-geek-mauve-xi.vercel.app/${id}`, {
            method: "DELETE",
        });
        return res.ok;
    } catch (err) {
        console.log(err);
    }
};

export const conexionApi = {
    listaDeProductos,
    nuevoProducto,
    borrarProducto,
};
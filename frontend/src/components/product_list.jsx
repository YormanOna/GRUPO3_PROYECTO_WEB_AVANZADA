import { useEffect, useState } from "react";
import { obtenerProductos } from "../api/projectapi";

export function ListaProductos() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        async function cargarProductos() {
            const respuesta = await obtenerProductos();
            setProductos(respuesta.data);
        }
        cargarProductos();
    }, []);

    return (
        <div>
            {productos.map(product => (
                <div key={product.id}>
                    <h1>{product.nombre}</h1>
                    <p>{product.tipo}</p>
                    <img src={product.imagen} alt={product.nombre} />
                    <hr />
                </div>
                
            ))}
        </div>
    );
}
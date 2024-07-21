import axios from 'axios';

const API_URL = axios.create({
    baseURL: 'http://127.0.0.1:8000/info/api/info/',
});

export const obtenerProductos = () => {
    return  API_URL.get('coctails/')
}
export const validarUsuario = (data) => {
    return API_URL.get('cuentacliente/', data)
}

export const registrarUsuario = (data) => {
    return API_URL.post('clientes/', data)
}
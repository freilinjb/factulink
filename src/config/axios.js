// import axios from 'axios';

// //Recomendaciones para realizar las consultas
// const clienteAxios = axios.create({
//     //Registrar la variable de entorno en produccion
//     baseURL: process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : 'http://localhost:4000/'
// });

// export default clienteAxios;

import axios from "axios";

const clienteAxios = axios.create({
    baseURL: 'http://localhost:4000/'
});

export default clienteAxios;
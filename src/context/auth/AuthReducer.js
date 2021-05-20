// import nextCookies from "next-cookies";
import cookie from "js-cookie";


import {
  LOGIN_EXITOSO,
  OBTENER_USUARIO,
  REGISTRO_EXITOSO,
  CERRAR_SESION,
  LOGIN_ERROR,
  REGISTRO_ERROR,
  INICIANDO_CONSULTA,
  FINALIZANDO_CONSULTA,
} from "../../types";


const reducer = (state, action) => {
  switch (action.type) {

    case INICIANDO_CONSULTA:
        // console.log('INICIANDO_CONSULTA');

        return {
          ...state,
          cargando: true,
          mensaje: null,
        };
  
    case FINALIZANDO_CONSULTA:
        // console.log('FINALIZANDO_CONSULTA');

        return {
            ...state,
        cargando: false,
        };

    case LOGIN_EXITOSO:
    case REGISTRO_EXITOSO: //Se guarda token en el LocalStorage
        // console.log('REGISTRO_EXITOSO');
        // console.log('usuario: ', action.payload.data);
        
        return {
            ...state,
            autenticado: true,
            idUsuario: action.payload.data.idUsuario,
            token: action.payload.token,
            usuario: action.payload.data.usuario,
            nombre: action.payload.data.nombre,
            mensaje: action.payload.message ? action.payload.message : null, //Mostrar mensaje de adventencia manejado con el state
            cargando: false,
        };

    case OBTENER_USUARIO:
        // console.log('OBTENER_USUARIO: ', action.payload.data);

        return {
        ...state,
        autenticado: true,
        token: cookie.get("token") ? cookie.get("token") : null,
        usuario: action.payload.data.usuario,
        nombre: action.payload.data.nombre,
        tipoUsuario: action.payload.data.tipo,
        idUsuario: action.payload.data.idUsuario,
        cargando: false,
    }

    case CERRAR_SESION:
    case LOGIN_ERROR: //Realizan la mismo operacion, en caso de que haya un error reiniciar el token
    case REGISTRO_ERROR:
        cookie.remove("token");
        localStorage.removeItem('token');
        

        // console.log('CERRAR_SESION');
        // console.log("prueba: ", action);
        return {
        ...state,
        token: null,
        usuario: null, //Cuando se cierre sesion el usuario tiene que volver a null
        autenticado: null,
        mensaje: action.payload ? action.payload : null, //se maneta con el authState
        cargando: false,
        };

    default:
        console.log('default: ');
        return {
            ...state
        };
    }
};

export default reducer;
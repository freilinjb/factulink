import {
    INICIANDO_CONSULTA,
    FINALIZANDO_CONSULTA,
    OBTENER_TIPOS_USUARIOS,
    OBTENER_USUARIOS,
    OBTENER_USUARIO,
    OBTENER_USUARIOS_POR_PAGINAS,
    OBTENER_IDENTIFICACIONES,
    BUSCAR_USUARIO,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_COMPROBANTES
  } from "../../types";
  
  const reducer = (state, action) => {
    switch (action.type) {
      case REGISTRO_ERROR: {
        return {
          ...state,
          mensaje: "Ah ocurrido un error"
        }
      }
      case REGISTRO_EXITOSO: {
        console.log('registro exitoso: ', action.payload);
        let mensaje = null;
        if(action.payload.length > 0) {
          console.log('cumplio: ', action.payload[0].status);
          mensaje = (action.payload[0].status == 200) ? "Producto registrado de forma exitosa" : "dsf asd";

        }
        return {
          ...state,
          mensaje: mensaje
        }
      }
      case INICIANDO_CONSULTA:
         console.log("INICIANDO_CONSULTA");
        return {
          ...state,
          cargando: true,
        };
  
      case FINALIZANDO_CONSULTA:
         console.log("FINALIZANDO_CONSULTA");
        return {
          ...state,
          cargando: false,
        };
  
        case OBTENER_USUARIOS:
        console.log("OBTENER_USUARIOS: ", action.payload);
        return {
          ...state,
          usuarios: action.payload.data
        };

        case OBTENER_TIPOS_USUARIOS:
        console.log("OBTENER_TIPOS_USUARIOS: ", action.payload);
        return {
          ...state,
          tiposUsuarios: action.payload
        };

        

        case OBTENER_USUARIOS_POR_PAGINAS:
          console.log('OBTENER_USUARIOS_POR_PAGINAS', action.payload.data);
          
          const total_page = action.payload.data.total_page;
          let paginas = [];
          for(let i  = 1; i <= total_page; i++) {
            paginas.push(i);
          }
          return {
            ...state,
            usuarios: action.payload.data.results,
            total_page: paginas,
            page_cout: action.payload.data.page_cout
          }
  
        case OBTENER_USUARIO:
         console.log("OBTENER_USUARIO: ", action.payload);
        return {
          ...state,
          usuarioEditar: action.payload,
          cargando: false
        };

        case OBTENER_COMPROBANTES:
        console.log("OBTENER_COMPROBANTES: ", action.payload);
        return {
          ...state,
          comprobantes: action.payload
        };

        case OBTENER_IDENTIFICACIONES:
          console.log("OBTENER_IDENTIFICACIONES: ", action.payload);
          return {
            ...state,
            identificaciones: action.payload
          };
  
        case BUSCAR_USUARIO:
        // console.log("BUSCAR_USUARIO: ", action.payload);
        return {
          ...state,
          usuarioBuscar:  state.productos.filter((producto) => {
            return (
              (
                producto.nombre.toLowerCase() +
                " " +
                producto.categoria.toLowerCase()
              ).includes(action.payload) || producto.subcategoria.toLowerCase().includes(action.payload)
            );
          })
        };
  
      default:
        console.log("default: ");
        return {
          ...state,
        };
    }
  };
  
  export default reducer;
  
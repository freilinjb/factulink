import {
    INICIANDO_CONSULTA,
    FINALIZANDO_CONSULTA,
    OBTENER_CLIENTES,
    OBTENER_CLIENTE,
    OBTENER_CLIENTE_POR_PAGINAS,
    OBTENER_IDENTIFICACIONES,
    BUSCAR_CLIENTE,
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
  
        case OBTENER_CLIENTES:
        console.log("OBTENER_CLIENTES: ", action.payload);
        return {
          ...state,
          clientesSelect: action.payload
        };

        case OBTENER_CLIENTE_POR_PAGINAS:
          console.log('OBTENER_CLIENTE_POR_PAGINAS', action.payload.data);
          
          const total_page = action.payload.data.total_page;
          let paginas = [];
          for(let i  = 1; i <= total_page; i++) {
            paginas.push(i);
          }
          return {
            ...state,
            clientes: action.payload.data.results,
            total_page: paginas,
            page_cout: action.payload.data.page_cout
          }
  
        case OBTENER_CLIENTE:
         console.log("OBTENER_CLIENTE: ", action.payload);
        return {
          ...state,
          clienteEditar: action.payload,
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
  
        case BUSCAR_CLIENTE:
        // console.log("BUSCAR_CLIENTE: ", action.payload);
        return {
          ...state,
          clienteBuscar:  state.productos.filter((producto) => {
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
  
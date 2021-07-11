import {
    INICIANDO_CONSULTA,
    OBTENER_COMPROBANTE,
    OBTENER_COMPROBANTES_POR_PAGINAS,
    OBTENER_FACTURA_POR_DIA_ACTUAL,
    OBTENER_COMPROBANTES,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    FINALIZANDO_CONSULTA,
    OBTENER_FACTURA
  } from "../../types";
  
  const reducer = (state, action) => {
    let total_page;
    let paginas  = 0;
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
        // if(action.payload.length > 0) {
        //   console.log('cumplio: ', action.payload.status);
        //   mensaje = (action.payload.status == 200) ? "Producto registrado de forma exitosa" : "dsf asd";

        // }
        return {
          ...state,
          mensajeCategory: action.payload.msg
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
          mensajeCategory: null
        };

        case OBTENER_COMPROBANTES_POR_PAGINAS:
          console.log('OBTENER_COMPROBANTES_POR_PAGINAS', action.payload.data);
          
          total_page = action.payload.data.total_page;
          paginas = [];
          for(let i  = 1; i <= total_page; i++) {
            paginas.push(i);
          }
          return {
            ...state,
            comprobantes: action.payload.data.results,
            total_page: paginas,
            page_cout: action.payload.data.page_cout
          }

          case OBTENER_FACTURA_POR_DIA_ACTUAL:
            console.log('OBTENER_FACTURA_POR_DIA_ACTUAL', action.payload.data);
            
            total_page = action.payload.data.total_page;
            paginas = [];
            for(let i  = 1; i <= total_page; i++) {
              paginas.push(i);
            }
            return {
              ...state,
              facturas_del_dia: action.payload.data.results,
              total_page: paginas,
            page_cout: action.payload.data.page_cout
            }
  
        case OBTENER_COMPROBANTE:
         console.log("OBTENER_COMPROBANTE: ", action.payload);
        return {
          ...state,
          comprobanteEditar: action.payload,
          cargando: false
        };

        case OBTENER_FACTURA:
          console.log("OBTENER_FACTURA: ", action.payload);
         return {
           ...state,
           factura: action.payload,
         };
  
        case OBTENER_COMPROBANTES:
        // console.log("OBTENER_CATEGORIAS: ", action.payload);
        return {
          ...state,
          comprobantesSelect: action.payload
        };
  
      default:
        console.log("default: ");
        return {
          ...state,
        };
    }
  };
  
  export default reducer;
  
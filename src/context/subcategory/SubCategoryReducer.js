import {
    INICIANDO_CONSULTA,
    FINALIZANDO_CONSULTA,
    OBTENER_SUBCATEGORIA,
    OBTENER_SUBCATEGORIAS_POR_PAGINAS,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
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

        return {
          ...state,
          mensajeSubCategory: action.payload.msg
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
          mensajeSubCategory: null
        };
  

        case OBTENER_SUBCATEGORIAS_POR_PAGINAS:
          console.log('OBTENER_CATEGORIAS_POR_PAGINAS', action.payload.data);
          
          const total_page = action.payload.data.total_page;
          let paginas = [];
          for(let i  = 1; i <= total_page; i++) {
            paginas.push(i);
          }
          return {
            ...state,
            subCategorias: action.payload.data.results,
            total_page: paginas,
            page_cout: action.payload.data.page_cout
          }
  
        case OBTENER_SUBCATEGORIA:
         console.log("OBTENER_CATEGORIA: ", action.payload);
        return {
          ...state,
          subcategoriaEditar: action.payload,
          cargando: false
        };
  
      default:
        console.log("default: ");
        return {
          ...state,
        };
    }
  };
  
  export default reducer;
  
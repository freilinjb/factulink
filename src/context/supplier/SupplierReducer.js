import {
    INICIANDO_CONSULTA,
    FINALIZANDO_CONSULTA,
    OBTENER_PROVEEDORES,
    OBTENER_PROVEEDORES_POR_PAGINAS,
    OBTENER_PROVEEDORES_SELECT,
    BUSCAR_CIUDADES,
    BUSCAR_PROVINCIAS
  } from "../../types";
  
  const reducer = (state, action) => {
    switch (action.type) {
      case INICIANDO_CONSULTA:
        // console.log("INICIANDO_CONSULTA");
        return {
          ...state,
          cargando: true,
        };
  
      case FINALIZANDO_CONSULTA:
        // console.log("FINALIZANDO_CONSULTA");
        return {
          ...state,
          cargando: false,
        };
  
        case OBTENER_PROVEEDORES:
        // console.log("OBTENER_PROVEEDORES: ", action.payload);
        return {
          ...state,
          proveedores: action.payload
        };
  
        case OBTENER_PROVEEDORES_SELECT:
        console.log("OBTENER_PROVEEDORES_SELECT: ", action.payload);
        return {
          ...state,
          proveedoresSelect: action.payload
        };
        
        case OBTENER_PROVEEDORES_POR_PAGINAS:
          console.log('OBTENER_PROVEEDORES_POR_PAGINAS');

          const total_page = action.payload.data.total_page;
          let paginas = [];
          for(let i  = 1; i <= total_page; i++) {
            paginas.push(i);
          }

          return {
            ...state,
            proveedores: action.payload.data.results,
            total_page: paginas,
            page_cout: action.payload.data.page_cout,
            total_rows: action.payload.data.total_rows,
          }

        case  BUSCAR_CIUDADES:
          return {
            ...state,
            ciudades: action.payload
          };

          case  BUSCAR_PROVINCIAS:
            return {
              ...state,
              provincias: action.payload
            };
  
      default:
        // console.log("default: ");
        return {
          ...state,
        };
    }
  };
  
  export default reducer;
  
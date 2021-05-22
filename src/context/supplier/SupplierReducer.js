import {
    INICIANDO_CONSULTA,
    FINALIZANDO_CONSULTA,
    OBTENER_PROVEEDORES,
    OBTENER_PROVEEDORES_SELECT
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
        
  
  
      default:
        // console.log("default: ");
        return {
          ...state,
        };
    }
  };
  
  export default reducer;
  
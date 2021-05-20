import {
    INICIANDO_CONSULTA,
    FINALIZANDO_CONSULTA,
    OBTENER_PRODUCTOS,
    OBTENER_PRODUCTO,
    BUSCAR_PRODUCTOS,
    OBTENER_CATEGORIAS,
    OBTENER_SUBCATEGORIA,
    OBTENER_MARCAS,
    OBTENER_UNIDAD_PRESENTACION
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
  
        case OBTENER_PRODUCTOS:
        // console.log("OBTENER_PRODUCTOS: ", action.payload);
        return {
          ...state,
          productos: action.payload.data
        };
  
        case OBTENER_PRODUCTO:
         console.log("OBTENER_PRODUCTO: ", action.payload);
        return {
          ...state,
          productoEditar: action.payload,
          cargando: false
        };
  
        case BUSCAR_PRODUCTOS:
        // console.log("OBTENER_PRODUCTO: ", action.payload);
        return {
          ...state,
          productosBuscar:  state.productos.filter((producto) => {
            return (
              (
                producto.nombre.toLowerCase() +
                " " +
                producto.categoria.toLowerCase()
              ).includes(action.payload) || producto.subcategoria.toLowerCase().includes(action.payload)
            );
          })
        };
  
        case OBTENER_CATEGORIAS:
        // console.log("OBTENER_CATEGORIAS: ", action.payload);
        return {
          ...state,
          categorias: action.payload
        };
  
        case OBTENER_SUBCATEGORIA:
        // console.log("OBTENER_SUBCATEGORIA: ", action.payload);
        return {
          ...state,
          subCategorias: action.payload
        };
  
        case OBTENER_MARCAS:
        // console.log("OBTENER_MARCAS: ", action.payload);
        return {
          ...state,
          marcas: action.payload
        };
  
        case OBTENER_UNIDAD_PRESENTACION:
        // console.log("OBTENER_UNIDAD_PRESENTACION: ", action.payload);
        return {
          ...state,
          unidadPresentacion: action.payload
        };
  
        
  
      default:
        console.log("default: ");
        return {
          ...state,
        };
    }
  };
  
  export default reducer;
  
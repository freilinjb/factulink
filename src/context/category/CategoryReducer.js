import {
    INICIANDO_CONSULTA,
    FINALIZANDO_CONSULTA,
    OBTENER_PRODUCTOS,
    OBTENER_CATEGORIA,
    OBTENER_PRODUCTOS_POR_PAGINAS,
    OBTENER_CATEGORIAS_POR_PAGINAS,
    BUSCAR_PRODUCTOS,
    OBTENER_CATEGORIAS,
    OBTENER_SUBCATEGORIA,
    OBTENER_MARCAS,
    OBTENER_UNIDAD_PRESENTACION,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    ACTUALIZACION_EXITOSA
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
  
        case OBTENER_PRODUCTOS:
        console.log("OBTENER_PRODUCTOS: ", action.payload);
        return {
          ...state,
          productos: action.payload.data
        };

        case OBTENER_CATEGORIAS_POR_PAGINAS:
          console.log('OBTENER_CATEGORIAS_POR_PAGINAS', action.payload.data);
          
          const total_page = action.payload.data.total_page;
          let paginas = [];
          for(let i  = 1; i <= total_page; i++) {
            paginas.push(i);
          }
          return {
            ...state,
            categorias: action.payload.data.results,
            total_page: paginas,
            page_cout: action.payload.data.page_cout
          }
  
        case OBTENER_CATEGORIA:
         console.log("OBTENER_CATEGORIA: ", action.payload);
        return {
          ...state,
          categoriaEditar: action.payload,
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
          categoriasSelect: action.payload
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
  
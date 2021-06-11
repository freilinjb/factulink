import React, { useReducer } from "react";
import { useHistory } from "react-router";
import cookie from "js-cookie";
import ProductContext from "./ProductContext";
import ProductReducer from "./ProductReducer";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

import {
  INICIANDO_CONSULTA,
  OBTENER_PRODUCTOS,
  OBTENER_PRODUCTO,
  OBTENER_PRODUCTOS_POR_PAGINAS,
  FINALIZANDO_CONSULTA,
  OBTENER_CATEGORIAS,
  OBTENER_SUBCATEGORIA,
  OBTENER_MARCAS,
  OBTENER_UNIDAD_PRESENTACION,
  BUSCAR_PRODUCTOS,
  REGISTRO_EXITOSO,
  REGISTRO_ERROR
} from "../../types";

const ProductState = (props) => {
  const initialState = {
    productos: [],
    total_page: [],
    page_cout: null,
    productosBuscar: [],
    productoEditar: {},
    productoSeleccionado: null,
    categorias: [],
    subCategorias: [],
    marcas: [],
    unidadPresentacion: [],
    proveedores: [],
    estado: [
      { value: "1", label: "Activo" },
      { value: "0", label: "Inactivo" },
    ],
    busqueda: "",
    cargando: false,
  };

  const [state, dispatch] = useReducer(ProductReducer, initialState);
  const history = useHistory();

  const getProduct = async () => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA,
    });

    let respuesta2 = [];
    await clienteAxios
      .get("api/product")
      .then(async (respuesta) => {
        // console.log("respuesta: ", respuesta);

        respuesta2 = respuesta.data;
        dispatch({
          type: OBTENER_PRODUCTOS,
          payload: respuesta.data,
        });
      })
      .catch((error) => {
        console.log("error: ", error);
      })
      .finally(() => {
        dispatch({
          type: FINALIZANDO_CONSULTA,
        });
      });

    return respuesta2.data;
  };

  const getAllProduct = async (limit, page, search = 0) => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA,
    });

    await clienteAxios
      .get(`api/product?page=${page > 0 ? page : 1} ${search == 0 ? '' : '&search='+search } &limit=${limit}`)
      .then(async (respuesta) => {
        // console.log("getAllProduct: ", respuesta);

        dispatch({
          type: OBTENER_PRODUCTOS_POR_PAGINAS,
          payload: respuesta.data,
        });
      })
      .catch((error) => {
        console.log("error: ", error);
      })
      .finally(() => {
        dispatch({
          type: FINALIZANDO_CONSULTA,
        });
      });
  };

  const saludar = (nombre) => {
    console.log("hola como estas ", nombre);
  };

  const getCategory = async () => {
      clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA,
    });
    let categorias = [];
    await clienteAxios
      .get("api/product/category")
      .then(async (respuesta) => {
        console.log('categorias: ', respuesta);
        respuesta.data.data.forEach((key) => {
          categorias.push({
            value: key.idCategoria,
            label: key.categoria,
          });
        });

        dispatch({
          type: OBTENER_CATEGORIAS,
          payload: categorias,
        });
      })
      .catch((error) => {
        console.log("error: ", error);
      })
      .finally(() => {
        dispatch({
          type: FINALIZANDO_CONSULTA,
        });
      });
  };

  const getBrand = async () => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA,
    });
    let marcas = [];
    await clienteAxios
      .get("api/product/brand")
      .then(async (respuesta) => {
        console.log('marcas consultas: ', respuesta.data.data);
        respuesta.data.data.forEach((key) => {
          marcas.push({
            value: key.idMarca,
            label: key.marca,
          });
        });

        dispatch({
          type: OBTENER_MARCAS,
          payload: marcas,
        });
      })
      .catch((error) => {
        console.log("error: ", error);
      })
      .finally(() => {
        dispatch({
          type: FINALIZANDO_CONSULTA,
        });
      });
  };

  const getSubCategory = async () => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;

    dispatch({
      type: INICIANDO_CONSULTA,
    });
    let subcategorias = [];
    await clienteAxios
      .get("/api/product/subcategory")
      .then(async (respuesta) => {

        console.log('consultarSubCategorias: ', respuesta.data.data);
        respuesta.data.data.forEach((key) => {
          subcategorias.push({
            value: key.idSubCategoria,
            label: key.subCategoria,
          });
        });

        dispatch({
          type: OBTENER_SUBCATEGORIA,
          payload: subcategorias,
        });

        subcategorias = [];
      })
      .catch((error) => {
        console.log("error: ", error);
      })
      .finally(() => {
        dispatch({
          type: FINALIZANDO_CONSULTA,
        });
      });
  };

  const getUnidPresentation = async () => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;

    dispatch({
      type: INICIANDO_CONSULTA,
    });
    let unidadPresentacion = [];
    await clienteAxios
      .get("/api/product/presentationUnid")
      .then(async (respuesta) => {

        console.log('consultarUnidadPresentacion: ', respuesta.data.data);
        respuesta.data.data.forEach((key) => {
          unidadPresentacion.push({
            value: key.idUnidad,
            label: key.unidad,
          });
        });

        dispatch({
          type: OBTENER_UNIDAD_PRESENTACION,
          payload: unidadPresentacion,
        });

        unidadPresentacion = [];
      })
      .catch((error) => {
        console.log("error: ", error);
      })
      .finally(() => {
        dispatch({
          type: FINALIZANDO_CONSULTA,
        });
      });
  };
  
  const addProduct = async (data) => {
    
    dispatch({
      type: INICIANDO_CONSULTA
    });

    // console.log('data: ', data);
    // return;
    let proveedores = [];
    data.proveedor.forEach((key) => {
      proveedores.push(key.value);
      console.log("proveedorEnviado: ", key);
    });
    
    const formulario = new FormData();
    // formulario.append("idProducto", data.idProducto);
    formulario.append("codigo", data.codigo);
    formulario.append("nombre", data.nombre);
    formulario.append("idCategoria", Number(data.categoria.value));
    formulario.append("idSubCategoria", Number(data.subCategoria.value));
    formulario.append("idMarca", Number(data.marca.value));
    formulario.append("idUnidad", Number(data.unidad.value));
    formulario.append("descripcion", data.descripcion);
    formulario.append("stockInicial", Number(data.stockInicial));
    formulario.append("stockMinimo", Number(data.stockMinimo));
    formulario.append("reorden", Number(data.reorden));
    formulario.append("observacion", data.observacion);
    formulario.append("incluyeItbis", (data.incluyeItbis) ? 1 : 0);
    formulario.append("precioVenta", Number(data.precioVenta));
    formulario.append("precioCompra", Number(data.precioCompra));
    formulario.append("idProveedor", proveedores);
    formulario.append("productImag", data.imagen);
    formulario.append("creado_por", Number(data.creado_por));
    formulario.append("estado", Number(data.estado.value));

    await clienteAxios
      .post("api/product/", formulario,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (respuesta) => {
        console.log("respuestaUpdate: ", respuesta.data.data);

        //  Agrega el mensaje de la operación
        if(respuesta.data.data.length > 0) {
          if(respuesta.data.data[0].status == 200) {
            Swal.fire(
              'Good job!',
              'Se ha guardado de forma correcta!',
              'success'
            ).then((respuesta2) => {
              //Redireccionar
              history.replace("/product");
              console.log('prueba: ', respuesta2);
            });
          }
        }
        dispatch({
          type: REGISTRO_EXITOSO,
          payload: respuesta.data.data
        });
        
      })
      .catch((error) => {
        console.log("error: ", error);
        dispatch({
          type: REGISTRO_ERROR,
        });
      }).finally(() => {
        dispatch({
          type: FINALIZANDO_CONSULTA
        });
      });

  };

  const updateProduct = async (data) => {

    dispatch({
      type: INICIANDO_CONSULTA
    });

    // console.log('data: ', data);
    // return;
    let proveedores = [];
    data.proveedor.forEach((key) => {
      proveedores.push(key.value);
      console.log("proveedorEnviado: ", key);
    });
    
    const formulario = new FormData();
    // formulario.append("idProducto", data.idProducto);
    formulario.append("idProducto", data.idProducto);
    formulario.append("codigo", data.codigo);
    formulario.append("nombre", data.nombre);
    formulario.append("idCategoria", Number(data.categoria.value));
    formulario.append("idSubCategoria", Number(data.subCategoria.value));
    formulario.append("idMarca", Number(data.marca.value));
    formulario.append("idUnidad", Number(data.unidad.value));
    formulario.append("descripcion", data.descripcion);
    formulario.append("stockInicial", Number(data.stockInicial));
    formulario.append("stockMinimo", Number(data.stockMinimo));
    formulario.append("reorden", Number(data.reorden));
    formulario.append("observacion", data.observacion);
    formulario.append("incluyeItbis", (data.incluyeItbis) ? 1 : 0);
    formulario.append("precioVenta", Number(data.precioVenta));
    formulario.append("precioCompra", Number(data.precioCompra));
    formulario.append("idProveedor", proveedores);
    formulario.append("productImag", data.imagen);
    formulario.append("creado_por", Number(data.creado_por));
    formulario.append("estado", Number(data.estado.value));

    await clienteAxios
      .put("api/product/", formulario,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (respuesta) => {
        console.log("respuestaUpdate: ", respuesta.data.data);

        //  Agrega el mensaje de la operación
        if(respuesta.data.data.length > 0) {
          if(respuesta.data.data[0].status == 200) {
            Swal.fire(
              'Good job!',
              'Se ha guardado de forma correcta!',
              'success'
            ).then((result) => {
              //Redireccionar
              history.replace("/admin/supplier");
              console.log('prueba: ', result);
            });
          }
        }


        dispatch({
          type: REGISTRO_EXITOSO,
          payload: respuesta.data.data
        });
        
      })
      .catch((error) => {
        console.log("error: ", error);
        dispatch({
          type: REGISTRO_ERROR,
        });
      }).finally(() => {
        dispatch({
          type: FINALIZANDO_CONSULTA
        });
      });
  };

  const buscarProducto = (busqueda) => {
    const buscar = busqueda.toLowerCase()
    dispatch({
      type: BUSCAR_PRODUCTOS,
      payload: buscar
    });
  }

  const getProductByID = async (idProducto) => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA
    });

    await clienteAxios.get(`api/product/${idProducto}`).then( async(respuesta) => {
      console.log('respuesta: ', respuesta);

      dispatch({
        type: OBTENER_PRODUCTO,
        payload: respuesta.data.data
      });

    });
  }

  return (
    <ProductContext.Provider
      value={{
        productos: state.productos,
        productosBuscar: state.productosBuscar,
        productoEditar: state.productoEditar,
        total_page: state.total_page,
        page_cout: state.page_cout,
        productoSeleccionado: state.productoSeleccionado,
        categorias: state.categorias,
        subCategorias: state.subCategorias,
        marcas: state.marcas,
        unidadPresentacion: state.unidadPresentacion,
        estado: state.estado,
        cargando: state.cargando,
        getProduct,
        getAllProduct,
        addProduct,
        updateProduct,
        getProductByID,
        buscarProducto,
        getCategory,
        getSubCategory,
        getBrand,
        getUnidPresentation,
        saludar,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;

import React, { useReducer } from "react";
import cookie from "js-cookie";

import ProductContext from "./ProductContext";
import ProductReducer from "./ProductReducer";

import clienteAxios from "../../config/axios";

// import Swal from "sweetalert2";

import {
  INICIANDO_CONSULTA,
  OBTENER_PRODUCTOS,
  OBTENER_PRODUCTO,
  FINALIZANDO_CONSULTA,
  OBTENER_CATEGORIAS,
  OBTENER_SUBCATEGORIA,
  OBTENER_MARCAS,
  OBTENER_UNIDAD_PRESENTACION,
  BUSCAR_PRODUCTOS
} from "../../types";

const ProductState = (props) => {

  const initialState = {
    productos: [],
    productosBuscar: [],
    productoEditar: [],
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

  const getProduct = async () => {
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
            label: key.subcategoria,
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
  
  const registrarProducto = async (data) => {
    console.log("data: ", data);

    const {
      codigo,
      nombre,
      categoria,
      subcategoria,
      marca,
      unidad,
      descripcion,
      stockInicial,
      stockMinimo,
      reorden,
      observacion,
      incluyeItbis,
      precioVenta,
      precioCompra,
      imagen,
      proveedor,
      creado_por,
      estado,
    } = data;

    await clienteAxios
      .post("api/product/", {
        codigo,
        nombre,
        idCategoria: Number(categoria.value),
        idSubCategoria: Number(subcategoria.value),
        idMarca: Number(marca.value),
        idUnidad: Number(unidad.value),
        reorden: Number(reorden),
        descripcion,
        stockInicial: Number(stockInicial),
        stockMinimo: Number(stockMinimo),
        observacion,
        incluyeItbis,
        precioVenta: Number(precioVenta),
        precioCompra: Number(precioCompra),
        idProveedor: 4,
        productImag: imagen,
        creado_por,
        estado: Number(estado.value),
      })
      .then(async (respuesta) => {
        console.log("respuesta: ", respuesta.data);

        // Swal.fire(
        //   'Good job!',
        //   'Se ha guardado de forma correcta!',
        //   'success'
        // )
        // Router.push("/AdminProductos");
        
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const updateProduct = async (data) => {
     console.log("data: ", data);

    const {
      imagen,
    } = data;

    const formulario = new FormData();
    formulario.append("idProducto", data.idProducto);
    formulario.append("codigo", data.codigo);
    formulario.append("nombre", data.nombre);
    formulario.append("idCategoria", Number(data.categoria.value));
    formulario.append("idSubCategoria", Number(data.subcategoria.value));
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
    formulario.append("idProveedor", 4);
    formulario.append("productImag", imagen);
    formulario.append("creado_por", Number(data.creado_por));
    formulario.append("estado", Number(data.estado.value));

    await clienteAxios
      .put("api/product/", formulario,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (respuesta) => {
        console.log("respuesta: ", respuesta);

        // Swal.fire(
        //   'Good job!',
        //   'Se ha guardado de forma correcta!',
        //   'success'
        // )
        // Router.push("/AdminProductos");
        
      })
      .catch((error) => {
        console.log("error: ", error);
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
    dispatch({
      type: INICIANDO_CONSULTA
    });

    await clienteAxios.get(`api/product/${idProducto}`).then( async(respuesta) => {
      console.log('respuesta: ', respuesta.data.data);

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
        productoSeleccionado: state.productoSeleccionado,
        categorias: state.categorias,
        subCategorias: state.subCategorias,
        marcas: state.marcas,
        unidadPresentacion: state.unidadPresentacion,
        estado: state.estado,
        cargando: state.cargando,
        getProduct,
        registrarProducto,
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

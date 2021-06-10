import React, { useReducer } from "react";
import { useHistory } from "react-router";
import cookie from "js-cookie";
import CategoryContext from "./CategoryContext";
import CategoryReducer from "./CategoryReducer";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

import {
  INICIANDO_CONSULTA,
  OBTENER_CATEGORIA,
  OBTENER_CATEGORIAS_POR_PAGINAS,
  FINALIZANDO_CONSULTA,
  OBTENER_CATEGORIAS,
  ACTUALIZACION_EXITOSA,
  OBTENER_SUBCATEGORIA,
  REGISTRO_EXITOSO,
  REGISTRO_ERROR
} from "../../types";

const CategoryState = (props) => {
  const initialState = {
    categorias: [],
    subCategorias: [],
    total_page: [],
    page_cout: null,
    productosBuscar: [],
    categoriaEditar: {},
    subCategoriaEditar: {},
    productoSeleccionado: null,
    estado: [
      { value: 1, label: "Activo" },
      { value: 0, label: "Inactivo" },
    ],
    busqueda: "",
    mensajeCategory:"",
    cargando: false,
  };

  const [state, dispatch] = useReducer(CategoryReducer, initialState);
  const history = useHistory();

  const getAllCategory = async (limit, page, search = 0) => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA,
    });
    console.log('CATEGORIAS: ');
    await clienteAxios
      .get(`api/product/category?page=${page > 0 ? page : 1} ${search == 0 ? '' : '&search='+search } &limit=${limit}`)
      .then(async (respuesta) => {
        console.log("Categorias: ", respuesta);

        dispatch({
          type: OBTENER_CATEGORIAS_POR_PAGINAS,
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
  
  const addCategory = async (data) => {
    
    dispatch({
      type: INICIANDO_CONSULTA
    });


    await clienteAxios
      .post("api/product/category/", {
        nombre: data.nombre,
        estado: data.estado.value
      })
      .then(async (respuesta) => {
        console.log("addCategory: ", respuesta.data);

        //  Agrega el mensaje de la operación
        if(respuesta.data.status == 200) {
          Swal.fire(
            'Good job!',
            'Se ha guardado de forma correcta!',
            'success'
          ).then((respuesta2) => {
            //Redireccionar
            // history.replace("/product/category");
            console.log('prueba: ', respuesta2);
          });
        }
        dispatch({
          type: REGISTRO_EXITOSO,
          payload: respuesta.data
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

  const updateCategory = async (data) => {
    console.log('Editando estos campos: ', data);
    // return;
    dispatch({
      type: INICIANDO_CONSULTA
    });

    await clienteAxios
      .put(`api/product/category/${data.idCategoria}`, {
        idCategoria: data.idCategoria,
        nombre: data.nombre,
        estado: data.estado.value,
      })
      .then(async (respuesta) => {
        console.log("respuestaUpdate: ", respuesta.data);

        //  Agrega el mensaje de la operación
          if(respuesta.data.status == 200) {
            Swal.fire(
              'Good job!',
              'Se ha actualizado de forma correcta!',
              'success'
            ).then((result) => {
              //Redireccionar
              // history.replace("/admin/supplier");
              console.log('prueba: ', result);
            });
          }


        dispatch({
          type: REGISTRO_EXITOSO,
          payload: respuesta.data
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

  const getCategoryByID = async (idCategory) => {

    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA
    });

    await clienteAxios.get(`api/product/category/${idCategory}`).then( async(respuesta) => {
      console.log('respuesta: ', respuesta);

      dispatch({
        type: OBTENER_CATEGORIA,
        payload: respuesta.data.data[0]
      });
    });
  }

  return (
    <CategoryContext.Provider
      value={{
        productos: state.productos,
        productosBuscar: state.productosBuscar,
        total_page: state.total_page,
        page_cout: state.page_cout,
        categorias: state.categorias,
        categoriaEditar: state.categoriaEditar,
        subCategorias: state.subCategorias,
        estado: state.estado,
        cargando: state.cargando,
        mensajeCategory: state.mensajeCategory,
        getAllCategory,
        addCategory,
        updateCategory,
        getCategoryByID,
        getCategory,
        getSubCategory,
        saludar,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryState;

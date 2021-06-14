import React, { useReducer } from "react";
import { useHistory } from "react-router";
import cookie from "js-cookie";
import CategoryContext from "./SubCategoryContext";
import CategoryReducer from "./SubCategoryReducer";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

import {
  INICIANDO_CONSULTA,
  OBTENER_SUBCATEGORIA,
  OBTENER_SUBCATEGORIAS_POR_PAGINAS,
  FINALIZANDO_CONSULTA,
  REGISTRO_EXITOSO,
  REGISTRO_ERROR
} from "../../types";

const SubCategoryState = (props) => {
  const initialState = {
    subCategorias: [],
    subCategoriasSelect: [],
    subcategoriaEditar: {},
    busqueda: "",
    mensajeSubCategory:"",
    total_page: [],
    page_cout: null,
    cargando: false,
    estado: [
      { value: 1, label: "Activo" },
      { value: 0, label: "Inactivo" },
    ],
  };

  const [state, dispatch] = useReducer(CategoryReducer, initialState);
  // const history = useHistory();

  const getASubCategoryPaged = async (limit, page, search = 0) => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA,
    });
    // console.log('getASubCategoryPaged: ');
    await clienteAxios
      .get(`api/product/subcategory?page=${page > 0 ? page : 1} ${search == 0 ? '' : '&search='+search } &limit=${limit}`)
      .then(async (respuesta) => {
        console.log("getASubCategoryPaged: ", respuesta);

        dispatch({
          type: OBTENER_SUBCATEGORIAS_POR_PAGINAS,
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
  
  const addSubCategory = async (data) => {
    
    dispatch({
      type: INICIANDO_CONSULTA
    });


    await clienteAxios
      .post("api/product/subCategory/", {
        nombre: data.nombre,
        idCategoria: data.categoria.value,
        estado: data.estado.value
      })
      .then(async (respuesta) => {
        console.log("subCategory: ", respuesta.data);

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

  const updateSubCategory = async (data) => {
    console.log('Editando estos campos: ', data);
    dispatch({
      type: INICIANDO_CONSULTA
    });

    await clienteAxios
      .put(`api/product/subCategory/${data.idSubCategoria}`, {
        idSubCategoria: data.idSubCategoria,
        idCategoria: Number(data.categoria.value),
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

  const getSubCategoryByID = async (idCategory) => {

    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA
    });

    await clienteAxios.get(`api/product/subCategory/${idCategory}`).then( async(respuesta) => {
      console.log('respuesta: ', respuesta);

      dispatch({
        type: OBTENER_SUBCATEGORIA,
        payload: respuesta.data.data[0]
      });
    });
  }

  return (
    <CategoryContext.Provider
      value={{
        total_page: state.total_page,
        page_cout: state.page_cout,
        subCategorias: state.subCategorias,
        subCategoriasSelect: state.subCategoriasSelect,
        subcategoriaEditar: state.subcategoriaEditar,
        estado: state.estado,
        cargando: state.cargando,
        mensajeSubCategory: state.mensajeSubCategory,
        getASubCategoryPaged,
        addSubCategory,
        updateSubCategory,
        getSubCategoryByID,
        getSubCategory,
        getSubCategory,
        saludar,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default SubCategoryState;

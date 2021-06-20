import React, { useReducer } from "react";
// import { useHistory } from "react-router";
import cookie from "js-cookie";
import UnidContext from "./UnidContext";
import UnidReducer from "./UnidReducer";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

import {
  INICIANDO_CONSULTA,
  OBTENER_UNIDAD,
  OBTENER_UNIDAD_POR_PAGINAS,
  FINALIZANDO_CONSULTA,
  REGISTRO_EXITOSO,
  REGISTRO_ERROR
} from "../../types";

const UnidState = (props) => {
  const initialState = {
    unidades: [],
    unidadSelect: [],
    unidadEditar: {},
    busqueda: "",
    mensajeUnidad:"",
    total_page: [],
    page_cout: null,
    cargando: false,
    estado: [
      { value: 1, label: "Activo" },
      { value: 0, label: "Inactivo" },
    ],
  };

  const [state, dispatch] = useReducer(UnidReducer, initialState);
  // const history = useHistory();

  const getUnidPaged = async (limit, page, search = 0) => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA,
    });
    // console.log('getUnidPaged: ');
    await clienteAxios
      .get(`api/product/unid?page=${page > 0 ? page : 1} ${search == 0 ? '' : '&search='+search } &limit=${limit}`)
      .then(async (respuesta) => {
        console.log("getUnidPaged: ", respuesta);

        dispatch({
          type: OBTENER_UNIDAD_POR_PAGINAS,
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

  const getUnid = async () => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;

    dispatch({
      type: INICIANDO_CONSULTA,
    });
    let unidad = [];
    await clienteAxios
      .get("/api/product/unid")
      .then(async (respuesta) => {

        console.log('consultarUnid: ', respuesta.data.data);
        respuesta.data.data.forEach((key) => {
          unidad.push({
            value: key.idUnidad,
            label: key.unidad,
          });
        });

        dispatch({
          type: OBTENER_UNIDAD,
          payload: unidad,
        });

        unidad = [];
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
  
  const addUnid = async (data) => {
    
    dispatch({
      type: INICIANDO_CONSULTA
    });


    await clienteAxios
      .post("api/product/unid/", {
        nombre: data.nombre,
        estado: data.estado.value
      })
      .then(async (respuesta) => {
        console.log("unid: ", respuesta.data);

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

  const updateUnid = async (data) => {
    console.log('Editando estos campos: ', data);
    dispatch({
      type: INICIANDO_CONSULTA
    });

    await clienteAxios
      .put(`api/product/unid/${data.idUnidad}`, {
        idUnidad: data.idUnidad,
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

  const getUnidByID = async (idUnidad) => {

    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA
    });

    await clienteAxios.get(`api/product/unid/${idUnidad}`).then( async(respuesta) => {
      console.log('respuesta: ', respuesta);

      dispatch({
        type: OBTENER_UNIDAD,
        payload: respuesta.data.data[0]
      });
    });
  }

  return (
    <UnidContext.Provider
      value={{
        total_page: state.total_page,
        page_cout: state.page_cout,
        unidades: state.unidades,
        unidadSelect: state.unidadSelect,
        unidadEditar: state.unidadEditar,
        estado: state.estado,
        cargando: state.cargando,
        mensajeUnidad: state.mensajeUnidad,
        getUnidPaged,
        addUnid,
        updateUnid,
        getUnidByID,
        getUnid,
        saludar,
      }}
    >
      {props.children}
    </UnidContext.Provider>
  );
};

export default UnidState;

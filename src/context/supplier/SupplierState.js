import React, { useReducer } from "react";
import cookie from "js-cookie";

import SupplierContext from "./SupplierContext";
import SupplierReducer from "./SupplierReducer";
import clienteAxios from "../../config/axios";
import { useHistory } from "react-router";

import {
  INICIANDO_CONSULTA,
  FINALIZANDO_CONSULTA,
  OBTENER_PROVEEDORES,
  OBTENER_PROVEEDORES_SELECT,
  OBTENER_PROVEEDORES_POR_PAGINAS,
} from "../../types";

const SupplierState = (props) => {
  const initialState = {
    proveedores: [],
    proveedoresSelect: [],
    proveedorSeleccionado: [],
    estado: [
      { value: "1", label: "Activo" },
      { value: "0", label: "Inactivo" },
    ],
    total_page: [],
    total_rows: null,
    page_cout: null,
    cargando: false,
    mensaje: null,
  };

  const [state, dispatch] = useReducer(SupplierReducer, initialState);
  const history = useHistory();

  const getSupplier = async () => {
    console.log("getProveedores: ");
    dispatch({
      type: INICIANDO_CONSULTA,
    });

    await clienteAxios
      .get("api/supplier")
      .then(async (respuesta) => {
        console.log("proveedores: ", respuesta.data.data);

        // console.log('marcas consultas: ', respuesta.data.data);
        let proveedores = [];

        respuesta.data.data.forEach((key) => {
          proveedores.push({
            value: key.idProveedor,
            label: key.nombre ? key.nombre : key.razonSocial,
          });
        });

        dispatch({
          type: OBTENER_PROVEEDORES_SELECT,
          payload: proveedores,
        });

        proveedores = [];

        dispatch({
          type: OBTENER_PROVEEDORES,
          payload: respuesta.data.data,
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

  const getAllSupplier = async (limit, page, search = 0) => {
    console.log('search: ', search);

    clienteAxios.defaults.headers.common[
      "authorization"
    ] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA,
    });

    await clienteAxios
      .get(
        `api/supplier?page=${page > 0 ? page : 1} ${
          search == 0 ? "" : "&search=" + search
        } &limit=${limit}`
      )
      .then(async (respuesta) => {
        console.log("getAllProduct: ", respuesta.data);

        dispatch({
          type: OBTENER_PROVEEDORES_POR_PAGINAS,
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

  return (
    <SupplierContext.Provider
      value={{
        mensaje: state.mensaje,
        proveedores: state.proveedores,
        proveedoresSelect: state.proveedoresSelect,
        proveedorSeleccionado: state.proveedorSeleccionado,
        estado: state.estado,
        cargando: state.cargando,
        total_page: state.total_page,
        total_rows: state.total_rows,
        page_cout: state.page_cout,
        getSupplier,
        getAllSupplier,
      }}
    >
      {props.children}
    </SupplierContext.Provider>
  );
};

export default SupplierState;

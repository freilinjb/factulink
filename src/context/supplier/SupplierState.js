import React, { useReducer } from "react";

import SupplierContext from "./SupplierContext";
import SupplierReducer from "./SupplierReducer";

import clienteAxios from "../../config/axios";

import { useHistory } from "react-router";


import {
  INICIANDO_CONSULTA,
  FINALIZANDO_CONSULTA,
  OBTENER_PROVEEDORES,
  OBTENER_PROVEEDORES_SELECT
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
    cargando: false,
    mensaje: null
  };

  const [state, dispatch] = useReducer(SupplierReducer, initialState);
  const history = useHistory();

  const getSupplier = async () => {

    console.log('getProveedores: ');
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
 
  return (
    <SupplierContext.Provider
      value={{
        mensaje: state.mensaje, 
        proveedores: state.proveedor,
        proveedoresSelect: state.proveedoresSelect,
        proveedorSeleccionado: state.proveedorSeleccionado,
        estado: state.estado,
        cargando: state.cargando,
        getSupplier
      }}
    >
      {props.children}
      </SupplierContext.Provider>
  );
};


export default SupplierState;

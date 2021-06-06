import React, { useReducer } from "react";
import cookie from "js-cookie";

import Swal from "sweetalert2";

import SupplierContext from "./SupplierContext";
import SupplierReducer from "./SupplierReducer";
import clienteAxios from "../../config/axios";
import { useHistory } from "react-router";

import {
  INICIANDO_CONSULTA,
  FINALIZANDO_CONSULTA,
  OBTENER_PROVEEDORES,
  OBTENER_PROVEEDORE,
  OBTENER_PROVEEDORES_SELECT,
  OBTENER_PROVEEDORES_POR_PAGINAS,
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  BUSCAR_CIUDADES,
  BUSCAR_PROVINCIAS
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

    // GENERALES
    ciudades: [],
    provincias: []
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

  const getCity = async () => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
  dispatch({
    type: INICIANDO_CONSULTA,
  });
  let ciudades = [];
  await clienteAxios
    .get("api/city")
    .then(async (respuesta) => {
      // console.log('ciudades: ', respuesta);
      respuesta.data.data.forEach((key) => {
        ciudades.push({
          value: key.idCiudad,
          label: key.ciudad,
        });
      });

      dispatch({
        type: BUSCAR_CIUDADES,
        payload: ciudades,
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

  const getProvince = async () => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
  dispatch({
    type: INICIANDO_CONSULTA,
  });
  let provincia = [];
  await clienteAxios
    .get("api/province")
    .then(async (respuesta) => {
      // console.log('provincia: ', respuesta);
      respuesta.data.data.forEach((key) => {
        provincia.push({
          value: key.idProvincia,
          label: key.provincia,
        });
      });
      // console.log('Pruebaprovincia: ', provincia);
      dispatch({
        type: BUSCAR_PROVINCIAS,
        payload: provincia,
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

  const addSupplier = async (data) => {
    
    dispatch({
      type: INICIANDO_CONSULTA
    });
    
    const formulario = new FormData();
    // formulario.append("idProducto", data.idProducto);
    formulario.append("nombre", data.nombre);
    formulario.append("razonSocial", data.razonSocial);
    formulario.append("rnc", data.rnc);
    formulario.append("correo", data.correo);
    formulario.append("telefono", data.telefono);
    formulario.append("idCiudad", Number(data.ciudad.value));
    formulario.append("idProvincia", Number(data.provincia.value));
    formulario.append("direccion", data.descripcion);
    formulario.append("observacion", data.observacion);
    formulario.append("creado_por", 1);
    formulario.append("img", data.imagen);
    formulario.append("estado", Number(data.estado.value));


    await clienteAxios
      .post("api/supplier/", formulario,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (respuesta) => {
        console.log("respuestaUpdate: ", respuesta.data);

        //  Agrega el mensaje de la operación
        if(respuesta.data.data.length > 0) {
          if(respuesta.data.data[0].status == 200) {
            Swal.fire(
              'Good job!',
              'Se ha guardado de forma correcta!',
              'success'
            ).then((respuesta2) => {
              //Redireccionar
              history.replace("/admin/supplier");
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

  const updateSupplier = async (data) => {
    dispatch({
      type: INICIANDO_CONSULTA
    });
    
    const formulario = new FormData();
    formulario.append("idProveedor", data.idProveedor);
    formulario.append("nombre", data.nombre);
    formulario.append("razonSocial", data.razonSocial);
    formulario.append("rnc", data.rnc);
    formulario.append("correo", data.correo);
    formulario.append("telefono", data.telefono);
    formulario.append("idCiudad", Number(data.ciudad.value));
    formulario.append("idProvincia", Number(data.provincia.value));
    formulario.append("direccion", data.descripcion);
    formulario.append("observacion", data.observacion);
    formulario.append("creado_por", 1);
    formulario.append("img", data.imagen);
    formulario.append("estado", Number(data.estado.value));


    await clienteAxios
      .put("api/supplier/", formulario,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (respuesta) => {
        console.log("respuestaUpdate: ", respuesta.data);

        //  Agrega el mensaje de la operación
        if(respuesta.data.data.length > 0) {
          if(respuesta.data.data[0].status == 200) {
            Swal.fire(
              'Good job!',
              'Se ha guardado de forma correcta!',
              'success'
            ).then((respuesta2) => {
              //Redireccionar
              history.replace("/admin/supplier");
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
  }

  const getSupplierByID = async (id) => {
    dispatch({
      type: INICIANDO_CONSULTA,
    });

    await clienteAxios
      .get(`api/supplier/${id}`)
      .then(async (respuesta) => {
        console.log("getSupplierByID: ", respuesta.data.data[0]);


        dispatch({
          type: OBTENER_PROVEEDORE,
          payload: respuesta.data.data,
        });

        dispatch({
          type: OBTENER_PROVEEDORES,
          payload: respuesta.data.data[0],
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
  }

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
        // GENERALES
        ciudades: state.ciudades,
        provincias: state.provincias,
        // GENERALES
        getSupplier,
        getAllSupplier,
        addSupplier,
        getSupplierByID,
        updateSupplier,
        getCity,
        getProvince
      }}
    >
      {props.children}
    </SupplierContext.Provider>
  );
};

export default SupplierState;

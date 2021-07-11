import React, { useReducer } from "react";
import cookie from "js-cookie";
import ComprobanteContext from "./ComprobanteContext";
import ComprobanteReducer from "./ComprobanteReducer";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

import {
  INICIANDO_CONSULTA,
  OBTENER_COMPROBANTE,
  OBTENER_COMPROBANTES_POR_PAGINAS,
  FINALIZANDO_CONSULTA,
  OBTENER_COMPROBANTES,
  OBTENER_FACTURA,
  OBTENER_FACTURA_POR_DIA_ACTUAL,
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
} from "../../types";

const ComprobanteState = (props) => {
  const initialState = {
    comprobantes: [],
    comprobantesSelect: [],
    factura: [],
    facturas_del_dia: [],
    total_page: [],
    page_cout: null,
    comprobanteEditar: {},
    estado: [
      { value: 1, label: "Activo" },
      { value: 0, label: "Inactivo" },
    ],
    mensajeComprobante:"",
    cargando: false,
  };

  const [state, dispatch] = useReducer(ComprobanteReducer, initialState);
  // const history = useHistory();

  const getAllComprobante = async (limit, page, search = 0) => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA,
    });
    console.log('getAllComprobante: ');
    await clienteAxios
      .get(`api/comprobante?page=${page > 0 ? page : 1} ${search == 0 ? '' : '&search='+search } &limit=${limit}`)
      .then(async (respuesta) => {
        console.log("getAllComprobante: ", respuesta);

        dispatch({
          type: OBTENER_COMPROBANTES_POR_PAGINAS,
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

  const getInvoiceForDay = async (limit, page, search = 0) => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA,
    });
    console.log('getInvoiceForDay: ');
    await clienteAxios
      .get(`/api/billing/invoice_current?page=${page > 0 ? page : 1} ${search == 0 ? '' : '&search='+search } &limit=${limit}`)
      .then(async (respuesta) => {
        console.log("getInvoiceForDay: ", respuesta);

        dispatch({
          type: OBTENER_FACTURA_POR_DIA_ACTUAL,
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
  }

  const getInvoice = async (number) => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA,
    });
    await clienteAxios
      .get(`/api/billing/invoice/${number}`)
      .then(async (respuesta) => {
        console.log('invoice: ', respuesta.data.data);

        dispatch({
          type: OBTENER_FACTURA,
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
  }
  const addFactura = async (data) => {

    console.log('addFactura: ', data);
  // return;    
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA,
    });

    await clienteAxios
      .post("/api/billing", { 
        idUsuario: data.idUsuario, 
        tipoComprobante: data.tipoComprobante, 
        idCliente: data.idCliente, 
        idTipoFactura: data.idTipoFactura, 
        idFormaPago: data.idFormaPago, 
        descuento: data.descuento, 
        observacion: data.observacion, 
        productos: data.productos, 
      })
      .then(async (respuesta) => {
        if(respuesta.data.success == 1) {
          window.open(`/#/billing/invoice/${respuesta.data.data[0].numFactura}`);
          console.log('/#/Abrir factura: ',respuesta.data.data[0].numFactura);
        }
        console.log("Respuesta: ", respuesta.data.data);
      })
      .catch((error) => {
          console.log('Error: ', error);
      });

  };

  const getComprobante = async () => {
      clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA,
    });
    let categorias = [];
    await clienteAxios
      .get("api/comprobante")
      .then(async (respuesta) => {
        console.log('categorias: ', respuesta);
        respuesta.data.data.forEach((key) => {
          categorias.push({
            value: key.idCategoria,
            label: key.categoria,
          });
        });

        dispatch({
          type: OBTENER_COMPROBANTES,
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

  const addComprobante = async (data) => {
    
    dispatch({
      type: INICIANDO_CONSULTA
    });

    await clienteAxios
      .post("api/comprobante/", {
        tipoComprobante: Number(data.tipoComprobante.value),
        vencimiento: data.fechaVencimiento,
        inicio: Number(data.inicio),
        final: Number(data.final),
        secuencia: Number(data.secuencia),
        idSucursal: Number(0),
        creado_por: Number(1),
        estado: data.estado.value
      })
      .then(async (respuesta) => {
        console.log("addCategory: ", respuesta.data);

        //  Agrega el mensaje de la operación
        if(respuesta.data.success == 1) {
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

  const updateComprobante = async (data) => {
    console.log('Editando estos campos: ', data);
    // return;
    dispatch({
      type: INICIANDO_CONSULTA
    });

    await clienteAxios
      .put(`api/comprobante/${data.idCategoria}`, {
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

  const getComprobanteByID = async (tipoComprobante) => {

    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA
    });

    await clienteAxios.get(`api/comprobante/${tipoComprobante}`).then( async(respuesta) => {
      console.log('respuesta: ', respuesta);

      dispatch({
        type: OBTENER_COMPROBANTE,
        payload: respuesta.data.data[0]
      });
    });
  }

  return (
    <ComprobanteContext.Provider
      value={{
        total_page: state.total_page,
        page_cout: state.page_cout,
        comprobantes: state.comprobantes,
        comprobantesSelect: state.comprobantesSelect,
        comprobanteEditar: state.comprobanteEditar,
        estado: state.estado,
        cargando: state.cargando,
        mensajeComprobante: state.mensajeComprobante,
        factura: state.factura,
        facturas_del_dia: state.facturas_del_dia,
        getAllComprobante,
        addComprobante,
        updateComprobante,
        getComprobanteByID,
        getComprobante,
        addFactura,
        getInvoice,
        getInvoiceForDay,
        saludar,
      }}
    >
      {props.children}
    </ComprobanteContext.Provider>
  );
};

export default ComprobanteState;

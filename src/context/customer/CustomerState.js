import React, { useReducer } from "react";
import { useHistory } from "react-router";
import cookie from "js-cookie";
import CustomerContext from "./CustomerContext";
import CustomerReducer from "./CustomerReducer";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

import {
  INICIANDO_CONSULTA,
  OBTENER_CLIENTES,
  OBTENER_CLIENTE,
  OBTENER_CLIENTE_POR_PAGINAS,
  OBTENER_COMPROBANTES,
  OBTENER_IDENTIFICACIONES,
  FINALIZANDO_CONSULTA,
  REGISTRO_EXITOSO,
  REGISTRO_ERROR
} from "../../types";

const CustomerState = (props) => {
  const initialState = {
    clientes: [],
    comprobantes: [],
    identificaciones: [],
    total_page: [],
    page_cout: null,
    clientesBuscar: [],
    clienteEditar: {},
    clienteSeleccionado: null,
    mensajeCliente: null,
    estado: [
      { value: "1", label: "Activo" },
      { value: "0", label: "Inactivo" },
    ],
    busqueda: "",
    cargando: false,
  };

  const [state, dispatch] = useReducer(CustomerReducer, initialState);
  const history = useHistory();

  const getCustomer = async () => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA,
    });

    let respuesta2 = [];
    await clienteAxios
      .get("api/customer")
      .then(async (respuesta) => {
        // console.log("respuesta: ", respuesta);

        respuesta2 = respuesta.data;
        dispatch({
          type: OBTENER_CLIENTES,
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

  const getCustomerPage = async (limit, page, search = 0) => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA,
    });

    await clienteAxios
      .get(`api/customer?page=${page > 0 ? page : 1} ${search == 0 ? '' : '&search='+search } &limit=${limit}`)
      .then(async (respuesta) => {
        // console.log("getAllProduct: ", respuesta);

        dispatch({
          type: OBTENER_CLIENTE_POR_PAGINAS,
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
  
  const addCustomer = async (data) => {
    console.log('addCustomer: ',data);
    // return;

    dispatch({
      type: INICIANDO_CONSULTA
    });
    
    const formulario = new FormData();
    // formulario.append("idProducto", data.idProducto);
    formulario.append("nombre", data.nombre);
    formulario.append("idTipoIdentificacion", Number(data.tipoIdentificacion.value));
    formulario.append("identificacion", data.identificacion);
    formulario.append("correo", data.correo);
    formulario.append("telefono", data.telefono);
    formulario.append("sitioWeb", data.sitioWeb);
    formulario.append("tipoComprobante", Number(data.tipoComprobante.value));
    formulario.append("idVendedor", Number(data.vendedor.value));
    formulario.append("diasCredito", Number(data.plazoPago.value));
    formulario.append("limiteCredito", Number(data.limiteCredito));
    formulario.append("aplicaDescuento", Number(data.limiteCredito) > 0 ? 1 : 0 );
    formulario.append("idProvincia", Number(data.provincia.value));
    formulario.append("idCiudad", Number(data.ciudad.value));
    formulario.append("direccion", data.direccion);
    formulario.append("customerImg", data.imagen);
    formulario.append("creado_por", Number(data.creado_por));
    formulario.append("observacion", data.observacion);
    formulario.append("estado", Number(data.estado.value));

    await clienteAxios
      .post("api/customer/", formulario,{
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
              history.replace("/customer");
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

  const updateCustomer = async (data) => {

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
      .put("api/customer/", formulario,{
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

  const getIdentification = async () => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA,
    });

    await clienteAxios.get('api/identification/').then( async(respuesta) => {
      console.log('getIdentification: ', respuesta);
      let identificacion = [];

      respuesta.data.data.forEach((key) => {
        identificacion.push({
          value: key.idTipo,
          label: key.identificacion,
        });
      });
      
      dispatch({
        type: OBTENER_IDENTIFICACIONES,
        payload: identificacion
      });

    });
  }

  const getComprobantes = async () => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA,
    });

    await clienteAxios.get('api/customer/comprobante').then( async(respuesta) => {
      console.log('getComprobantes: ', respuesta);
      let comprobantes = [];

      respuesta.data.data.forEach((key) => {
        comprobantes.push({
          value: key.tipoComprobante,
          label: key.comprobante,
        });
      });
      
      dispatch({
        type: OBTENER_COMPROBANTES,
        payload: comprobantes
      });

    });
  }

  const getCustomerByID = async (idCliente) => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA
    });

    await clienteAxios.get(`api/customer/${idCliente}`).then( async(respuesta) => {
      console.log('respuesta: ', respuesta);

      dispatch({
        type: OBTENER_CLIENTE,
        payload: respuesta.data.data
      });

    });
  }

  return (
    <CustomerContext.Provider
      value={{
        clientes: state.clientes,
        comprobantes: state.comprobantes,
        clientesBuscar: state.clientesBuscar,
        clienteEditar: state.clienteEditar,
        total_page: state.total_page,
        page_cout: state.page_cout,
        clienteSeleccionado: state.clienteSeleccionado,
        estado: state.estado,
        cargando: state.cargando,
        mensajeCliente: state.mensajeCliente,
        identificaciones: state.identificaciones,
        getCustomer,
        getCustomerPage,
        addCustomer,
        updateCustomer,
        getCustomerByID,
        getComprobantes,
        getIdentification,
        saludar,
      }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};

export default CustomerState;

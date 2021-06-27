import React, { useReducer } from "react";
import { useHistory } from "react-router";
import cookie from "js-cookie";
import CustomerContext from "./UserContext";
import UserReducer from "./UserReducer";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

import {
  INICIANDO_CONSULTA,
  OBTENER_USUARIOS,
  OBTENER_USUARIO,
  OBTENER_USUARIOS_POR_PAGINAS,
  OBTENER_TIPOS_USUARIOS,
  OBTENER_IDENTIFICACIONES,
  FINALIZANDO_CONSULTA,
  REGISTRO_EXITOSO,
  REGISTRO_ERROR
} from "../../types";

const UserState = (props) => {
  const initialState = {
    usuarios: [],
    tiposUsuarios: [],
    identificaciones: [],
    total_page: [],
    page_cout: null,
    usuariosBuscar: [],
    usuarioEditar: {},
    usuarioSeleccionado: null,
    mensajeUsuario: null,
    estado: [
      { value: "1", label: "Activo" },
      { value: "0", label: "Inactivo" },
    ],
    busqueda: "",
    cargando: false,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);
  const history = useHistory();

  const getUsers = async () => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA,
    });

    let respuesta2 = [];
    await clienteAxios
      .get("api/user")
      .then(async (respuesta) => {
        // console.log("respuesta: ", respuesta);

        respuesta2 = respuesta.data;
        dispatch({
          type: OBTENER_USUARIOS,
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


  const getTypesUser = async () => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA,
    });

    let respuesta2 = [];
    await clienteAxios
      .get("api/user/typeUser")
      .then(async (respuesta) => {
        let tiposUsuarios = [];

        respuesta.data.data.forEach((key) => {
          tiposUsuarios.push({
            value: key.idTipo,
            label: key.tipoUsuario,
          });
        });

        // console.log("getTypesUser: ", tiposUsuarios);

        dispatch({
          type: OBTENER_TIPOS_USUARIOS,
          payload: tiposUsuarios,
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
  const getUsersPage = async (limit, page, search = 0) => {
    // console.log('getUsersPage');
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA,
    });

    await clienteAxios
      .get(`api/user?page=${page > 0 ? page : 1} ${search == 0 ? '' : '&search='+search } &limit=${limit}`)
      .then(async (respuesta) => {
        console.log("getUsersPage: ", respuesta);

        dispatch({
          type: OBTENER_USUARIOS_POR_PAGINAS,
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
  
  const addUser = async (data) => {
    console.log('addUser: ',data);
    // return;

    dispatch({
      type: INICIANDO_CONSULTA
    });
    
    const formulario = new FormData();
    formulario.append("nombre", data.nombre);
    formulario.append("apellido", data.apellido);
    formulario.append("idSexo", Number(data.sexo.value));
    formulario.append("idTipoIdentificacion", Number(data.tipoIdentificacion.value));
    formulario.append("identificacion", data.identificacion);
    formulario.append("fechaNacimiento", data.fechaNacimiento);
    formulario.append("correo", data.correo);
    formulario.append("telefono", data.telefono);
    formulario.append("usuario", data.usuario);
    formulario.append("clave", data.clave);
    formulario.append("idProvincia", Number(data.provincia.value));
    formulario.append("idCiudad", Number(data.ciudad.value));
    formulario.append("direccion", data.direccion);
    formulario.append("Img", data.imagen);
    formulario.append("creado_por", Number(data.creado_por));
    formulario.append("observacion", data.observacion);
    formulario.append("estado", Number(data.estado.value));

    await clienteAxios
      .post("api/user/", {
        nombre: data.nombre,
        apellido: data.apellido,
        idSexo: Number(data.sexo.value),
        idTipoIdentificacion: Number(data.tipoIdentificacion.value),
        identificacion: data.identificacion,
        fechaNacimiento: "1995/12/12",
        telefono: data.telefono,
        correo: data.correo,
        idTipoUsuario: Number(data.tipoUsuario.value),
        usuario: data.usuario,
        clave: data.clave,
        idProvincia: Number(data.provincia.value),
        idCiudad: Number(data.ciudad.value),
        direccion: data.direccion,
        img: data.imagen,
        creado_por: 1,
        observacion: data.observacion,
        estado: Number(data.estado.value),
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
              history.replace("/user");
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

  const updateUser = async (data) => {

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
      .put("api/user/", formulario,{
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

  const getUserByID = async (idUsuario) => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    dispatch({
      type: INICIANDO_CONSULTA
    });

    await clienteAxios.get(`api/user/${idUsuario}`).then( async(respuesta) => {
      console.log('getUserByID: ', respuesta.data.data[0]);

      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.data[0]
      });

    });
  }

  return (
    <CustomerContext.Provider
      value={{
        usuarios: state.usuarios,
        tiposUsuarios: state.tiposUsuarios,
        usuariosBuscar: state.usuariosBuscar,
        usuarioEditar: state.usuarioEditar,
        total_page: state.total_page,
        page_cout: state.page_cout,
        usuarioSeleccionado: state.usuarioSeleccionado,
        estado: state.estado,
        cargando: state.cargando,
        mensajeUsuario: state.mensajeUsuario,
        identificaciones: state.identificaciones,
        
        getUsers,
        getTypesUser,
        getUsersPage,
        addUser,
        updateUser,
        getUserByID,
        getIdentification,
        saludar,
      }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};

export default UserState;

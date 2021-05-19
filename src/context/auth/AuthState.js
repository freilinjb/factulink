import React, { useReducer } from "react";
// import Router from "next/router";
// import nextCookies from "next-cookies";
import cookie from "js-cookie";

import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";

import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";

import { useHistory, useLocation, Redirect } from "react-router";


import {
  LOGIN_ERROR,
  LOGIN_EXITOSO,
  OBTENER_USUARIO,
  INICIANDO_CONSULTA,
  FINALIZANDO_CONSULTA,
} from "../../types";

const AuthState = (props) => {
  const initialState = {
    token: cookie.get("token"),
    autenticado: false,
    idUsuario: null,
    usuario: null,
    nombre: null,
    cargando: true,
    mensaje: null,
    tipoUsuario: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const history = useHistory();
  const login = ({ token }) => {
    // console.log("hola: ", token);
    cookie.set("token", token, { expires: 8 });
  };

  const logut = () => {
    cookie.remove("token");
    // to support logging out from all windows
    window.localStorage.setItem("logout", Date.now());
    // Router.push("/login");
  };

  const saludar = (nombre) => console.log(`Hola ${nombre} como estas ?`);

  const iniciarSesion = async (correo, clave) => {
    dispatch({
      type: INICIANDO_CONSULTA,
    });

    await clienteAxios
      .post("/api/auth", { usuario: correo, clave })
      .then(async (respuesta) => {
        console.log("Respuesta: ", respuesta.data);
        // console.log("token: ", respuesta.data.token);
        const token = respuesta.data.token;
        
        login({ token });

        dispatch({
          type: LOGIN_EXITOSO,
          payload: respuesta.data,
        });

        // history.replace("/");
      })
      .catch((error) => {
          if(!error.response) {
            console.log("Please check your internet connection.");
            dispatch({
              type: LOGIN_ERROR,
              payload: "Por favor revise su conexion a internet.",
            });
          } else {
            console.log('error: ', error);
            dispatch({
              type: LOGIN_ERROR,
              payload: "Usuario o contraseña invalido",
            });
          }
        
      });
  };

  const usuarioAutenticado = async () => {
    const token = state.token;
    // console.log(token);
    if (token) {
      tokenAuth(`Bearer ${token}`);
      // tokenAuth(token);
    } else {
      dispatch({
        type: LOGIN_ERROR,
      });
      return;
    }

    dispatch({
      type: INICIANDO_CONSULTA,
    });

    await clienteAxios
      .get("/api/auth/")
      .then((response) => {

        // console.log("usuarioAutenticado: ", response);

        dispatch({
          type: OBTENER_USUARIO,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("error: ", error);

        dispatch({
          type: LOGIN_ERROR,
          payload: "Usuario o contraseña invalido",
        });
      })
      .finally(() => {
        dispatch({
          type: FINALIZANDO_CONSULTA,
        });
      });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        idUsuario: state.idUsuario,
        usuario: state.usuario,
        nombre: state.nombre,
        cargando: state.cargando,
        mensaje: state.mensaje,
        tipoUsuario: state.tipoUsuario,
        saludar,
        iniciarSesion,
        usuarioAutenticado,
        logut
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};


export default AuthState;

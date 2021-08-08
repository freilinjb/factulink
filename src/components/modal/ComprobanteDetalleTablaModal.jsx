import React,{ useContext, useEffect, useState } from "react";
import Select from "react-select";
import cookie from "js-cookie";
import clienteAxios from "../../config/axios";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UnidContext from "../../context/unid/UnidContext";
import ValidarUnid from "../../validation/ValidarUnid";

import {
  Row,
  Form,
  Button,
  Table,
  Modal,
} from "@themesberg/react-bootstrap";

const ComprobanteDetalleTablaModal = ({handleClose, mostrarModalDetalle, tipoComprobante}) => {
  const unidContext = useContext(UnidContext);
  const {  updateUnid, addUnid, unidadEditar, estado } = unidContext;
  const [campos, setCampos] = useState({
    nombre: "",
    estado: "",
  })

  const [comprobantes, setComprobantes] = useState([]);
  const [errores, setErrores] = useState({});

  const consultarDatos = async (id) => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;

    clienteAxios.get(`api/comprobante/report/${id}`).then(async (resultados) => {
      console.log('consultarDatos: ', resultados.data.data);
      setComprobantes(resultados.data.data);
    }).catch((error)=> {
      console.log('Error: ', error);
    })
    // handleClose();
  }

  const handleChange = (e) => {
    console.log(`${e.target.name}`, e.target.value);
    setCampos({
      ...campos,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if(tipoComprobante > 0) {
      consultarDatos(tipoComprobante);
      console.log('Mostrar datos');
    } 
  }, [tipoComprobante]);

  useEffect(() => {

    if(Object.entries(unidadEditar).length !== 0) {
        // console.log('asdfasdf');
        setCampos({
          ...campos,
          nombre: unidadEditar.unidad,
          estado: unidadEditar.estado == 'activo' ? { value: 1, label: "Activo" } : { value: 0, label: "Inactivo" }
        })
      }
  },[unidadEditar]);



  const handleChangeSelect = (valorSeleccionado, s) => {
    const { name } = s;
    setCampos({
      ...campos,
      [name]: valorSeleccionado,
    });
  }; 
  
  const handleSubmit =(e)=> {
    e.preventDefault();
    const validacion = ValidarUnid(campos);
    // console.log('Campos a registrar2: ', validacion);
    console.log('Campos validados: ', campos);
    // return;
    if(Object.entries(validacion).length === 0) {
      if(tipoComprobante > 0) {
        // console.log('Campos a actualizado: ', campos);
        campos.idUnidad = tipoComprobante;
        console.log('Actualizando');
        // return;
        updateUnid(campos);
        
        setTimeout(() => {
          handleClose();
        }, 300);
        // console.log('se ha actualizado con exito: ', campos);
        // return;
      } else {
        // console.log('Campos a registrar: ', campos);
        console.log('Registrando');
        addUnid(campos);
        setTimeout(() => {
          handleClose();
        }, 300);
        // console.log('se ha registrado con exito');
        return;
      }
      
    }
    // handleClose();
    setErrores(validacion);

  }  

  return (
    <Modal as={Modal.Dialog} centered show={mostrarModalDetalle} onHide={handleClose} size="xl">
      <Modal.Header>
        <Modal.Title className="h6"> { tipoComprobante > 0 ? 'Update Unid' : 'New Unid' }</Modal.Title>
        <Button variant="close" aria-label="Close" onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>
          <Row>
            {comprobantes.length > 0 && (
              <>
                <h3 className="col-4">
                  <strong>{comprobantes[0].descripcion}</strong>
                </h3 >
                <h4 className="col-4">Tipo: # 
                  <strong>{comprobantes[0].tipo}</strong>
                </h4>
                <h4 className="col-4">Cantidad Disponible: # 
                  <strong>{comprobantes[0].tipo}</strong>
                </h4>

                
              <Table hover className="user-table align-items-center mt-3">
                <thead className="thead-dark">
                  <tr>
                    <th className="border-bottom">#</th>
                    <th className="border-bottom">Tipo</th>
                    <th className="border-bottom">Vencimiento</th>
                    <th className="border-bottom">Encabezado</th>
                    <th className="border-bottom">Desde</th>
                    <th className="border-bottom">Hasta</th>
                    <th className="border-bottom">Secuencia</th>
                    <th className="border-bottom">Estado</th>
                  </tr>
                </thead>
                <tbody>
                {comprobantes.map((c, index) =>(
                  <tr key={index + '-' + c.tipo }>
                    <td>{c.tipo}</td>
                    <td>{c.vencimiento.substring(0,10)}</td>
                    <td>{c.encabezado}</td>
                    <td>{c.inicio}</td>
                    <td>{c.final}</td>
                    <td>{c.secuencia}</td>
                    <td>{c.estado}</td>
                    <td> <input type="checkbox" name="estado" id="estado"/> </td>
                  </tr>
                ) )}
              </tbody>
            </Table>

              </>
            )}

          </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleSubmit}>
          Save
        </Button>
        <Button
          variant="link"
          className="text-gray ms-auto"
          onClick={handleClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ComprobanteDetalleTablaModal;

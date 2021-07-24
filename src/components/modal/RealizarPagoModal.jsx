import React,{ useContext, useEffect, useState } from "react";
import cookie from "js-cookie";
import Swal from "sweetalert2";

import clienteAxios from "../../config/axios";


import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faSave, faWindowClose} from "@fortawesome/free-solid-svg-icons";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UnidContext from "../../context/unid/UnidContext";
import ValidarUnid from "../../validation/ValidarUnid";

import {
  Row,
  Form,
  Button,
  Modal,
  InputGroup
} from "@themesberg/react-bootstrap";

const RealizarPagoModal = ({handleClose, showModal, montoTotal, idCliente, consultarDatos}) => {
  const unidContext = useContext(UnidContext);
  const {  updateUnid, addUnid, getUnidByID, unidadEditar, estado } = unidContext;
  const [campos, setCampos] = useState({
    fecha: "2021/07/24",
    nombre: "",
    monto: "",
    formaPago: { value: 1, label: "Efectivo" },
    estado: "",
    precioVenta: montoTotal,
  })

  const [errores, setErrores] = useState({});

  const formaPago = [
    { value: 1, label: "Efectivo" },
    { value: 2, label: "Transferencia" },
    { value: 3, label: "Cheque" },
  ];

  const handleChange = (e) => {
    console.log(`${e.target.name}`, e.target.value);
    setCampos({
      ...campos,
      [e.target.name]: e.target.value,
    });
  };


  useEffect(() => {
    const fecha = new Date();
    if(showModal == true) {
      document.getElementById('fecha').value = fecha.toISOString().substring(0,10);
    }
    // document.getElementById('fecha').value = fecha.toISOString().substring(0,10);
    // document.getElementById('fecha').value = fecha.toISOString().substring(0,10);
  },[showModal]);

  const handleChangeSelect = (valorSeleccionado, s) => {
    const { name } = s;
    setCampos({
      ...campos,
      [name]: valorSeleccionado,
    });
  }; 
  
  const handleSubmit =(e)=> {
    e.preventDefault();
    console.log('Forma de pago: ', campos.formaPago.value);
    // return;
    const validacion = ValidarUnid(campos);

    Swal.fire({
      title: 'Seguro que deseas registrar este pago?',
      text: `El monto de ${campos.monto} de la forma de pago ${campos.formaPago.label}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Proceder!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Hola');
     
        // return;
      clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;

      clienteAxios.post('/api/report/cuentaPorCobrar',{
        idCliente: Number(idCliente),
        formaPago: Number(campos.formaPago.value),
        fecha: document.getElementById('fecha').value,
        monto: Number(campos.monto),
        observacion: campos.observacion,
      }).then(async (resultados) => {
        console.log('consultarDatos: ', resultados.data.success);
        if(resultados.data.success == 1) {
          consultarDatos();
          handleClose();
        }
      }).catch((error)=> {
        console.log('Error: ', error);
      })

    }
  })

    setErrores(validacion);

  }  

  return (
    <Modal as={Modal.Dialog} centered show={showModal} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title className="h6"><FontAwesomeIcon icon={faMoneyBill}/> REALIZAR PAGO </Modal.Title>
        <Button variant="close" aria-label="Close" onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Form.Group>
              <Form.Label>Fecha de pago</Form.Label>
              <Form.Control
                className="fechaPago"
                id="fecha"
                type="date"
                name="fecha"
                autoComplete="off"
                placeholder="fecha"
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Forma de pago</Form.Label>
              <Select
                options={formaPago}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 8,
                  colors: { ...theme.colors, primary: "#333152" },
                })}
                name="formaPago"
                value={campos.formaPago}
                onChange={handleChangeSelect}
                placeholder="Seleccione una opción"
              />
            </Form.Group>

            <Form.Group className="col-6 mt-1">
              <Form.Label>Monto</Form.Label>
              <InputGroup>
                <span className="input-group-text">$</span>
                <input
                  type="text"
                  className="form-control"
                  name="monto"
                  
                  value={campos.monto}
                  onChange={handleChange}
                  autoComplete="off"
                  aria-label="Amount (to the nearest dollar)"
                />
                <span className="input-group-text">.00</span>
              </InputGroup>
            </Form.Group>

            <Form.Group className="col-6 mt-1">
              <Form.Label>Deuda total</Form.Label>
              <InputGroup>
                <span className="input-group-text">$</span>
                <input
                  type="text"
                  className="form-control"
                  name="deudaTotal"
                  readOnly
                  value={Number(montoTotal - campos.monto).toFixed(2)}
                  onChange={handleChange}
                  autoComplete="off"
                  aria-label="Amount (to the nearest dollar)"
                />
                <span className="input-group-text">.00</span>
              </InputGroup>
            </Form.Group>

            <Form.Group>
              <Form.Label>Forma de pago</Form.Label>
              <Select
                options={formaPago}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 8,
                  colors: { ...theme.colors, primary: "#333152" },
                })}
                name="formaPago"
                value={campos.formaPago}
                onChange={handleChangeSelect}
                placeholder="Seleccione una opción"
              />
            </Form.Group>

            
            <Form.Group>
              <Form.Label>Observacion</Form.Label>
              <Form.Control
                type="text"
                name="observacion"
                autoComplete="off"
                placeholder="observacion"
                value={campos.observacion}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleSubmit}>
          <FontAwesomeIcon icon={faSave}/> Guardar
        </Button>
        <Button
          variant="link"
          className="text-gray ms-auto"
          onClick={handleClose}
        >
          <FontAwesomeIcon icon={faWindowClose}/>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RealizarPagoModal;

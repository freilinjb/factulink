import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import {Col,Row,Form,Button,ButtonGroup} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import { faHome, faPrint, faBackward, faPlus} from "@fortawesome/free-solid-svg-icons";
import cookie from "js-cookie";
import clienteAxios from "../../config/axios";
import TableDetalleFacturasCredito from "../../components/table/TableDetalleFacturasCredito";

import RealizarPagoModal from "../../components/modal/RealizarPagoModal";
import PagoHistorialModal from "../../components/modal/PagoHistorialModal";

const DetalleCuentaPorCobrar = () => {

  const [campos, setCampos] = useState({
    fechaPago: "",
    monto: "",
    observacion: ""
  });

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [total_page, setTotal_page] = useState('');
  const [facturas, setFacturas] = useState([]);
  const [montoTotal, setMontoTotal] = useState(0);
  const [cliente, setCliente] = useState({});
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);

  const [mostrarModalPagos, setMostrarModalPagos] = useState(false);
  const [idPago, setIdPago] = useState(0);

  const handleClose = () => setShowModal(false);
  const mostrarModal = () => setShowModal(true);

  const handleClosePago = () => setMostrarModalPagos(false);
  const mostrarModalPago = () => setMostrarModalPagos(true);

  const consultarDatos = async () => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;

    clienteAxios.get(`/api/report/cuentaPorCobrar/${id}`).then(async (resultados) => {
      console.log('consultarDatos: ', resultados.data.data);
      setFacturas(resultados.data.data);
      setCliente(resultados.data.data[0]);
    }).catch((error)=> {
      console.log('Error: ', error);
    })
    handleClose();
  }
  useEffect(() => {
    consultarDatos();
    // const fecha = new Date();
    // // document.getElementById('fecha').value = fecha.toISOString().substring(0,10);
    // document.getElementById('fecha').value = fecha.toISOString().substring(0,10);
  },[]);

  useEffect(() => {
    if(facturas.length > 0) {
      let sum = 0;
      facturas.forEach((key) => {
        if(key.estado === 'pendiente') {
          sum += Number(key.total) - Number(key.pagado);
          console.log('Total: ', key.total);
        }
      })

      setMontoTotal(sum);
    }
  },[facturas]);

  return (
    <>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-1">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item active> Cuenta por Cobrar </Breadcrumb.Item>
          </Breadcrumb>
          <h4>Administracion de Cuentas por Cobrar</h4>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button variant="outline-primary" href="/#/cuentaPorCobrar" size="sm"><FontAwesomeIcon icon={faBackward} />Volver</Button>
            <Button variant="outline-primary" size="sm"><FontAwesomeIcon icon={faPlus} />Enviar</Button>
            <Button variant="outline-primary" size="sm"><FontAwesomeIcon icon={faPrint} />Imprimir</Button>
            <Button variant="outline-primary" size="sm">
              <Link to={'/product/add'}><FontAwesomeIcon icon={faPlus}/> Cambiar Cliente</Link>
             </Button>
          </ButtonGroup>
        </div>
      </div>

      <Row>
        <div className="col-3">
        <h6 className="bg-primary p-1 rounded-3 text-white text-center">Datos Generales</h6>
          {/* <Form.Group>
            <Form.Label>Cliente</Form.Label>
            <Select
              // options={clientesSelect}
              theme={(theme) => ({
                ...theme,
                borderRadius: 8,
                colors: { ...theme.colors, primary: "#333152" },
              })}
              name="cliente"
              id="cliente"
              // value={campos.cliente}
              // onChange={handleChangeSelect}
              placeholder="Seleccione una opción"
            />
          </Form.Group> */}

          <Form>
            <Form.Group as={Row} className="mb-3 ">
              <Form.Label column sm="3">Cliente</Form.Label>
              <Col sm="9">
                <Form.Control readOnly defaultValue={cliente.cliente}/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">Vendedor</Form.Label>
              <Col sm="9">
                <Form.Control readOnly defaultValue=""/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                RNC
              </Form.Label>
              <Col sm="9">
                <Form.Control disabled defaultValue={cliente.identificacion}/>
              </Col>
            </Form.Group>

            {/* <Form.Group as={Row} className="mb-3"controlId="formPlaintextPassword">
              <Form.Label column sm="3">
                Fecha
              </Form.Label>
              <Col sm="9">
                <Form.Control type="date" id="fecha" className="fechaPago"/>
              </Col>
            </Form.Group> */}
{/* 
            <Form.Group as={Row} className="mb-3"controlId="formPlaintextPassword">
              <Form.Label column sm="3">
                Monto
              </Form.Label>
              <Col sm="9">
                <Form.Control type="number" value="0.00" placeholder="Ingrese el monto apagar" />
              </Col>
            </Form.Group> */}

            <Form.Group as={Row} className="mb-3" className="justify-content-between">
              <Form.Label column sm="auto">
                Facturas Pendientes
              </Form.Label>
              <Col sm="auto">
                <Form.Control type="text" value={facturas.length} readOnly plaintext />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3"controlId="formPlaintextPassword" className="justify-content-between">
              <Form.Label column sm="auto">
                Deuda total
              </Form.Label>
              <Col sm="auto">
                <Form.Control type="text" readOnly plaintext value={"RD$" + montoTotal} />
              </Col>
            </Form.Group>

            <Button
              onClick={mostrarModal}
            >Realizar pago</Button>

          </Form>
        </div>
        <div className="col-9">
            <h6 className="bg-primary p-1 rounded-3 text-white text-center">Facturas</h6>
            <TableDetalleFacturasCredito limit={limit} page={page} setPage={setPage} search={search} facturas={facturas} total_page={total_page} setIdPago={setIdPago} mostrarModalPago={mostrarModalPago}/>
        </div>
      </Row>
      <RealizarPagoModal handleClose={handleClose} showModal={showModal} montoTotal={montoTotal} idCliente={id} consultarDatos={consultarDatos}/>
      <PagoHistorialModal handleClosePago={handleClosePago} mostrarModalPagos={mostrarModalPagos} idPago={idPago}/>

    </>
  );
};

export default DetalleCuentaPorCobrar;

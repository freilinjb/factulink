import React, { useEffect, useContext, useState } from "react";
import cookie from "js-cookie";
import clienteAxios from "../../config/axios";

import { useParams } from "react-router-dom";

import ComprobanteContext from "../../context/comprobante/ComprobanteContext";

// import {Button} from "@themesberg/react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit } from "@fortawesome/free-solid-svg-icons";

const Invoice = () => {
  const [bolante, setBolante] = useState([])

    const comprobanteContext = useContext(ComprobanteContext);
    const {  getInvoice, factura } = comprobanteContext;

    const { id } = useParams();

    useEffect(() => {
        console.log('Facturar: ', id);
        consultarPagos(id);
    },[]);

    useEffect(() => {
        if(bolante.length > 0) {
            setTimeout(() => {
                // window.print();
            }, 100)
        }
    }, [bolante]);

    const consultarPagos = async (id) => {
      clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
  
      clienteAxios.get(`/api/report/pagos/${id}`).then(async (resultados) => {
        console.log('consultarPagos: ', resultados.data.data);
        setBolante(resultados.data.data);
      }).catch((error)=> {
        console.log('Error: ', error);
      })
    }

  return (
    <>
    {bolante.length > 0 && (
        <section className="invoice" id="invoice">
        <div className="row">
          <div className="col-4 me-auto">
            <h3 className="page-header">
              <i className="fas fa-globe"></i> FactuLink, Inc.
              <br/>
              <small className="float-right">{bolante[0].tipoFactura}</small>
            </h3>
          </div>
          <div className="col-6">
              <h3>
                    <small className="float-right"> -- .::[ BOLANTE DE PAGO ]::. -- </small>
                    {/* <small className="float-right">#: { ('0000000000'+Number(factura[0].numFactura)).slice(-10) }</small> */}
                    {/* <small className="float-right">Numero de Factura: {factura[0].fecha.substring(0,10) }</small> */}
              </h3>
          </div>

          <div className="col-4">
              <h5>
                    {/* <small className="float-right">#: { ('0000000000'+Number(bolante[0].numFactura)).slice(-10) }</small> */}
                    {/* <small className="float-right">Numero de Factura: {factura[0].fecha.substring(0,10) }</small> */}
              </h5>
          </div>
          
        </div>
        <div className="row invoice-info">
          <div className="col-sm-4 invoice-col col-4">
            De
            <address>
              <strong>FactuLink</strong>
              <br />
              Villa Progreso,
              <br />
              La Herradura
              <br />
              Telefono: (829)-526-12334
              <br />
              Correo: soporte@factulink.com
            </address>
          </div>
          <div className="col-sm-4 invoice-col col-4">
            A
            <address>
              <strong>{bolante.length > 0 && bolante[0].nombre }</strong>
              <br />
              <strong>RNC</strong> {bolante.length > 0 && bolante[0].identificacion }
              <br />
              {bolante.length > 0 && bolante[0].direccion }
              <br />
              Phone: {bolante.length > 0 && bolante[0].telefono }
              <br />
              Email: {bolante.length > 0 && bolante[0].correo }
            </address>
          </div>
          <div className="col-sm-4 invoice-col col-4">
            <b>Recibo {bolante[0].idPago}</b>
            <br />
            <b>Fecha:</b> {bolante[0].fecha}
            <br />
          </div>
        </div>

        <div className="row">
          <div className="col-12 table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Factura</th>
                  <th>Pago realizado</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                  {bolante.length > 0 && (
                      bolante.map((f, index) => (
                        <tr key={f.idPago + ' ' + f.numFactura}>
                            <td>{f.numFactura}</td>
                            <td>{f.pagoAplicado}</td>
                            <td>{f.monto}</td>
                        </tr>
                    ))
                  )}
              </tbody>
            </table>
          </div>
          <div className="col-6">
            <p className="lead">Fecha de pago: </p>

            <div className="table-responsive">
              <table className="table">
                <tr>
                  <th style={{ width: "50%" }}>Subtotal:</th>
                  <td>$250.30</td>
                </tr>
                <tr>
                  <th>ITBIS (18%)</th>
                  <td>$10.34</td>
                </tr>
                <tr>
                  <th>TOTAL </th>
                  <td>$10.34</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </section>
    )}
    </>
  );
};

export default Invoice;

import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";

import ComprobanteContext from "../../context/comprobante/ComprobanteContext";

// import {Button} from "@themesberg/react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit } from "@fortawesome/free-solid-svg-icons";

const Invoice = () => {
    const comprobanteContext = useContext(ComprobanteContext);
    const {  getInvoice, factura } = comprobanteContext;
    const [total, setTotal] = useState({
      total: 0,
      subTotal: 0,
      itbis: 0,
    });

    const { id } = useParams();

    useEffect(() => {
        console.log('Facturar: ', id);
        getInvoice(id);
    },[]);

    useEffect(() => {
        console.log('FacturaTotal: ', factura);
        if(factura.length > 0) {
            setTimeout(() => {
                // window.print();
            }, 100)
        }

        let tl = 0;
        let subTotal = 0;
        let itbis = 0;
        factura.forEach((key, index) => {
          itbis += key.itbis;
          tl += key.importe;
          subTotal += key.cantidad * key.precio;
        });

        setTotal({
          ...total,
          total: tl,
          subTotal: subTotal,
          itbis: itbis,
        });

    }, [factura])

  return (
    <>
    {factura.length > 0 && (
        <section className="invoice" id="invoice">
        <div className="row">
          <div className="col-4 me-auto">
            <h2 className="page-header">
              <i className="fas fa-globe"></i> FactuLink, Inc.
              <br/>
              <small className="float-right">{factura[0].tipoFactura}</small>
            </h2>
          </div>
          <div className="col-4">
              <h3>
                    <small className="float-right"> -- .::[ FACTURA ]::. -- </small>
                    {/* <small className="float-right">#: { ('0000000000'+Number(factura[0].numFactura)).slice(-10) }</small> */}
                    {/* <small className="float-right">Numero de Factura: {factura[0].fecha.substring(0,10) }</small> */}
              </h3>
          </div>

          <div className="col-4">
              <h5>
                    <small className="float-right">#: { ('0000000000'+Number(factura[0].numFactura)).slice(-10) }</small>
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
              Villa Progreso, La Herradura, Edif13.
              <br />
              San Francisco, CA 94107
              <br />
              <strong>Telefono:</strong> (829) 529-5432
              <br />
              <strong>Correo:</strong> soporte@factulink.com
            </address>
          </div>
          <div className="col-sm-4 invoice-col col-4">
            A
            <address>
              <strong>{factura.length > 0 && factura[0].nombre }</strong>
              <br />
              <strong>RNC</strong> {factura.length > 0 && factura[0].identificacion }
              <br />
              {factura.length > 0 && factura[0].direccion }
              <br />
              <strong>Telefono:</strong> {factura.length > 0 && factura[0].telefono }
              <br />
              <strong>Correo:</strong> {factura.length > 0 && factura[0].correo }
            </address>
          </div>
          <div className="col-sm-4 invoice-col col-4">
            <b>Factura {factura[0].numFactura}</b>
            <br />
            <b><strong>NCF:</strong> {factura[0].NFC}</b>
            <br />
            <b><strong>Fecha:</strong>: </b> {factura[0].fecha.substring(0,10)}
            <br />
          </div>
        </div>

        <div className="row">
          <div className="col-12 table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Producto</th>
                  <th>Unidad</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Itbis</th>
                  <th>Importe</th>
                </tr>
              </thead>
              <tbody>
                  {factura.length > 0 && (
                      factura.map((f, index) => (
                        <tr key={f.codigo + ' ' + f.producto}>
                            <td>{1+index}</td>
                            <td>{f.producto + ' - ' + f.marca}</td>
                            <td>{f.unidad}</td>
                            <td>{f.precio.toFixed(2)}</td>
                            <td>{f.cantidad}</td>
                            <td>{f.itbis.toFixed(2)}</td>
                            <td>{f.importe.toFixed(2)}</td>
                        </tr>
                    ))
                  )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <p className="lead">Payment Methods:</p>
            <img src="../../dist/img/credit/visa.png" alt="Visa" />
            <img src="../../dist/img/credit/mastercard.png" alt="Mastercard" />
            <img
              src="../../dist/img/credit/american-express.png"
              alt="American Express"
            />
            <img src="../../dist/img/credit/paypal2.png" alt="Paypal" />

            <p
              className="text-muted well well-sm shadow-none"
              style={{ marginTop: "10px" }}
            >
              Tienes que enviar tus artículos en los primeros 14 días después de tu 
              compra o no te devolveremos tu dinero”, puedes escribir “Envía los 
              artículos en los primeros 14 días después de tu compra para recibir un 
              reembolso.  
            </p>
          </div>
          <div className="col-6">

            <div className="table-responsive">
              <table className="table">
                <tr>
                  <th style={{ width: "50%" }}>Subtotal:</th>
                  <td>{total.subTotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Tax (18%)</th>
                  <td>{total.itbis.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Total:</th>
                  <td>{total.total.toFixed(2)}</td>
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

import React, { useEffect, useContext, useState } from "react";
import clienteAxios from "../../config/axios";
import cookie from "js-cookie";

import { useParams } from "react-router-dom";

import ComprobanteContext from "../../context/comprobante/ComprobanteContext";


const PagoDocumento = () => {
    const [pago, setPago] = useState([]);
    const comprobanteContext = useContext(ComprobanteContext);
    const {  getInvoice, factura } = comprobanteContext;

    const { id } = useParams();

    useEffect(() => {
        console.log('Facturar: ', id);
        consultarPagoRegistrado(id);
    },[]);

    const consultarPagoRegistrado = (id) => {
      clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
  
      clienteAxios.get(`/api/report/pagos/documento/${id}`).then(async (resultados) => {
        console.log('consultarDatos: ', resultados);
        setPago(resultados.data.data);

      }).catch((error)=> {
        console.log('Error: ', error);
      })
    }

    

    useEffect(() => {
        console.log('pago: ', pago);
        if(pago.length > 0) {
            setTimeout(() => {
                window.print();
            }, 100)
        }
    }, [pago])

  return (
    <>
    {pago.length > 0 && (
        <section className="invoice" id="invoice">
        <div className="row">
          <div className="col-4 me-auto">
            <h2 className="page-header">
              <i className="fas fa-globe"></i> FactuLink, Inc.
              <br/>
              <small className="float-right">{pago[0].formaPago}</small>
            </h2>
          </div>
          <div className="col-4">
              <h3>
                    <small className="float-right"> -- .::[ BOLANTE DE PAGO ]::. -- </small>
              </h3>
          </div>

          <div className="col-4">
              <h5>
                    <small className="float-right">#: { ('0000000000'+Number(pago[0].idPago)).slice(-10) }</small>
              </h5>
          </div>
          
        </div>
        <div className="row invoice-info">
          <div className="col-sm-4 invoice-col col-4">
            From
            <address>
              <strong>FactuLink</strong>
              <br />
              Villa Progreso, La Herradura
              <br />
              Santiago Edif: 13, Apt13
              <br />
              Phone: (804) 123-5432
              <br />
              Email: info@almasaeedstudio.com
            </address>
          </div>
          <div className="col-sm-4 invoice-col col-4">
            A
            <address>
              <strong>{pago[0].cliente}</strong>
              <br />
              <strong>RNC</strong> {pago[0].RNC }
              <br />
              {pago[0].direccion }
              Phone: {pago[0].telefono }
              <br />
              Email: {pago[0].correo}
            </address>
          </div>
          <div className="col-sm-4 invoice-col col-4">
            <b>Bolante# {pago[0].numFactura}</b>
            <br />
            <b>Monto pagado:</b> {pago[0].monto}
          </div>
        </div>

        <div className="row">
          <div className="col-12 table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Factura</th>
                  <th>Monto Aplicado</th>
                </tr>
              </thead>
              <tbody>
                  {pago.length > 0 && (
                      pago.map((f, index) => (
                        <tr key={f.codigo + ' ' + f.producto}>
                            <td>{1+index}</td>
                            <td>{f.numFactura}</td>
                            <td>{f.montoAplicado.toFixed(2)}</td>
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
              Se hará pagos de acuerdo con los plazos establecidos con los proveedores , en la
              actualidad contamos con acuerdos a ocho, quince,, treinta , sesenta o setenta y cinco días,
              contados a partir de la fecha de recibo de la factura y/o cuenta de cobro en las
              instalaciones del HICM, siempre y cuando se tenga la disponibilidad de caja
            </p>
          </div>
          <div className="col-6">
            <p className="lead">Amount {pago[0].monto}</p>

            <div className="table-responsive">
              <table className="table">
                <tr>
                  <th style={{ width: "50%" }}>Subtotal:</th>
                  <td>$250.30</td>
                </tr>
                <tr>
                  <th>Tax (9.3%)</th>
                  <td>$10.34</td>
                </tr>
                <tr>
                  <th>Shipping:</th>
                  <td>$5.80</td>
                </tr>
                <tr>
                  <th>Total:</th>
                  <td>$265.24</td>
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

export default PagoDocumento;

import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import ComprobanteContext from "../../context/comprobante/ComprobanteContext";


const PagoFacturaDocumento = () => {
    const comprobanteContext = useContext(ComprobanteContext);
    const {  getInvoice, factura } = comprobanteContext;

    const { id } = useParams();

    useEffect(() => {
        console.log('Facturar: ', id);
        getInvoice(id);
    },[]);

    useEffect(() => {
        console.log('FacturaTotal: ', factura);
        if(factura.length > 0) {
            setTimeout(() => {
                window.print();
            }, 100)
        }
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
            From
            <address>
              <strong>FactuLink</strong>
              <br />
              795 Folsom Ave, Suite 600
              <br />
              San Francisco, CA 94107
              <br />
              Phone: (804) 123-5432
              <br />
              Email: info@almasaeedstudio.com
            </address>
          </div>
          <div className="col-sm-4 invoice-col col-4">
            To
            <address>
              <strong>{factura.length > 0 && factura[0].nombre }</strong>
              <br />
              <strong>RNC</strong> {factura.length > 0 && factura[0].identificacion }
              <br />
              {factura.length > 0 && factura[0].direccion }
              <br />
              Phone: {factura.length > 0 && factura[0].telefono }
              <br />
              Email: {factura.length > 0 && factura[0].correo }
            </address>
          </div>
          <div className="col-sm-4 invoice-col col-4">
            <b>Factura {factura[0].numFactura}</b>
            <br />
            <b>NFC {factura[0].NFC}</b>
            <br />
            <b>Order ID:</b> 4F3S8J
            <br />
            <b>Payment Due:</b> 2/22/2014
            <br />
            <b>Account:</b> 968-34567
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
              Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles,
              weebly ning heekya handango imeem plugg dopplr jibjab, movity
              jajah plickers sifteo edmodo ifttt zimbra.
            </p>
          </div>
          <div className="col-6">
            <p className="lead">Amount Due 2/22/2014</p>

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

export default PagoFacturaDocumento;

import React,{ useContext, useState, useEffect } from 'react';
import cookie from "js-cookie";

import Swal from "sweetalert2";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSearch, faCog, faPrint } from "@fortawesome/free-solid-svg-icons";
import {Col,Row,Form,Button,InputGroup, ButtonGroup, Dropdown} from "@themesberg/react-bootstrap";

import ComprobanteContext from "../../context/comprobante/ComprobanteContext";
import TableFacturasDelDia from "../../components/table/TableFacturasDelDia";

import clienteAxios from "../../config/axios";


const Ventas = () => {
    const comprobanteContext = useContext(ComprobanteContext);
    const {  getInvoiceForDay, factura } = comprobanteContext;

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [invoice, setInvoice] = useState([]);

    const handleClick = (e) => {
        console.log('prueba: ', e.target.text);
        setLimit(Number(e.target.text));
      }

      useEffect(() => {
        console.log('getInvoiceForDay: ', factura);
        setInvoice(factura);
      }, [factura])

      const handlePress =(e)=> {
        if(e.key === 'Enter') {
          getInvoiceForDay(limit, page, search);
        }
      }

      const anularFactura = async (numFactura) => {
        // console.log('anularFactura ', numFactura);
        // return;

        Swal.fire({
          title: 'Estas seguro?',
          text: `Seguro que deseas anular la Factura ${numFactura}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Anularlo!',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {

            clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;
    
            clienteAxios
            .put(`/api/billing/invoice/${numFactura}`)
            .then(async (respuesta) => {
              console.log("anularFactura: ", respuesta);

              if(respuesta.data.success == 1) {
                Swal.fire(
                  'Anulada!',
                  'Anulada de forma correcta.',
                  'success'
                )

                getInvoiceForDay(limit, page, search);
              }
            })
            .catch((error) => {
              console.log("error: ", error);
            })
          }
        })

        

        
      }

    return ( 
        <>
        <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-1 mx-3">
        <div className="d-block mb-4 mb-xl-0">
          {/* <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
            <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item active> SubCategories Management </Breadcrumb.Item>
          </Breadcrumb> */}
          <h4>Reportes de Ventas</h4>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0 ">
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">Share</Button>
            <Button variant="outline-primary" size="sm">Export XLS</Button>
            <Button variant="outline-primary" size="sm"><FontAwesomeIcon icon={faPrint}/> Print</Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="table-settings mb-4 mx-3">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search" value={search} onChange={e=> setSearch(e.target.value)} onKeyPress={handlePress}/>
            </InputGroup>
          </Col>
          <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right" onClick={handleClick}>
                <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                <Dropdown.Item className="fw-bold">5 {limit === 5 && (<span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>)} </Dropdown.Item>
                <Dropdown.Item className="d-flex fw-bold">
                  10 {limit === 10 && (<span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>)}
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">20 {limit === 20 && (<span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>)} </Dropdown.Item>
                <Dropdown.Item className="fw-bold">30 {limit === 30 && (<span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>)} </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          </Row>
      </div>
          
          <div className="row mx-2">
              <div className="col-6">
                  <TableFacturasDelDia limit={limit} page={page} setPage={setPage} search={search} anularFactura={anularFactura}/>
              </div>

              <div className="col-6 bg-light rounded-top">
              <section className="invoice" id="invoice">
        <div className="row">
          <div className="col-auto me-auto">
            <h2 className="page-header">
              <i className="fas fa-globe"></i> FactuLink, Inc.
              <br/>
            </h2>
          </div>
          <div className="col-auto">
              <h2>
                  <div className="px-2 float-start">..::Copia::..</div>
              <ButtonGroup>
                <Button variant="outline-primary" size="sm">Descargar</Button>
                <Button variant="outline-primary" size="sm"><FontAwesomeIcon icon={faPrint}/> Print</Button>
            </ButtonGroup>
                    {/* <small className="float-right">#: { ('0000000000'+Number(factura[0].numFactura)).slice(-10) }</small> */}
                    {/* <small className="float-right">Numero de Factura: {factura[0].fecha.substring(0,10) }</small> */}
              </h2>
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
              <strong> asdf asdfas df</strong>
              <br />
              <strong>RNC</strong> 
              <br />
              aasdf asdf
              <br />
              Phone: 
              <br />
              Email: 
            </address>
          </div>
          <div className="col-sm-4 invoice-col col-4">
            <b>Factura: {factura.length > 0 && factura[0].numFactura} </b>
            <br />
            <b>NFC </b>
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
                {invoice.length > 0 && (
                      invoice.map((f, index) => (
                        <tr key={f.codigo + ' ' + f.producto+''+index}>
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

          </div>
          <div className="col-6">
            <div className="table-responsive">
              <table className="table">
                <tr>
                  <th style={{ width: "50%" }} className="p-0">Subtotal:</th>
                  <td>$250.30</td>
                </tr>
                <tr>
                  <th className="p-0">Tax (9.3%)</th>
                  <td className="p-0">$10.34</td>
                </tr>
                <tr>
                  <th className="p-0">Shipping:</th>
                  <td className="p-0">$5.80</td>
                </tr>
                <tr>
                  <th className="p-0">Total:</th>
                  <td className="p-0">$265.24</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </section>
              </div>
          </div>

      </>
     );
}
 
export default Ventas;
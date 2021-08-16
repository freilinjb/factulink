import React,{ useContext, useEffect, useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";

import clienteAxios from "../../config/axios";
import cookie from "js-cookie";
import Swal from "sweetalert2";


// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UnidContext from "../../context/unid/UnidContext";
import ValidarUnid from "../../validation/ValidarUnid";

import ComprobanteContext from "../../context/comprobante/ComprobanteContext";

import {
  Row,
  Form,
  Button,
  Modal,
  Col,
  Card,
  Table
} from "@themesberg/react-bootstrap";

const NotaCreditoModal = ({handleClose, showModal, consultarDatos}) => {
  const comprobanteContext = useContext(ComprobanteContext);
  const {  getInvoice, factura } = comprobanteContext;

  const [productosSelect, setFacturaSelect] = useState([]);

  const [campos, setCampos] = useState({
    nombre: "",
    estado: "",
  })

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    console.log(`${e.target.name}`, e.target.value);
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setCampos({
      ...campos,
      [e.target.name]: value,
    });
  };

  const handleChangeSelect = (valorSeleccionado, s) => {
    const { name } = s;
    setCampos({
      ...campos,
      [name]: valorSeleccionado,
    });
  }; 
  
  const handleSubmit =(e)=> {
    e.preventDefault();
    // console.log('Forma de pago: ', campos);

    const productos = [];
    let importe = 0;

    factura.forEach((key,index) => {
      // console.log('index:', index);
      if(campos[`producto_${key.idProducto}`] == true) {
        console.log('encontrado: ', key);
        const cantidadDevolucion = campos[`producto_cantidad_${key.idProducto}`];
        const cantidad = cantidadDevolucion ? Number(cantidadDevolucion) : 1;

        importe += (key.precio * cantidad);
        productos.push({
          idProducto: key.idProducto,
          cantidad: cantidad,
          precio: key.precio,
        });
      }
    });

    if(productos.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe seleccionar por lo menos un producto, para la devolución!',
      })

      return
    } 


    Swal.fire({
      title: 'Seguro que deseas registrar esta Nota de Debito?',
      text: `Cantidad de articulos a devolver ${productos.length}, con un importe de ${importe.toFixed(2)} `,
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

      clienteAxios.post('/api/nota_credito',{
        idUsuario: 1,
        numFactura: Number(factura[0].numFactura),
        observacion: campos.observacion,
        productos
      }).then(async (resultados) => {
        console.log('consultarDatos: ', resultados.data);
        if(resultados.data.success == 1) {
          Swal.fire(
            'Good job!',
            'Se ha guardado de forma correcta!',
            'success'
          ).then((respuesta2) => {
            setCampos({});
            consultarDatos();
            handleClose();
          });
        }
      }).catch((error)=> {
        console.log('Error: ', error);
      })

    }
  })
  } 
  
  const LoadingMessage  = props => {
    return (
      <div
        {...props.innerProps}
        style={props.getStyles('loadingMessage', props)}
      >
        {props.children}
      </div>
    )
  }

  const promiseOptions = inputValue =>
  new Promise(resolve => {

    // setTimeout(() => {
      resolve(filterProducto(inputValue));
    // }, 1000);
  });

  const filterProducto = async (inputValue) => {
    if(inputValue.length >= 2) {
      clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;

      return new Promise((resolve, reject) => {
        clienteAxios.get(`/api/nota_credito/facturas/${Number(inputValue)}`)
         .then(function ({data}) {
           
          console.log('ResoyestaR: ', data.data);
          if(data.data.length > 0) {
            getInvoice(Number(data.data[0].factura));
            console.log('Consultar factura: ', data.data[0].factura)
          }
          // return;
          let resultados = [];
          setFacturaSelect(data.data);
          data.data.forEach((key, index) => {
            resultados.push({
              value: key.factura,
              label: key.factura
            });
          })
          console.log("getReportFactura: ", resultados);
          // return(resultados);

          resolve(resultados);
         })
         .catch(function (error) {
          resolve();
         });
       });
    }
  }

  //LIMPIAR LOS LABEL DE LOS CAMPOS
  useEffect(() => {
    if(showModal === false) {
      setCampos({});
    }
  },[showModal]);

  //CARMGAR LOS LABEL DE LOS CAMPOS, CUANDO CARGUE LA FACTURA
  useEffect(() => {
    console.log('Consultando la factura2: ', factura);

    if(factura.length > 0) {
 

      let total = 0;
      factura.forEach((key, index) => {
        total += Number(key.importe);
      });

      // setCampos({
      //   ...campos,
      // });

      setCampos({
        ...campos,
        cliente: factura[0].nombre,
        NFC: factura[0].NFC,
        RNC: factura[0].NFC,
        telefono: factura[0].telefono,
        correo: factura[0].correo,
        fecha: factura[0].fecha.substring(0,10),
        total: Number(total).toFixed(2),

      })
    }
  },[factura]);


  return (
    <Modal as={Modal.Dialog} centered show={showModal} onHide={handleClose} size="xl">
      <Modal.Header>
        <Modal.Title className="h6"> Registro de Notas de Credito</Modal.Title>
        <Button variant="close" aria-label="Close" onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>

          <Form.Group className="col-6">
              <Form.Label>Factura</Form.Label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  styles={{
                    loadingMessage: base => ({
                      ...base,
                      color: 'white',
                    }),
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 8,
                    colors: { ...theme.colors, primary: "#333152" },
                  })}
                  components={{ LoadingMessage }}
                  loadOptions={promiseOptions}
                  name="factura"
                  value={campos.factura}
                  onChange={handleChangeSelect}
                  placeholder="Seleccione un factura"
                />
            </Form.Group>

            <Form.Group id="nombre" className="col-3">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                name="fecha"
                value={campos.fecha}
                disabled
              ></Form.Control>
            </Form.Group>

            <Form.Group className="col-3">
              <Form.Label>NCF</Form.Label>
              <Form.Control
                type="text"
                name="NFC"
                autoComplete="off"
                placeholder="ncf"
                value={campos.NFC}
                disabled
              ></Form.Control>
            </Form.Group>

            <Form.Group className="col-3">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={campos.cliente}
                placeholder="nombre"
                disabled
              ></Form.Control>
            </Form.Group>

            <Form.Group className="col-3">
              <Form.Label>RNC</Form.Label>
              <Form.Control
                type="text"
                name="RNC"
                value={campos.RNC}
                disabled
              ></Form.Control>
            </Form.Group>

            <Form.Group className="col-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="text"
                name="correo"
                value={campos.correo}
                disabled
              ></Form.Control>
            </Form.Group>

            <Form.Group className="col-3">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={campos.telefono}
                disabled
              ></Form.Control>
            </Form.Group>


              {factura.length > 0 && (
                <>
                <div className="col-12"><h3 className="bg-dark text-white text-center rounded-pill mt-1">Monto Total: RD$ {campos.total}</h3></div>

                <Card border="light" className="table-wrapper table-responsive shadow-sm mt-1">
                <Card.Body className="p-0">
                <Table hover className="user-table align-items-center rounded-pill">
                  <thead className="thead-dark">
                    <tr>
                      <th className="border-bottom">#</th>
                      <th className="border-bottom">Producto</th>
                      <th className="border-bottom">Marca</th>
                      <th className="border-bottom">Categoria</th>
                      <th className="border-bottom">Cantidad</th>
                      <th className="border-bottom">Devolucion</th>
                      <th className="border-bottom">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {factura.map((p, index)=> (
                      <tr key={p.codigo+'-'+index}>
                        <td>{1+index}</td>
                        <td>{p.producto}</td>
                        <td>{p.marca}</td>
                        <td>{p.categoria}</td>
                        <td>{p.cantidad}</td>
                        <td>{p.devuelto == 0 ? (
                          <input type="number" className="form-control" name={`producto_cantidad_${p.idProducto}`} max={p.cantidad} min="1" id={`producto_cantidad_${p.idProducto}`} value={campos[`producto_cantidad_${p.idProducto}`] ? campos[`producto_cantidad_${p.idProducto}`] : 1} onChange={handleChange}/>
                        ) : (
                          <p className="text-danger">Producto devuelto</p>
                        )}
                        </td>
                        <td> 
                          <input type="checkbox" className="form-check-input checkProducto" name={`producto_${p.idProducto}`} id={`producto_${p.idProducto}`} value={campos[`producto_${p.idProducto}`]} onChange={handleChange} disabled={p.devuelto == 1}/>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                </Card.Body>
              </Card>
              </>
              )}
          </Row>
        </Form>
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

export default NotaCreditoModal;

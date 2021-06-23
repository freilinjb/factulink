const validarCustomer = (valores) => {
  let errores = {};

  if (!valores.nombre) {
    errores.nombre = "El nombre del cliente es obligatorio";
  }

  if (!valores.tipoIdentificacion) {
    errores.tipoIdentificacion = "El tipo de identificacion es obligatorio";
  }

  if (!valores.identificacion) {
    errores.identificacion = "Debe espesificar el numero de identificación";
  }

  if (!valores.tipoComprobante) {
    errores.tipoComprobante = "El tipo de comprobante es obligatorio";
  }

  if (!valores.plazoPago) {
    errores.plazoPago = "Debe espesificar el previo de venta";
  }

  if (!valores.estado) {
    errores.estado = "Debe seleccionar el proveedor";
  }

  return errores;
};

export default validarCustomer;
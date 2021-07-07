const ValidarComprobante = (valores) => {
    let errores = {};
  
    if (!valores.tipoComprobante) {
      errores.tipoComprobante = "El nombre es obligatorio";
    }
  
    if (!valores.fechaVencimiento) {
      errores.fechaVencimiento = "La categoria es obligatorio";
    }

    if (!valores.inicio) {
      errores.inicio = "El estado es obligatorio";
    }

    if (!valores.final) {
      errores.final = "El estado es obligatorio";
    }

    if (!valores.proximoComprobante) {
      errores.proximoComprobante = "El estado es obligatorio";
    }

    if (!valores.sucursal) {
      errores.sucursal = "El estado es obligatorio";
    }

    if (!valores.estado) {
      errores.estado = "El estado es obligatorio";
    }
 
    return errores;
  };
  
  export default ValidarComprobante;
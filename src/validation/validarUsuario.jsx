const validarUsuario = (valores) => {
  let errores = {};

  if (!valores.nombre) {
    errores.nombre = "El nombre del producto es obligatorio";
  }

  if (!valores.apellido) {
    errores.apellido = "Debe seleccionar una Categoria";
  }

  if (!valores.tipoIdentificacion) {
    errores.tipoIdentificacion = "Debe seleccionar una SubCategoria";
  }

  if (!valores.identificacion) {
    errores.identificacion = "Debe seleccionar una unidad de presentación";
  }

  if (!valores.usuario) {
    errores.usuario = "Debe seleccionar la marca de presentación";
  }

  if (!valores.clave) {
    errores.clave = "Debe espesificar el Stock Inicial";
  }

  if (!valores.claveRepetir) {
    errores.claveRepetir = "Debe espesificar el Stock Minimo";
  }

  if (!valores.clave === valores.claveRepetir) {
    errores.claveRepetir = "Las claves no coinciden";
  }

  if (!valores.provincia) {
    errores.provincia = "Debe espesificar el previo de compra";
  }

  if (!valores.ciudad) {
    errores.ciudad = "Debe espesificar punto de reorden";
  }

  if (!valores.direccion) {
    errores.direccion = "Debe seleccionar el proveedor";
  }

  if (!valores.observacion) {
    errores.observacion = "Debe espesificar el previo de compra";
  }

  if (!valores.estado) {
    errores.estado = "Debe seleccionar el proveedor";
  }


  return errores;
};

export default validarUsuario;
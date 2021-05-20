const validarProducto = (valores) => {
  let errores = {};

  if (!valores.nombre) {
    errores.nombre = "El nombre del producto es obligatorio";
  }

  if (!valores.categoria) {
    errores.categoria = "Debe seleccionar una Categoria";
  }

  if (!valores.subcategoria) {
    errores.subcategoria = "Debe seleccionar una SubCategoria";
  }

  if (!valores.unidad) {
    errores.unidad = "Debe seleccionar una unidad de presentación";
  }

  if (!valores.stockInicial) {
    errores.stockInicial = "Debe espesificar el Stock Inicial";
  }

  if (!valores.stockMinimo) {
    errores.stockMinimo = "Debe espesificar el Stock Minimo";
  }

  if (!valores.precioVenta) {
    errores.precioVenta = "Debe espesificar el previo de venta";
  }

  if (!valores.precioCompra) {
    errores.precioCompra = "Debe espesificar el previo de compra";
  }

  if (!valores.reorden) {
    errores.reorden = "Debe espesificar punto de reorden";
  }

  if (!valores.proveedor) {
    errores.precioCompra = "Debe seleccionar el o los proveedores";
  }

  if (!valores.estado) {
    errores.estado = "Debe seleccionar la disponibilidad";
  }

  return errores;
};

export default validarProducto;
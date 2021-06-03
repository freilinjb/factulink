const validarSupplier = (valores) => {
    let errores = {};
  
    if (!valores.nombre) {
      errores.nombre = "El nombre es obligatorio";
    }
  
    if (!valores.rnc) {
      errores.rnc = "El RNC es obligatorio";
    }
  
    if (!valores.correo) {
      errores.correo = "El correo electronico es obligatorio";
    }
  
    if (!valores.telefono) {
      errores.telefono = "El telefono es obligatorio";
    }
  
    if (!valores.provincia) {
      errores.provincia = "Debe seleccionar una provincia";
    }
  
    if (!valores.ciudad) {
      errores.ciudad = "Debe seleccionar una provincia";
    }
  
    if (!valores.direccion) {
      errores.direccion = "La direccion es obligatorio";
    }
  
    if (!valores.estado) {
      errores.estado = "Debe espesificar el estado del producto";
    }
 
    return errores;
  };
  
  export default validarSupplier;
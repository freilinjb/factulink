const validarUnid = (valores) => {
    let errores = {};
  
    if (!valores.nombre) {
      errores.nombre = "El nombre es obligatorio";
    }
  
    if (!valores.estado) {
      errores.estado = "El estado es obligatorio";
    }
 
    return errores;
  };
  
  export default validarUnid;
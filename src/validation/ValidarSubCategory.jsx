const validarSubCategory = (valores) => {
    let errores = {};
  
    if (!valores.nombre) {
      errores.nombre = "El nombre es obligatorio";
    }
  
    if (!valores.categoria) {
      errores.categoria = "La categoria es obligatorio";
    }

    if (!valores.estado) {
      errores.estado = "El estado es obligatorio";
    }
 
    return errores;
  };
  
  export default validarSubCategory;
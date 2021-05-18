export default function validarSignIn(valores) {
    
    let errores = {};

    //validar el nombrer de usuario
    if(!valores.usuario) {
        errores.usuario = "El Nombre de usuario es obligatorio";
    }  

    if(!valores.clave) {
        errores.clave = "La contraseña es obligatorio";
    } 

    return errores;
}
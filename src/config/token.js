import clienteAxios from './axios';

const tokenAuth = token => {
    //Colocar el token y enviarlo via heder y se utiliza para validar
    if(token) {
        //agrergado como default
        clienteAxios.defaults.headers.common['x-auth-token'] = token;
    } else {
        //posiblemente cuando el usuario cierre sesion, no ba haver token
        //o token ya expiro
        //En caso de que no haya nada se elimina de nuestro header
        delete clienteAxios.defaults.headers.common['x-auth-token'];
    }
}

export default tokenAuth; 
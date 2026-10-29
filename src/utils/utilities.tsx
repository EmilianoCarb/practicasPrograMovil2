import { Alert } from "react-native"

export interface Usuario {
    nombre: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export function verificarContraseña(psw: string): boolean {
        if(psw.length < 8) {
            return false;}
        
        const regexEspecial: RegExp = /[^a-zA-Z0-9 ]/;
        if (!regexEspecial.test(psw))return false;
        
        const tieneMayuscula = /[A-Z]/.test(psw);
        const tieneMinuscula = /[a-z]/.test(psw);
        if(!tieneMayuscula || !tieneMinuscula) return false;

        return true;
    }

export function validarEmail(email: string): boolean {
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return expression.test(email);
}

export function validarDatos(email: string, psw: string): boolean{
    if (email.trim() === '' || psw.trim() === '') {
        Alert.alert('Error', 'Completar todos los campos');
        return false;
    }
    if (!validarEmail(email)) {
            Alert.alert('Error', 'El formato del email es incorrecto');
            return false;
    }
    if (!verificarContraseña(psw)) {
            Alert.alert('Error', 'Contraseña invalida');
            return false;
    }
    return true;
}

export function validarRegistroPsw(psw: string, confirmPsw: string): boolean 
{
    if(psw != confirmPsw) {
        return false;
    }
    return true;
}

export function validarRegistro(registro: Usuario): boolean {
    if(!camposCompletos(registro)) {
        Alert.alert('Error', 'Completar todos los campos');
        return false;
    }
    if(!validarEmail(registro.email)){
        Alert.alert('Error', 'El formato del email es incorrecto');
        return false;    
    }
    if(!validarRegistroPsw(registro.password, registro.confirmPassword)) {
        Alert.alert('Error', 'Las contraseñas deben coincidir');
        return false;
    }
    if(!verificarContraseña(registro.password)){ 
        Alert.alert('Error', 'La contraseña no cumple con los requisitos de seguridad');
        return false;
    }
    Alert.alert("Credenciales aceptadas", "Bienvenido")
    return true;
}


export function camposCompletos(user: Usuario): boolean {
    const hayVacios = Object.values(user).some(valor => String(valor).trim() === '');
    if(hayVacios) return false;
    return true;
}
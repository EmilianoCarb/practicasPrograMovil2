import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from 'react';;
import { Usuario, validarRegistro }from "../utils/utilities";
export default function Index(){
    const router = useRouter();
    const [usuario, setUsuario] = useState<Usuario>({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const onRegister = () => { 
        if(validarRegistro(usuario)){
        router.push({pathname: '/'});
    }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput placeholder="Correo electronico"
            value={usuario.email}  
            style={styles.input} 
            keyboardType="email-address" 
            onChangeText={(nuevoTexto) => setUsuario({...usuario, email:nuevoTexto})}/>
            <Text style={styles.label}>Nombre de Usuario</Text>
            <TextInput placeholder="Nombre de Usuario"  
            value={usuario.nombre} 
            style={styles.input} 
            onChangeText={(nuevoUsuario) => setUsuario({...usuario, nombre:nuevoUsuario})} 
            keyboardType="email-address" />
            <Text style={styles.label}>Contraseña</Text>
            <TextInput placeholder="Ingresar contraseña" 
            value={usuario.password}
            style={styles.input}
            secureTextEntry={true} 
            onChangeText={(nuevoTexto) => setUsuario({...usuario, password: nuevoTexto})}/>
            <Text style={styles.label}>Confirmar contraseña</Text>
            <TextInput placeholder="Confirmar contraseña"
            value={usuario.confirmPassword} 
            style={styles.input}
            secureTextEntry={true} 
            onChangeText={(nuevoConfirmPsw) => setUsuario({...usuario, confirmPassword: nuevoConfirmPsw})}/>
            <Button title='Registro' 
            onPress={onRegister}/>
        </View>
    )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  label: {
    fontSize: 14,            
    fontWeight: '600',       
    color: '#333333',       
    alignSelf: 'flex-start',  
    marginLeft: '10%',       
    marginTop: 10,           
    marginBottom: 4,         
  }, 
});

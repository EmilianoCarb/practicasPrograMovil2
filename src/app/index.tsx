import { useState } from 'react';
import { Image, Alert, Button, StyleSheet, TextInput, View, Text } from "react-native";
import { useRouter } from 'expo-router';
import { validarDatos }from "../utils/utilities";
export default function Index(){
    const router = useRouter();
    const [textoPsw, setTextoPsw] = useState<string>('');
    const [textoEmail, setTextoEmail] = useState<string>('');
        const onPressButton = (email: string, psw: string) => {
        if(validarDatos(email, psw))
        {
            Alert.alert("Login exitoso", "Credenciales aceptadas, bienvenido");
            setTextoEmail('');
            setTextoPsw('');
        }
    }
     const onRegister = () => { 
        router.push({
            pathname: "/register",
        });
    }
    return (
        <View style={styles.container}>
            <Image 
            source={require('../../assets/images/DaniFoto.jpeg')} 
            style={styles.image} />
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput 
            value={textoEmail} 
            placeholder="Correo electronico" 
            style={styles.input} 
            keyboardType="email-address"
            onChangeText={(nuevoTexto) => setTextoEmail(nuevoTexto)}/>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput value={textoPsw} 
            placeholder="Ingresar contraseña" 
            style={styles.input}
            secureTextEntry={true} 
            onChangeText={(nuevoTexto) => setTextoPsw(nuevoTexto)}/>
            <View style={styles.actions}>
            <Button 
            title="Iniciar Sesión" 
            onPress={ () => onPressButton(textoEmail, textoPsw)}/>
            <Button 
            title='Registro'  
            onPress={onRegister}/>
            </View>
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
  actions: {
    width: '80%',
    gap: 16,
    marginTop: 12,
  },    
  image: {
    width: 500,
    height: 300,
    marginBottom: 30,
    resizeMode: 'contain',
  },
});

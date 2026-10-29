import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { validarDatos } from "../utils/utilities";
export default function Index(){
    const router = useRouter();
    const [textoPsw, setTextoPsw] = useState<string>('');
    const [textoEmail, setTextoEmail] = useState<string>('');
    const imagenBase64 = "data:image/jpeg;base64,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";
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
            source={{uri: imagenBase64 }} 
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
            <Button 
            title="Iniciar Sesión" 
            onPress={ () => onPressButton(textoEmail, textoPsw)}/>
            <Button 
            title='Registro'  
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
  image: {
    width: 500,
    height: 200,
    marginBottom: 30,
    resizeMode: 'contain',
  },
});

import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Register from '../register';

// Mock Alert
jest.spyOn(Alert, 'alert');

describe('Register (Register Screen)', () => {
beforeEach(() => {
  jest.clearAllMocks();
});

//Renderiza correctamente
it('renders correctly', () => {
  const { getByText, getByPlaceholderText } = render(<Register />);

  expect(getByText('Registro')).toBeTruthy();
  expect(getByPlaceholderText('Correo electronico')).toBeTruthy();
  expect(getByPlaceholderText('Nombre de Usuario')).toBeTruthy();
  expect(getByPlaceholderText('Ingresar contraseña')).toBeTruthy();
  expect(getByPlaceholderText('Confirmar contraseña')).toBeTruthy();
})

//Muestra un alert si hay algun campo vacio
it('shows alert when fields are empty', async () => {
    const { getByText } = render(<Register/>);
    const registerButton = getByText('Registro');

    fireEvent.press(registerButton);
    await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Completar todos los campos');
  });
});

//Muestra un alert si el email está vacio
it('shows alert when only email is empty', async () => {
    const { getByPlaceholderText, getByText } = render(<Register />);
    const passwordInput = getByPlaceholderText('Ingresar contraseña');
    const confirmPasswordInput = getByPlaceholderText('Confirmar contraseña');
    const registerButton = getByText('Registro');
    const nombreUsuario = getByPlaceholderText("Nombre de Usuario");

    fireEvent.changeText(nombreUsuario, 'Usuario');
    fireEvent.changeText(passwordInput, 'ValidPass123!');
    fireEvent.changeText(confirmPasswordInput, 'ValidPass123!');
    fireEvent.press(registerButton);
    await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Completar todos los campos');
  });
});
//Muestra un alert si el nombre de usuario está vacio
it('shows alert when only username is empty', async () => {
    const { getByPlaceholderText, getByText } = render(<Register />);
    const emailInput = getByPlaceholderText('Correo electronico');
    const passwordInput = getByPlaceholderText('Confirmar contraseña');
    const confirmPasswordInput = getByPlaceholderText('Confirmar contraseña');
    const registerButton = getByText('Registro');

    fireEvent.changeText(emailInput, 'correo67@generico.com');
    fireEvent.changeText(passwordInput, "ValidPass123!");
    fireEvent.changeText(confirmPasswordInput, "ValidPass123!")
    fireEvent.press(registerButton);
    await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Completar todos los campos');
  });
});

//Muestra un alert si la contraseña está vacia
it('shows alert when only password is empty', async () => {
    const { getByPlaceholderText, getByText } = render(<Register />);
    const emailInput = getByPlaceholderText('Correo electronico');
    const confirmPasswordInput = getByPlaceholderText('Confirmar contraseña');
    const registerButton = getByText('Registro');
    const nombreUsuario = getByPlaceholderText("Nombre de Usuario");

    fireEvent.changeText(emailInput, 'correo67@generico.com');
    fireEvent.changeText(nombreUsuario, "Usuario");
    fireEvent.changeText(confirmPasswordInput, "ValidPass123!")
    fireEvent.press(registerButton);
    await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Completar todos los campos');
  });
});
//Muestra un alert si el confirmar contraseña está vacio
it('shows alert when only confirm password is empty', async () => {
    const { getByPlaceholderText, getByText } = render(<Register />);
    const emailInput = getByPlaceholderText('Correo electronico');
    const passwordInput = getByPlaceholderText('Confirmar contraseña');
    const registerButton = getByText('Registro');
    const nombreUsuario = getByPlaceholderText("Nombre de Usuario");

    fireEvent.changeText(emailInput, 'correo67@generico.com');
    fireEvent.changeText(nombreUsuario, "Usuario");
    fireEvent.changeText(passwordInput, "ValidPass123!")
    fireEvent.press(registerButton);
    await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Completar todos los campos');
  });
});
//Verifica que la contraseña se oculte / que tenga secureTextEntry activo
it('has secure text entry for password fields', () => {
    const {getByPlaceholderText } = render(<Register />);
    const passwordInput = getByPlaceholderText('Ingresar contraseña');
    const confirmPasswordInput = getByPlaceholderText('Ingresar contraseña');

    expect(confirmPasswordInput.props.secureTextEntry).toBe(true);
    expect(passwordInput.props.secureTextEntry).toBe(true);
});
//verifica el tipo de teclado para formato email
it('has correct keyboard type for email field', () => {
    const { getByPlaceholderText } = render(<Register />);
    const emailInput = getByPlaceholderText('Correo electronico');

    expect(emailInput.props.keyboardType).toBe('email-address');
});

})


describe('Email validation', () =>{
    beforeEach(() => {
  jest.clearAllMocks();
});
//acepta emails con formato valido
it('accepts valid email formats', async () => {
    const{ getByPlaceholderText, getByText } = render(<Register />);
    const emailInput = getByPlaceholderText('Correo electronico');
    const nombreUsuario = getByPlaceholderText("Nombre de Usuario");
    const passwordInput = getByPlaceholderText('Ingresar contraseña');
    const confirmPasswordInput = getByPlaceholderText('Confirmar contraseña');
    const registerButton = getByText('Registro');

    fireEvent.changeText(emailInput, 'correo@valido.mx');
    fireEvent.changeText(nombreUsuario, 'Usuario')
    fireEvent.changeText(passwordInput, 'Valida123!');
    fireEvent.changeText(confirmPasswordInput, 'Valida123!');
    fireEvent.press(registerButton);
    await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Credenciales aceptadas', 'Bienvenido');
  });
});

//rechaza emails con formato invalido
it('rejects invalid email formats', async () => {
    const{ getByPlaceholderText, getByText } = render(<Register />);
    const emailInput = getByPlaceholderText('Correo electronico');
    const nombreUsuario = getByPlaceholderText("Nombre de Usuario");
    const passwordInput = getByPlaceholderText('Ingresar contraseña');
    const confirmPasswordInput = getByPlaceholderText('Confirmar contraseña');
    const registerButton = getByText('Registro');

    fireEvent.changeText(emailInput, 'correoInvalido.mx');
    fireEvent.changeText(nombreUsuario, 'Usuario')
    fireEvent.changeText(passwordInput, 'Valida123!');
    fireEvent.changeText(confirmPasswordInput, 'Valida123!');
    fireEvent.press(registerButton);

    await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'El formato del email es incorrecto');
  });
})
})


describe('Password validation', () => {
  beforeEach(() => {
  jest.clearAllMocks();
});
//Acepta contraseña con formato valido
 it('accepts valid passwords', async () => {
    const{ getByPlaceholderText, getByText } = render(<Register />);
    const emailInput = getByPlaceholderText('Correo electronico');
    const nombreUsuario = getByPlaceholderText("Nombre de Usuario");
    const passwordInput = getByPlaceholderText('Ingresar contraseña');
    const confirmPassword = getByPlaceholderText('Confirmar contraseña');
    const registerButton = getByText('Registro');

    fireEvent.changeText(emailInput, 'correo@valido.mx');
    fireEvent.changeText(nombreUsuario, "Usuario");
    fireEvent.changeText(passwordInput, 'Valida123!');
    fireEvent.changeText(confirmPassword, 'Valida123!');
    fireEvent.press(registerButton);
    await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Credenciales aceptadas', 'Bienvenido');
  });
 });

 //rechaza sin mayusculas
it('rejects passwords without uppercase', async() => {
     const{ getByPlaceholderText, getByText } = render(<Register />);
    const emailInput = getByPlaceholderText('Correo electronico');
    const nombreUsuario = getByPlaceholderText("Nombre de Usuario");
    const passwordInput = getByPlaceholderText('Ingresar contraseña');
    const confirmPassword = getByPlaceholderText('Confirmar contraseña');
    const registerButton = getByText('Registro');
    
    fireEvent.changeText(emailInput, 'correo@valido.mx');
    fireEvent.changeText(nombreUsuario, "Usuario");
    fireEvent.changeText(passwordInput, 'invalida123!');
    fireEvent.changeText(confirmPassword, 'invalida123!');
    fireEvent.press(registerButton);
    await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'La contraseña no cumple con los requisitos de seguridad');
  });
});

//rechaza sin minusculas
 it('rejects passwords without lowercase', async() => {
    const{ getByPlaceholderText, getByText } = render(<Register />);
    const emailInput = getByPlaceholderText('Correo electronico');
    const nombreUsuario = getByPlaceholderText("Nombre de Usuario");
    const passwordInput = getByPlaceholderText('Ingresar contraseña');
    const confirmPassword = getByPlaceholderText('Confirmar contraseña');
    const registerButton = getByText('Registro');
    
    fireEvent.changeText(emailInput, 'correo@valido.mx');
    fireEvent.changeText(nombreUsuario, "Usuario");
    fireEvent.changeText(passwordInput, 'INVALIDA123!');
    fireEvent.changeText(confirmPassword, 'INVALIDA123!');
    fireEvent.press(registerButton);
    await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'La contraseña no cumple con los requisitos de seguridad');
  });
 });

//rechaza sin caracteres especiales
 it('rejects passwords without special characters', async() => {
    const{ getByPlaceholderText, getByText } = render(<Register />);
    const emailInput = getByPlaceholderText('Correo electronico');
    const nombreUsuario = getByPlaceholderText("Nombre de Usuario");
    const passwordInput = getByPlaceholderText('Ingresar contraseña');
    const confirmPassword = getByPlaceholderText('Confirmar contraseña');
    const registerButton = getByText('Registro');
    
    fireEvent.changeText(emailInput, 'correo@valido.mx');
    fireEvent.changeText(nombreUsuario, "Usuario");
    fireEvent.changeText(passwordInput, 'Invalida123');
    fireEvent.changeText(confirmPassword, 'Invalida123');
    fireEvent.press(registerButton);
    await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'La contraseña no cumple con los requisitos de seguridad');
  });
 });

//rechaza longitud menor a 8 caracteres
 it('rejects passwords shorter than 8 characters', async() => {
    const{ getByPlaceholderText, getByText } = render(<Register />);
    const emailInput = getByPlaceholderText('Correo electronico');
    const nombreUsuario = getByPlaceholderText("Nombre de Usuario");
    const passwordInput = getByPlaceholderText('Ingresar contraseña');
    const confirmPassword = getByPlaceholderText('Confirmar contraseña');
    const registerButton = getByText('Registro');
    
    fireEvent.changeText(emailInput, 'correo@valido.mx');
    fireEvent.changeText(nombreUsuario, "Usuario");
    fireEvent.changeText(passwordInput, 'inVAL1!');
    fireEvent.changeText(confirmPassword, 'inVAL1!');
    fireEvent.press(registerButton);
    await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'La contraseña no cumple con los requisitos de seguridad');
  });
 });

//rechaza solo numeros y caracteres especiales
 it('rejects passwords with only numbers and special characters', async() => {
    const{ getByPlaceholderText, getByText } = render(<Register />);
    const emailInput = getByPlaceholderText('Correo electronico');
    const nombreUsuario = getByPlaceholderText("Nombre de Usuario");
    const passwordInput = getByPlaceholderText('Ingresar contraseña');
    const confirmPassword = getByPlaceholderText('Confirmar contraseña');
    const registerButton = getByText('Registro');
    
    fireEvent.changeText(emailInput, 'correo@valido.mx');
    fireEvent.changeText(nombreUsuario, "Usuario");
    fireEvent.changeText(passwordInput, '420!67$&');
    fireEvent.changeText(confirmPassword, '420!67$&');
    fireEvent.press(registerButton);
    await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'La contraseña no cumple con los requisitos de seguridad');
  });
 });
})


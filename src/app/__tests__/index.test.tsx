import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Index from '../index';

// Mock Alert
jest.spyOn(Alert, 'alert');

describe('Index (Login Screen)', () => {
beforeEach(() => {
  jest.clearAllMocks();
});

//Renderiza correctamente
it('renders correctly', () => {
  const { getByText, getByPlaceholderText } = render(<Index />);


  expect(getByText('Iniciar Sesión')).toBeTruthy();
  expect(getByText('Registro')).toBeTruthy();
  expect(getByPlaceholderText('Correo electronico')).toBeTruthy();
  expect(getByPlaceholderText('Ingresar contraseña')).toBeTruthy();
})

//Muestra un alert si hay algun campo vacio
it('shows alert when fields are empty', async () => {
    const { getByText } = render(<Index/>);
    const loginButton = getByText('Iniciar Sesión');

    fireEvent.press(loginButton);
    await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Completar todos los campos');
  });
});

//Muestra un alert si el email está vacio
it('shows alert when only email is empty', async () => {
    const { getByPlaceholderText, getByText } = render(<Index />);
    const passwordInput = getByPlaceholderText('Ingresar contraseña');
    const loginButton = getByText('Iniciar Sesión');

    fireEvent.changeText(passwordInput, 'ValidPass123!');
    fireEvent.press(loginButton);
    await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Completar todos los campos');
  });
});

//Muestra un alert si la contraseña está vacia
it('shows alert when only password is empty', async () => {
    const { getByPlaceholderText, getByText } = render(<Index />);
    const emailInput = getByPlaceholderText('Correo electronico');
    const loginButton = getByText('Iniciar Sesión');

    fireEvent.changeText(emailInput, 'correo67@generico.com');
    fireEvent.press(loginButton);
    await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Completar todos los campos');
  });
});

//Verifica que la contraseña se oculte / que tenga secureTextEntry activo
it('has secure text entry for password field', () => {
    const {getByPlaceholderText } = render(<Index />);
    const passwordInput = getByPlaceholderText('Ingresar contraseña');

    expect(passwordInput.props.secureTextEntry).toBe(true);
});

//verifica el tipo de teclado para formato email
it('has correct keyboard type for email field', () => {
    const { getByPlaceholderText } = render(<Index />);
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
    const{ getByPlaceholderText, getByText } = render(<Index />);
    const emailInput = getByPlaceholderText('Correo electronico');
    const passwordInput = getByPlaceholderText('Ingresar contraseña');
    const loginButton = getByText('Iniciar Sesión');

    fireEvent.changeText(emailInput, 'correo@valido.mx');
    fireEvent.changeText(passwordInput, 'Valida123!');
    fireEvent.press(loginButton);
    await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Login exitoso', 'Credenciales aceptadas, bienvenido');
  });
});

//rechaza emails con formato invalido
it('rejects invalid email formats', async () => {
    const{ getByPlaceholderText, getByText } = render(<Index />);
    const emailInput = getByPlaceholderText('Correo electronico');
    const passwordInput = getByPlaceholderText('Ingresar contraseña');
    const loginButton = getByText('Iniciar Sesión');

    fireEvent.changeText(emailInput, 'correoInvalido.mx');
    fireEvent.changeText(passwordInput, 'Valida123!');
    fireEvent.press(loginButton);

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
    const{ getByPlaceholderText, getByText } = render(<Index />);
    const emailInput = getByPlaceholderText('Correo electronico');
    const passwordInput = getByPlaceholderText('Ingresar contraseña');
    const loginButton = getByText('Iniciar Sesión');

    fireEvent.changeText(emailInput, 'correo@valido.mx');
    fireEvent.changeText(passwordInput, 'Valida123!');
    fireEvent.press(loginButton);
    await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Login exitoso', 'Credenciales aceptadas, bienvenido');
  });
 });

 //rechaza sin mayusculas
it('rejects passwords without uppercase', async() => {
    const{ getByPlaceholderText, getByText } = render(<Index />);
    const emailInput = getByPlaceholderText('Correo electronico');
    const passwordInput = getByPlaceholderText('Ingresar contraseña');
    const loginButton = getByText('Iniciar Sesión');

    fireEvent.changeText(emailInput, 'correo@valido.mx');
    fireEvent.changeText(passwordInput, 'invalida123!');
    fireEvent.press(loginButton);
    await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Contraseña invalida');
  });
});

//rechaza sin minusculas
 it('rejects passwords without lowercase', async() => {
    const{ getByPlaceholderText, getByText } = render(<Index />);
    const emailInput = getByPlaceholderText('Correo electronico');
    const passwordInput = getByPlaceholderText('Ingresar contraseña');
    const loginButton = getByText('Iniciar Sesión');

    fireEvent.changeText(emailInput, 'correo@valido.mx');
    fireEvent.changeText(passwordInput, 'INVALIDA123!');
    fireEvent.press(loginButton);
    await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Contraseña invalida');
  });
 });

//rechaza sin caracteres especiales
 it('rejects passwords without special characters', async() => {
     const{ getByPlaceholderText, getByText } = render(<Index />);
    const emailInput = getByPlaceholderText('Correo electronico');
    const passwordInput = getByPlaceholderText('Ingresar contraseña');
    const loginButton = getByText('Iniciar Sesión');

    fireEvent.changeText(emailInput, 'correo@valido.mx');
    fireEvent.changeText(passwordInput, 'Invalida123');
    fireEvent.press(loginButton);
    await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Contraseña invalida');
  });
 });

//rechaza longitud menor a 8 caracteres
 it('rejects passwords shorter than 8 characters', async() => {
 const{ getByPlaceholderText, getByText } = render(<Index />);
    const emailInput = getByPlaceholderText('Correo electronico');
    const passwordInput = getByPlaceholderText('Ingresar contraseña');
    const loginButton = getByText('Iniciar Sesión');

    fireEvent.changeText(emailInput, 'correo@valido.mx');
    fireEvent.changeText(passwordInput, 'inVAL1!');
    fireEvent.press(loginButton);
    await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Contraseña invalida');
  });
 });

//rechaza solo numeros y caracteres especiales
 it('rejects passwords with only numbers and special characters', async() => {
    const{ getByPlaceholderText, getByText } = render(<Index />);
    const emailInput = getByPlaceholderText('Correo electronico');
    const passwordInput = getByPlaceholderText('Ingresar contraseña');
    const loginButton = getByText('Iniciar Sesión');

    fireEvent.changeText(emailInput, 'correo@valido.mx');
    fireEvent.changeText(passwordInput, '420!67$&');
    fireEvent.press(loginButton);
    await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Contraseña invalida');
  });
 });
})


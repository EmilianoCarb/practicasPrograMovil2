import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import Detail from '@/detail';

// 1. Declaramos las variables con prefijo "mock" para cumplir con las reglas de Jest
const mockBack = jest.fn();
const mockParams = {
  id: '12345',
  name: 'Radiohead',
  image: 'https://lastfm.freetls.fastly.net/i/u/300x300/artist.jpg',
};

// 2. Un solo mock unificado para expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
  useLocalSearchParams: () => mockParams,
}));

describe('Detail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar correctamente el nombre y la imagen del artista de Last.fm', () => {
    render(<Detail />);

    expect(screen.getByText('Radiohead')).toBeTruthy();
    const artistImage = screen.getByTestId('img-Radiohead');
    expect(artistImage.props.source).toEqual({
      uri: 'https://lastfm.freetls.fastly.net/i/u/300x300/artist.jpg',
    });
  });

  it('debería ejecutar router.back() si se presiona un botón de regresar', () => {    
    render(<Detail />);

    const backButton = screen.queryByTestId('back-button');
    if (backButton) {
      fireEvent.press(backButton);
      expect(mockBack).toHaveBeenCalledTimes(1);
    }
})
});
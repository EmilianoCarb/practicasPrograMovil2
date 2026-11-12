import React from 'react';
import { render } from '@testing-library/react-native';
import Home from '@/home';

jest.mock('../api-client', () => ({
    getMusicData: jest.fn(() =>
    Promise.resolve([
        {
            id: '1',
            name: 'Radiohead',
            image: 'https://example.com/radiohead.jpg',
        },
    ]))
}));


jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('<Home />', () => {
  it('renderizar el artista obtenido de la API', async () => {
    const { findByText } = render(<Home />);

    const artistName = await findByText('Radiohead');
    expect(artistName).toBeTruthy();
  });
});
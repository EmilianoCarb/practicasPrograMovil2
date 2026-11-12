import React from 'react';
import { render } from '@testing-library/react-native';
import Detail from '@/detail';

const mockBack = jest.fn();
const mockParams = {
  id: '12345',
  name: 'Radiohead',
  image: 'https://lastfm.freetls.fastly.net/i/u/300x300/artist.jpg',
};

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

  it('renderizar correctamente el nombre y la imagen del artista de Last.fm', () => {
    const { getByTestId, getByText } = render(<Detail />);

    expect(getByText('Radiohead')).toBeTruthy();
    const artistImage = getByTestId('img-Radiohead');
    expect(artistImage.props.source).toEqual({
      uri: 'https://lastfm.freetls.fastly.net/i/u/300x300/artist.jpg',
    });
  });
});
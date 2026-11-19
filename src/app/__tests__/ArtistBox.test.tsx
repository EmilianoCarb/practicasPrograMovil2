import React from 'react';
import { render } from '@testing-library/react-native';
import ArtistBox from '@/components/ArtistBox';

describe('<ArtistBox />', () => {
  it('renderizar correctamente el nombre y la imagen del artista', () => {
    const mockArtist = {
      id: 1,
      name: 'Radiohead',
      image: 'https://example.com/artist.jpg',
    };

    const { getByText, getByTestId } = render(<ArtistBox artist={mockArtist} />);

    expect(getByText('Radiohead')).toBeTruthy();

    const artistImage = getByTestId('artist-image');
    expect(artistImage.props.source).toEqual({
      uri: 'https://example.com/artist.jpg',
    });
  });
});
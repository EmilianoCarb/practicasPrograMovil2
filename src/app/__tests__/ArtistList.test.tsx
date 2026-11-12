import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ArtistList from '@/components/ArtistList';

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: mockPush,     
    }),
}));

describe('ArtistList', () => {
    const mockArtists = [
        {
            id: 1,
            name: 'Radiohead',
            image: 'url1'
        },
    ];

    it('renderiza la lista y navergar al hacer click en un artista', () => {
       const { getByTestId, getByText } = render(<ArtistList artists={mockArtists} />);

        expect(getByText('Radiohead')).toBeTruthy();
        const artistBox = getByTestId('artist-box-Radiohead');
        fireEvent.press(artistBox);

        expect(mockPush).toHaveBeenCalledWith({
            pathname: '../detail',
            params: { 
                id: 1, 
                name: 'Radiohead', 
                image: 'url1' }
        });
        
    })
})
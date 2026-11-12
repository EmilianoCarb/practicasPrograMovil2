import { getMusicData } from '@/api-client';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        topartists: {
          artist: [
            {
              mbid: 'test-id-1',
              name: 'Radiohead',
              image: [{ '#text': 'https://example.com/image.jpg' }],
            },
          ],
        },
      }),
  })
) as jest.Mock;

describe('api-client', () => {
  it('debería hacer fetch y mapear correctamente los datos de los artistas', async () => {
    const artists = await getMusicData();

    expect(artists).toHaveLength(1);
    expect(artists[0]).toEqual({
      id: 'test-id-1',
      name: 'Radiohead',
      image: 'https://example.com/image.jpg',
    });
  });
});
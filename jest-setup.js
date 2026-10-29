// Mock Expo Winter runtime
global.__ExpoImportMetaRegistry = {};

// Mock structuredClone si no está disponible de forma nativa en el entorno de pruebas
global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));

const mockPush = jest.fn();

// Mock expo modules y router
jest.mock('expo', () => ({}));
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('expo-constants', () => ({
  default: {},
}));

global.mockPush = mockPush;
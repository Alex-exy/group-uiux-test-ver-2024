import { setAuthenticated, setUser } from '../src/store/authSlice';
const mockDispatch = jest.fn();

export const store = {
  dispatch: mockDispatch,
  getState: jest.fn(() => ({ auth: { isAuthenticated: false, user: {} }})),
  subscribe: jest.fn(),
  replaceReducer: jest.fn(),
  runSaga: jest.fn(),
  injectedReducers: {},
  injectedSagas: {},
};

// Utility to reset mocks between tests
export const resetStoreMocks = () => {
  mockDispatch.mockClear();
};

export const mockSetAuthenticated = setAuthenticated;
export const mockSetUser = setUser;

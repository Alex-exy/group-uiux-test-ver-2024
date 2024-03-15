// __mocks__/keycloak-js.js
export default function Keycloak() {
  return {
    init: jest.fn(() => Promise.resolve(true)),
    login: jest.fn(),
    tokenParsed: {
      family_name: 'Doe',
      given_name: 'John',
      preferred_username: 'johndoe',
      email: 'john.doe@example.com',
      sub: '12345',
    },
    updateToken: jest.fn(() => Promise.resolve(true)),
  };
}

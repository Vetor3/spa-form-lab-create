interface Environment {
  apiBaseURL: string
};

const env = import.meta.env.MODE || 'development';

const environments: Record<string, Environment> = {
  development: { apiBaseURL: 'http://localhost:4567' },
  production: { apiBaseURL: 'https://api.vt3backoffice.com' },
  test: { apiBaseURL: 'http://localhost:4567' }
};

export default environments[env];
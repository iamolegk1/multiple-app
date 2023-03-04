export const ROUTES = {
  home: '/',
  news: 'news',
  login: 'login',
  profile: 'profile',
} as const;

export const DEFAULT_PAGINATION_START_FROM = '0';
export const DEFAULT_PAGINATION_LIMIT = '5';

export const URL_PAGINATION_PARAMS = {
  startFrom: 'startFrom',
  limit: 'limit',
} as const;

export const USERNAME_VALIDATION = 'admin' as const;
export const PASSWORD_VALIDATION = '12345' as const;

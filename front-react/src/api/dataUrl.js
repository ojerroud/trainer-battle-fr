const { REACT_APP_URL: BASE_API_URL } = process.env;
export const LOGIN_URL = BASE_API_URL + '/api/login';
export const FIND_ALL_PLAYERS_URL = BASE_API_URL + '/api/players';
export const UPDATE_PLAYER_URL = (id) => BASE_API_URL + '/api/players/' + id;

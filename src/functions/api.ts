export const API_URL = process.env.API_URL;

export function LOGIN() {
  return {
    url: API_URL + "/auth/login"
  };
}

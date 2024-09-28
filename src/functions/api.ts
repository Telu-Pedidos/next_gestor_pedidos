export const API_URL = process.env.API_URL;

export function LOGIN() {
  return {
    url: API_URL + "/auth/login"
  };
}

export function POST_CLIENT() {
  return {
    url: API_URL + "/clients"
  };
}

export function PUT_CLIENT(id: string) {
  return {
    url: `${API_URL}/clients/${id}`
  };
}

export function GET_CLIENTS({ name }: { name: string }) {
  return {
    url: name?.length ? `${API_URL}/clients?name=${name}` : `${API_URL}/clients`
  };
}

export function GET_CLIENT_ID(id: string) {
  return {
    url: `${API_URL}/clients/${id}`
  };
}

export function DELETE_CLIENT(id: string) {
  return {
    url: `${API_URL}/clients/${id}`
  };
}

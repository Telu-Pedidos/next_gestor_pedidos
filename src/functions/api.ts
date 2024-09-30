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

export function POST_PRODUCT() {
  return {
    url: API_URL + "/products"
  };
}

export function PUT_PRODUCT(id: string) {
  return {
    url: `${API_URL}/products/${id}`
  };
}

export function GET_PRODUCTS() {
  return {
    url: `${API_URL}/products`
  };
}

export function GET_PRODUCT_ID(id: string) {
  return {
    url: `${API_URL}/products/${id}`
  };
}

export function DELETE_PRODUCT(id: string) {
  return {
    url: `${API_URL}/products/${id}`
  };
}

export function ACTIVATE_PRODUCT(id: string) {
  return {
    url: `${API_URL}/products/${id}/activate`
  };
}

export function DEACTIVATE_PRODUCT(id: string) {
  return {
    url: `${API_URL}/products/${id}/deactivate`
  };
}

export function POST_CATEGORY() {
  return {
    url: API_URL + "/categories"
  };
}

export function PUT_CATEGORY(id: string) {
  return {
    url: `${API_URL}/categories/${id}`
  };
}

export function GET_CATEGORIES() {
  return {
    url: API_URL + "/categories"
  };
}

export function GET_CATEGORY_ID(id: string) {
  return {
    url: `${API_URL}/categories/${id}`
  };
}

export function DELETE_CATEGORY(id: string) {
  return {
    url: `${API_URL}/categories/${id}`
  };
}

export function POST_MODEL() {
  return {
    url: API_URL + "/models"
  };
}

export function PUT_MODEL(id: string) {
  return {
    url: `${API_URL}/models/${id}`
  };
}

export function GET_MODELS() {
  return {
    url: API_URL + "/models"
  };
}

export function GET_MODEL_ID(id: string) {
  return {
    url: `${API_URL}/models/${id}`
  };
}

export function DELETE_MODEL(id: string) {
  return {
    url: `${API_URL}/models/${id}`
  };
}

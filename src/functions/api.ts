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

export function POST_ORDER() {
  return {
    url: API_URL + "/orders"
  };
}

export function PUT_ORDER(id: string) {
  return {
    url: `${API_URL}/orders/${id}`
  };
}

export function GET_ORDERS({
  status,
  startDate,
  endDate
}: {
  status?: string;
  startDate?: string;
  endDate?: string;
}) {
  const query = [
    status ? `status=${status}` : null,
    startDate ? `startDate=${startDate}` : null,
    endDate ? `endDate=${endDate}` : null
  ]
    .filter(Boolean)
    .join("&");

  const url = `${API_URL}/orders${query ? `?${query}` : ""}`;

  return { url };
}

export function GET_ORDER_ID(id: string) {
  return {
    url: `${API_URL}/orders/${id}`
  };
}

export function DELETE_ORDER(id: string) {
  return {
    url: `${API_URL}/orders/${id}`
  };
}

export function FINISH_ORDER(id: string) {
  return {
    url: `${API_URL}/orders/${id}/finish`
  };
}

export function CANCEL_ORDER(id: string) {
  return {
    url: `${API_URL}/orders/${id}/cancel`
  };
}

export function NEW_STATUS_ORDER({
  id,
  newStatus
}: {
  id: string;
  newStatus: string;
}) {
  return {
    url: `${API_URL}/orders/${id}/status?newStatus=${newStatus}`
  };
}

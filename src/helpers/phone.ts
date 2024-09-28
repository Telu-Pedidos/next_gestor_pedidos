export function formatPhoneNumber(phone: string) {
  if (!phone) return "";

  const cleaned = regexPhoneNumber(phone);

  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return phone;
}

export function regexPhoneNumber(phone: string) {
  return phone.replace(/\D/g, "");
}

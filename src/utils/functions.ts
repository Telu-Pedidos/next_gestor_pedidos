export function formatNumberToHex(num: number): string {
  return "#" + num.toString().padStart(4, "0");
}

export function transformNameDelivery(delivery: string): string {
  return delivery === "WITHDRAWALS" ? "Retirada" : "Shopee";
}

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDateToDays(dateString: string) {
  if (!dateString) return "";

  const date = new Date(dateString);
  return formatDistanceToNow(date, { locale: ptBR, addSuffix: false });
}

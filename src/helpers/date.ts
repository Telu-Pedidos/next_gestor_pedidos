import { format, formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDateToDays(dateString: string) {
  if (typeof dateString !== "string" || dateString.trim() === "") {
    return "";
  }

  const date = new Date(dateString);

  const distance = formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: false
  });

  return distance.replace(/^cerca de\s/, "");
}

export function formatDateNew(dateString: string): string {
  if (!dateString) {
    return "-";
  }

  const date = parseISO(dateString);

  if (isNaN(date.getTime())) {
    return "-";
  }

  return format(date, "dd/MM/yyyy");
}

import { format, formatDistanceToNow, isSameDay, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";

export const timeZone = "America/Sao_Paulo";

export function formatDateToDays(dateString: string) {
  if (typeof dateString !== "string" || dateString.trim() === "") {
    return "";
  }

  const date = toZonedTime(new Date(dateString), timeZone);

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

  const date = toZonedTime(parseISO(dateString), timeZone);

  if (isNaN(date.getTime())) {
    return "-";
  }

  return format(date, "dd/MM/yyyy");
}

export function isSameDate(startAt: string, endAt: string): boolean {
  const startDate = parseISO(startAt);
  const endDate = parseISO(endAt);
  return isSameDay(startDate, endDate);
}

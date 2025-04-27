export function formatDate(date: Date, format: string): string {
  const map: Record<string, string> = {
    YYYY: date.getFullYear().toString(),
    MM: String(date.getMonth() + 1).padStart(2, "0"),
    DD: String(date.getDate()).padStart(2, "0"),
    HH: String(date.getHours()).padStart(2, "0"),
    mm: String(date.getMinutes()).padStart(2, "0"),
    ss: String(date.getSeconds()).padStart(2, "0"),
  };
  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, match => map[match]);
}

export function timeAgo(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: [number, string][] = [
    [60, "segundos"],
    [60 * 60, "minutos"],
    [24 * 60 * 60, "horas"],
    [7 * 24 * 60 * 60, "días"],
    [30 * 24 * 60 * 60, "semanas"],
    [365 * 24 * 60 * 60, "meses"],
  ];

  for (const [seconds, label] of intervals) {
    if (diff < seconds) {
      const value = Math.floor(diff / (seconds / 60));
      return `${value} ${label}`;
    }
  }

  return "hace mucho tiempo";
}

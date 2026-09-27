import type { PublicHoliday } from "@/data/public-holidays";

export default function HolidayDates({ holidays }: { holidays: PublicHoliday[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/70 text-foreground"><tr><th className="px-4 py-3">Date</th><th className="px-4 py-3">Holiday</th></tr></thead>
        <tbody className="divide-y divide-border/60">
          {holidays.map((holiday) => (
            <tr key={`${holiday.date}-${holiday.name}`}>
              <td className="whitespace-nowrap px-4 py-3 font-medium text-foreground">{new Date(`${holiday.date}T12:00:00+08:00`).toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Singapore" })}</td>
              <td className="px-4 py-3 text-muted-foreground">{holiday.name}{holiday.type !== "gazetted" ? ` (${holiday.type})` : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


import * as chrono from "chrono-node";

export function extractDueDate(text: string): Date | null {
  const results = chrono.parse(text, new Date(), {
    forwardDate: true,
    timezones: {
      IST: 330,
    },
  });

  if (results.length === 0) return null;

  return results[0].start.date();
}

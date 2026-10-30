import { RiskBadge } from "@/components/risk-badge";
import { getRiskScore } from "@/lib/service";
import type { hazardType } from "@/lib/types";

const headers = [
  { label: "순서", className: "w-[60px]" },
  { label: "공종", className: "w-[150px]" },
  { label: "유해·위험요인", className: "w-[330px]" },
  { label: "빈도", className: "w-[70px]" },
  { label: "강도", className: "w-[70px]" },
  { label: "위험도", className: "w-[150px]" },
  { label: "감소대책", className: "" },
];

export function HazardTable({ hazards }: { hazards: hazardType[] }) {
  return (
    <div className="overflow-x-auto rounded-card border border-border bg-white px-6 py-2">
      <table className="w-full min-w-[960px] text-left text-[15px] leading-[1.5]">
        <thead>
          <tr className="border-b border-border">
            {headers.map((header) => (
              <th
                key={header.label}
                scope="col"
                className={`px-2 py-[18px] font-medium text-muted-foreground ${header.className}`}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hazards.map((h) => {
            const score = getRiskScore(h.frequency, h.severity);
            return (
              <tr
                key={h.order}
                className="border-b border-border last:border-0"
              >
                <td className="px-2 py-[18px]">{h.order}</td>
                <td className="px-2 py-[18px]">{h.step}</td>
                <td className="px-2 py-[18px]">{h.hazard}</td>
                <td className="px-2 py-[18px]">{h.frequency}</td>
                <td className="px-2 py-[18px]">{h.severity}</td>
                <td className="px-2 py-[18px]">
                  <span className="flex items-center gap-2">
                    <span className="text-base font-bold">{score}</span>
                    <RiskBadge score={score} />
                  </span>
                </td>
                <td className="px-2 py-[18px]">{h.measure}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

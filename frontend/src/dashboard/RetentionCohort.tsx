import { Panel, SkeletonBlock } from "@/dashboard/common";
import { CohortRow } from "@/dashboard/types";

type RetentionCohortProps = {
  rows: CohortRow[];
  loading: boolean;
};

const retentionColor = (value: number) => {
  if (value >= 70) return "rgba(34,197,94,0.35)";
  if (value >= 55) return "rgba(59,130,246,0.35)";
  if (value >= 40) return "rgba(234,179,8,0.35)";
  return "rgba(239,68,68,0.32)";
};

export const RetentionCohort = ({ rows, loading }: RetentionCohortProps) => {
  return (
    <Panel title="Retention Cohort" subtitle="Monthly user retention by signup cohort">
      {loading ? (
        <SkeletonBlock className="h-[320px] w-full" />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-zinc-300">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.16em] text-zinc-500">
                <th className="px-2 py-2">Cohort</th>
                {Array.from({ length: 7 }, (_, index) => (
                  <th key={index} className="px-2 py-2 text-center">
                    Month {index}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.cohort} className="border-t border-white/5">
                  <td className="px-2 py-2 font-medium text-zinc-100">{row.cohort}</td>
                  {row.retention.map((value, idx) => (
                    <td key={idx} className="px-2 py-2 text-center">
                      <span
                        className="inline-block rounded-md px-2 py-1"
                        style={{ backgroundColor: retentionColor(value) }}
                      >
                        {value}%
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Panel>
  );
};

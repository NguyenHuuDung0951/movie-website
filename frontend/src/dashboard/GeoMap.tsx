import { Panel, SkeletonBlock } from "@/dashboard/common";
import { CityPoint } from "@/dashboard/types";

type GeoMapProps = {
  cities: CityPoint[];
  loading: boolean;
};

const colorByDensity = (value: number, max: number) => {
  const ratio = value / max;
  if (ratio > 0.8) return "#A855F7";
  if (ratio > 0.6) return "#3B82F6";
  if (ratio > 0.4) return "#06B6D4";
  return "#334155";
};

export const GeoMap = ({ cities, loading }: GeoMapProps) => {
  const maxViewers = Math.max(...cities.map((city) => city.viewers));

  return (
    <Panel title="Geographic Distribution" subtitle="Vietnam viewer density and top markets">
      {loading ? (
        <SkeletonBlock className="h-[290px] w-full" />
      ) : (
        <div className="grid gap-3 md:grid-cols-[1.4fr_1fr]">
          <div className="rounded-xl border border-white/10 bg-[#0f1320] p-3">
            <svg viewBox="0 0 240 320" className="h-[240px] w-full">
              <path
                d="M120 10 L145 28 L150 50 L170 70 L166 93 L176 119 L160 145 L150 177 L157 201 L145 230 L136 260 L120 284 L100 294 L88 276 L96 244 L90 210 L77 180 L70 147 L58 125 L65 99 L63 69 L80 45 L88 22 Z"
                fill="#1f2937"
                stroke="#475569"
                strokeWidth="2"
              />
              {cities.map((city) => (
                <g key={city.city}>
                  <circle
                    cx={city.x * 2.1}
                    cy={city.y * 2.9}
                    r={5 + (city.viewers / maxViewers) * 7}
                    fill={colorByDensity(city.viewers, maxViewers)}
                    opacity="0.75"
                  />
                </g>
              ))}
            </svg>
          </div>

          <div>
            <h4 className="mb-2 text-xs uppercase tracking-[0.16em] text-zinc-500">Top 5 Cities</h4>
            <ul className="space-y-2 text-sm">
              {cities.map((city, index) => (
                <li
                  key={city.city}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-zinc-300"
                >
                  <span>
                    #{index + 1} {city.city}
                  </span>
                  <span>{city.viewers.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Panel>
  );
};

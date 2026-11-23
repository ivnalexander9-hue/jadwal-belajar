import { ProgressEntry } from '../types/study';
import { formatIndonesianDate } from '../utils/studyHelpers';

interface PeriodicProgressChartProps {
  entries: ProgressEntry[];
  title?: string;
}

export function PeriodicProgressChart({
  entries,
  title = 'Tren Pemahaman Berkala',
}: PeriodicProgressChartProps) {
  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));

  if (sorted.length === 0) {
    return (
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl text-center">
        <p className="text-sm font-medium text-slate-700">
          Belum ada catatan progres berkala untuk topik ini.
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Catat evaluasi pemahaman pertamamu menggunakan formulir di bawah agar grafik perkembangan muncul.
        </p>
      </div>
    );
  }

  const width = 640;
  const height = 220;
  const padLeft = 42;
  const padRight = 24;
  const padTop = 20;
  const padBottom = 38;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const points = sorted.map((entry, idx) => {
    const x =
      sorted.length === 1
        ? padLeft + plotW / 2
        : padLeft + (idx / (sorted.length - 1)) * plotW;
    const y = padTop + plotH - (Math.min(100, Math.max(0, entry.score)) / 100) * plotH;
    return { x, y, entry };
  });

  const linePath = points
    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');

  const areaPath =
    points.length > 1
      ? `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${(padTop + plotH).toFixed(
          1
        )} L ${points[0].x.toFixed(1)} ${(padTop + plotH).toFixed(1)} Z`
      : '';

  const yTicks = [0, 25, 50, 75, 100];

  return (
    <div className="p-4 bg-white border border-slate-200 rounded-xl">
      <div className="flex items-center justify-between mb-3">
        <h5 className="font-display text-sm font-semibold text-slate-900">{title}</h5>
        <span className="font-mono text-xs text-slate-500 tabular-nums">
          {sorted.length} titik evaluasi
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[440px] h-auto"
          role="img"
          aria-label={title}
        >
          <defs>
            <linearGradient id="progressAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines & Y axis labels */}
          {yTicks.map((tick) => {
            const y = padTop + plotH - (tick / 100) * plotH;
            return (
              <g key={tick}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#E2E8F0"
                  strokeWidth="1"
                  strokeDasharray={tick === 0 ? undefined : '3 3'}
                />
                <text
                  x={padLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-slate-400 text-[10px] font-mono"
                >
                  {tick}%
                </text>
              </g>
            );
          })}

          {/* Target Mastery line at 80% */}
          <line
            x1={padLeft}
            y1={padTop + plotH - 0.8 * plotH}
            x2={width - padRight}
            y2={padTop + plotH - 0.8 * plotH}
            stroke="#16A34A"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.55"
          />

          {areaPath && <path d={areaPath} fill="url(#progressAreaGrad)" />}

          {points.length > 1 && (
            <path
              d={linePath}
              fill="none"
              stroke="#1D4ED8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {points.map((p) => (
            <g key={p.entry.id}>
              <circle
                cx={p.x}
                cy={p.y}
                r="5"
                fill="#FFFFFF"
                stroke="#1D4ED8"
                strokeWidth="2.5"
              />
              <text
                x={p.x}
                y={p.y - 11}
                textAnchor="middle"
                className="fill-slate-900 text-[11px] font-mono font-semibold"
              >
                {p.entry.score}%
              </text>
              <text
                x={p.x}
                y={height - 12}
                textAnchor="middle"
                className="fill-slate-500 text-[10px]"
              >
                {p.entry.weekLabel || formatIndonesianDate(p.entry.date)}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
        <span>Garis putus-putus hijau menandakan target ketuntasan belajar (80%).</span>
        <span className="font-mono tabular-nums">
          Terbaru: {sorted[sorted.length - 1].score}%
        </span>
      </div>
    </div>
  );
}

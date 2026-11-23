import * as d3 from 'd3';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { MaterialTopic, ProgressEntry } from '../types/study';
import { formatIndonesianDate } from '../utils/studyHelpers';

interface D3ComprehensionBarChartProps {
  entries: ProgressEntry[];
  materials: MaterialTopic[];
  activeMaterialId: string;
  onSelectMaterial?: (materialId: string) => void;
}

type ChartScope = 'all' | 'active';

export function D3ComprehensionBarChart({
  entries,
  materials,
  activeMaterialId,
  onSelectMaterial,
}: D3ComprehensionBarChartProps) {
  const [scope, setScope] = useState<ChartScope>('all');
  const [hoveredEntryId, setHoveredEntryId] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(760);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const yAxisRef = useRef<SVGGElement | null>(null);

  const activeMaterial = materials.find((m) => m.id === activeMaterialId);

  const materialMap = useMemo(() => {
    const map = new Map<string, MaterialTopic>();
    for (const m of materials) {
      map.set(m.id, m);
    }
    return map;
  }, [materials]);

  const filteredData = useMemo(() => {
    const base =
      scope === 'active'
        ? entries.filter((e) => e.materialId === activeMaterialId)
        : entries;
    return [...base].sort((a, b) => a.date.localeCompare(b.date));
  }, [entries, scope, activeMaterialId]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => {
      const next = el.clientWidth;
      if (next > 0) setContainerWidth(next);
    };
    updateWidth();

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => updateWidth());
      observer.observe(el);
      return () => observer.disconnect();
    }
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const height = 270;
  const margin = { top: 26, right: 20, bottom: 54, left: 46 };
  const svgWidth = Math.max(460, containerWidth);
  const innerWidth = svgWidth - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = useMemo(() => {
    return d3
      .scaleBand<string>()
      .domain(filteredData.map((d) => d.id))
      .range([0, innerWidth])
      .padding(0.32);
  }, [filteredData, innerWidth]);

  const yScale = useMemo(() => {
    return d3.scaleLinear().domain([0, 100]).range([innerHeight, 0]);
  }, [innerHeight]);

  // Render D3 left Y axis ticks cleanly
  useEffect(() => {
    if (!yAxisRef.current) return;
    const axis = d3
      .axisLeft(yScale)
      .tickValues([0, 20, 40, 60, 80, 100])
      .tickFormat((d) => `${d}%`)
      .tickSize(-innerWidth);

    const g = d3.select(yAxisRef.current);
    g.call(axis);
    g.select('.domain').remove();
    g.selectAll('.tick line')
      .attr('stroke', '#E2E8F0')
      .attr('stroke-dasharray', (d) => (d === 0 ? '0' : '3 3'));
    g.selectAll('.tick text')
      .attr('fill', '#64748B')
      .attr('font-size', '11px')
      .attr('font-family', 'JetBrains Mono, ui-monospace, monospace');
  }, [yScale, innerWidth]);

  const getBarColor = (score: number) => {
    if (score >= 80) return '#059669'; // Emerald: Menguasai
    if (score >= 65) return '#1D4ED8'; // Blue: Paham
    return '#D97706'; // Amber: Perlu Review
  };

  const inspectedEntry =
    filteredData.find((d) => d.id === hoveredEntryId) ??
    filteredData[filteredData.length - 1] ??
    null;

  const inspectedMaterial = inspectedEntry
    ? materialMap.get(inspectedEntry.materialId)
    : undefined;

  const averageScore =
    filteredData.length > 0
      ? Math.round(d3.mean(filteredData, (d) => d.score) ?? 0)
      : 0;

  return (
    <section className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-700">
            <BarChart3 className="w-4 h-4" />
            <span>VISUALISASI D3.JS · PROGRES BERKALA</span>
          </div>
          <h3 className="font-display text-lg font-bold text-slate-900 mt-1">
            Grafik Batang Pemahaman Materi Marchella dari Waktu ke Waktu
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Arahkan kursor atau klik batang evaluasi untuk melihat detail refleksi dan skor per periode.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => {
                setScope('all');
                setHoveredEntryId(null);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                scope === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Materi ({entries.length})
            </button>
            <button
              type="button"
              onClick={() => {
                setScope('active');
                setHoveredEntryId(null);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                scope === 'active'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bab {activeMaterial?.order ?? ''} Saja
            </button>
          </div>
        </div>
      </div>

      {/* Legend & Summary Line (Zero-pill inline text) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 text-xs text-slate-600">
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-emerald-600 rounded-xs inline-block" />
            <span>Tuntas (&ge; 80%)</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-blue-700 rounded-xs inline-block" />
            <span>Paham (65–79%)</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-amber-600 rounded-xs inline-block" />
            <span>Perlu Review (&lt; 65%)</span>
          </span>
        </div>
        <div className="font-mono tabular-nums text-slate-700">
          Rata-rata periode: <strong className="text-slate-900">{averageScore}%</strong>
        </div>
      </div>

      {/* Chart Canvas */}
      <div ref={containerRef} className="w-full overflow-x-auto">
        {filteredData.length === 0 ? (
          <div className="p-8 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <p className="text-sm font-medium text-slate-700">
              Belum ada data evaluasi berkala untuk bab ini.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Buka sub-tab Progres Berkala di bawah untuk menambahkan check-in pemahaman pertamamu.
            </p>
          </div>
        ) : (
          <svg
            width={svgWidth}
            height={height}
            viewBox={`0 0 ${svgWidth} ${height}`}
            className="block w-full min-w-[460px] h-auto"
            role="img"
            aria-label="Grafik batang progres pemahaman materi Marchella dari waktu ke waktu"
          >
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              {/* D3 Y-Axis + Gridlines */}
              <g ref={yAxisRef} />

              {/* 80% Target Mastery Line */}
              <line
                x1={0}
                y1={yScale(80)}
                x2={innerWidth}
                y2={yScale(80)}
                stroke="#16A34A"
                strokeWidth={1.5}
                strokeDasharray="5 4"
                opacity={0.75}
              />
              <text
                x={innerWidth - 4}
                y={yScale(80) - 6}
                textAnchor="end"
                className="fill-emerald-700 text-[10px] font-mono font-medium"
              >
                Target 80%
              </text>

              {/* Bars */}
              {filteredData.map((entry) => {
                const x = xScale(entry.id) ?? 0;
                const barW = Math.min(54, xScale.bandwidth());
                const xCentered = x + (xScale.bandwidth() - barW) / 2;
                const y = yScale(entry.score);
                const barH = Math.max(2, innerHeight - y);
                const mat = materialMap.get(entry.materialId);
                const isInspected = inspectedEntry?.id === entry.id;
                const fill = getBarColor(entry.score);

                return (
                  <g
                    key={entry.id}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredEntryId(entry.id)}
                    onClick={() => {
                      setHoveredEntryId(entry.id);
                      if (onSelectMaterial) {
                        onSelectMaterial(entry.materialId);
                      }
                    }}
                  >
                    <rect
                      x={xCentered}
                      y={y}
                      width={barW}
                      height={barH}
                      rx={4}
                      fill={fill}
                      opacity={isInspected ? 1 : 0.85}
                      stroke={isInspected ? '#0F172A' : 'none'}
                      strokeWidth={isInspected ? 1.5 : 0}
                    />
                    {/* Score Label on Top */}
                    <text
                      x={xCentered + barW / 2}
                      y={y - 7}
                      textAnchor="middle"
                      className="fill-slate-900 text-[11px] font-mono font-semibold tabular-nums"
                    >
                      {entry.score}%
                    </text>

                    {/* X Axis Labels: Date + Bab */}
                    <text
                      x={xCentered + barW / 2}
                      y={innerHeight + 16}
                      textAnchor="middle"
                      className="fill-slate-700 text-[10px] font-medium"
                    >
                      {formatIndonesianDate(entry.date).replace(' 2026', '')}
                    </text>
                    <text
                      x={xCentered + barW / 2}
                      y={innerHeight + 31}
                      textAnchor="middle"
                      className="fill-slate-400 text-[10px] font-mono"
                    >
                      {mat ? `Bab ${mat.order}` : ''}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        )}
      </div>

      {/* Inspected Bar Readout Strip */}
      {inspectedEntry && (
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="space-y-0.5 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-slate-600">
              <span className="font-mono font-semibold text-slate-900 tabular-nums">
                {formatIndonesianDate(inspectedEntry.date)}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-blue-700">
                {inspectedMaterial
                  ? `${inspectedMaterial.order}. ${inspectedMaterial.shortTitle}`
                  : inspectedEntry.materialId}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-slate-800">
                {inspectedEntry.confidence}
              </span>
            </div>
            <p className="text-slate-600 truncate sm:whitespace-normal">
              {inspectedEntry.note}
            </p>
          </div>
          <div className="font-mono text-base font-bold text-slate-900 tabular-nums shrink-0">
            {inspectedEntry.score}%
          </div>
        </div>
      )}
    </section>
  );
}
